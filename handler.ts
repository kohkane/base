import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import './helpers';
import * as users from './users/users';

const handler = (promise, cb) => {
  promise.then((result) => {
    cb(undefined, {
      body: JSON.stringify(result),
      headers: { 'Content-Type': 'application/json' },
      statusCode: 200,
    });
  }).catch((error) => {
    cb(undefined, {
      body: JSON.stringify(error),
      headers: { 'Content-Type': 'application/json' },
      statusCode: error.statusCode,
    });
  });
};
/**
 * GET - /users?userParams=val
 * Returns all users or users that match the passed in query params
 * @param event
 * @param context
 * @param cb
 */
export const getUsers: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  handler(users.find({
    email: 'test@kohkane.com',
  }), cb);
};
