import * as dynamodb from '../db/client';
import { User } from '../db/models/user';

const db = dynamodb.doc;

const defaultQueryParams = {
  TableName: dynamodb.tables.users,
};

/**
 * Returns the users that match the passed in query
 *
 * @param {} query - The query that is formatted like the users table
 * @author jordanskomer
 */
export function find(query: {}): Promise<{}> {
  let exp = '';
  const expVals = {};
  Object.keys(query).iterate((key, count) => {
    exp += `${key} = :${key}` +
      `${Object.keys(query).length > 0 && count !== Object.keys(query).length - 1 ? ' AND ' : ''}`;
    expVals[`:${key}`] = { "S": query[key] };
  });
  return db.query({
    ...defaultQueryParams,
    ExpressionAttributeValues: expVals,
    KeyConditionExpression: exp,
  }).promise();
};

/**
 * Returns the users that match the passed in query
 *
 * @param {} query - The query that is formatted like the users table
 * @author jordanskomer
 */
export function create(email?: string, fname?: string, lname?: string, phone?: number): Promise<{}> {
  let exp = '';
  const expVals = {};
  Object.keys(query).iterate((key, count) => {
    exp += `${key} = :${key}` +
      `${Object.keys(query).length > 0 && count !== Object.keys(query).length - 1 ? ' AND ' : ''}`;
    expVals[`:${key}`] = { "S": query[key] };
  });
  return db.query({
    ...defaultQueryParams,
    ExpressionAttributeValues: expVals,
    KeyConditionExpression: exp,
  }).promise();
};
