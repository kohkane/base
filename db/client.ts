import * as AWS from 'aws-sdk';
import * as process from 'process';
import { Response, ResponseStatus } from './models/response';

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
export function buildQuery(table: string, query: {}, onlyAttributes?: string[]) {
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
  });
  // If attributes are passed in only return results with those attributes
  if (onlyAttributes && onlyAttributes.length > 0) {
    onlyAttributes.iterate((attribute, count) => {
      expAttrs[`#${attribute}`] = attribute;
      projExp += count !== onlyAttributes.length - 1 ? `#${attribute},` : `#${attribute}`;
    });
  }
  return generateDynamodbParam(tables[table], expVals, exp, expAttrs, projExp);
}
/**
 * Checks that the correct parameters is in the passed in payload
 *
 * @param jsonBody - The body parsed from the event
 * @param reject - The promise's reject function if error is found
 * @param bothRequired - True if both name and owner should be present, false if only one
 * @author jordanskoemer
 */
export const invalidParams = (jsonObject, reject, requiredFields?: string[]) => {
  if (requiredFields) {
    let notPresent = '';
    const missingFields = requiredFields.filter((field) => !jsonObject[field]);
    missingFields.iterate((field, count) => {
      if (count === missingFields.length - 1) {
        notPresent += notPresent ? `and ${field}` : field;
      } else {
        notPresent += field + (count === missingFields.length - 2 ? ' ' : ', ');
      }
    });

    if (notPresent) {
      reject(new Response({
        code: 400,
        data: jsonObject,
        message: `Invalid Request - Missing ${notPresent}`,
        status: ResponseStatus.fail,
      }));
    }
  } else {
    if (!jsonObject.id && !jsonObject.owner) {
      reject(new Response({
        code: 400,
        data: jsonObject,
        message: 'Invalid Request - Missing id or owner',
        status: ResponseStatus.fail,
      }));
    }
  }
};
