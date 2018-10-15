import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import './helpers';
import * as $users from './users';
import * as $projects from './projects';

const handler = (promise, cb) => {
  promise.then((result) => {
    cb(undefined, {
      body: JSON.stringify(result),
      headers: { 'Content-Type': 'application/json' },
    });
  }).catch((error) => {
    cb(undefined, {
      statusCode: error.statusCode,
      body: JSON.stringify(error)
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
  handler($users.find({
    email: 'test@kohkane.com',
  }), cb);
};

export const projects: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  switch (`${event.path} - ${event.httpMethod}`) {
    case '/projects - GET':
      handler($projects.find(event.queryStringParameters), cb);
      break;
    case '/projects/new - POST':
      handler($projects.create(event.body), cb);
      break;
  }
}


