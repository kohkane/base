import * as AWS from 'aws-sdk';
import * as process from 'process';

const options = {
  endpoint: 'http://172.18.18.10:8000',
  region: 'localhost',
};

const isLocal = process.env.IS_OFFLINE || process.env.NODE_ENV === 'test';
const env = process.env.NODE_ENV === 'test' ? 'test' : process.env.PROJECT_ENV;

export const doc = isLocal ? new AWS.DynamoDB.DocumentClient(options) : new AWS.DynamoDB.DocumentClient();
export const raw = isLocal ? new AWS.DynamoDB(options) : new AWS.DynamoDB();
export const tables = {
  projects: `${env}-projects`,
  users: `${env}-users`,
};

function generateDynamodbParam(
  TableName, ExpressionAttributeValues, KeyConditionExpression,
  ExpressionAttributeNames, ProjectionExpression?): AWS.DynamoDB.QueryInput {
  let formatedQuery: AWS.DynamoDB.QueryInput;
  formatedQuery = {
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    KeyConditionExpression,
    TableName,
  };
  if (ProjectionExpression) { formatedQuery.ProjectionExpression = ProjectionExpression; }
  return formatedQuery;
}
/**
 * Creates a query in the form dynamodb is expecting from the passed in query
 *
 * @param query - An object of items to query the DB by
 * @author jordanskomer
 */
export function buildQuery(table: string, query: {}, onlyAttributes?: boolean) {
  const expVals = {};
  const expAttrs = {};
  let exp = '';
  let projExp = '';
  Object.keys(query).iterate((key, count) => {
    const escapedKey = key.replace(/_/g, '');
    const notLast = Object.keys(query).length > 0 && count !== Object.keys(query).length - 1;
    exp += `#${escapedKey} = :${escapedKey}${notLast ? ' AND ' : ''}`;
    expVals[`:${escapedKey}`] = query[key];
    expAttrs[`#${escapedKey}`] = key;
    // Only return attributes passed in query
    if (onlyAttributes) {
      projExp += `#${escapedKey}${notLast ? ', ' : ''}`;
    }
  });
  return this.generateDynamodbParam(this.tables[table], expVals, exp, expAttrs, projExp);
}