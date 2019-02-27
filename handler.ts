import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { Response, ResponseStatus } from './db/models/response';
import './helpers';
import * as $projects from './projects';
import * as $users from './users';
/**
 * Used to handle all functions in the same way when we resolve them through
 * lamba
 *
 * @param promise - The promise to resolve
 * @param cb - The lamba callback
 * @author jordanskomer
 */
const handler = (promise, cb) => {
  promise.then((result) => {
    cb(undefined, {
      body: JSON.stringify(result),
      headers: { 'Content-Type': 'application/json' },
    });
  }).catch((error) => {
    cb(undefined, {
      body: JSON.stringify(error),
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
  handler($users.find({
    email: 'test@kohkane.com',
  }), cb);
};
/**
 * /project
 * Handler for all routes needed for projects
 *
 * @param event
 * @param context
 * @param cb
 */
export const projects: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  console.log(`${event.requestContext.resourcePath} - ${event.httpMethod}`)
  switch (`${event.requestContext.resourcePath} - ${event.httpMethod}`) {
    case '/project - GET':
      handler($projects.find(event.queryStringParameters), cb);
      break;
    case '/project/new - POST':
      handler($projects.create(event.body), cb);
      break;
    case '/project/{id} - GET':
      handler($projects.find(event.pathParameters), cb);
      break;
    case '/project/{id} - PUT':
      handler($projects.update(event.pathParameters.id, event.body), cb);
      break;
    case '/project/{id} - DELETE':
      handler($projects.remove(event.pathParameters.id), cb);
      break;
    case '/project/{id} - DELETE':
      handler($projects.remove(event.pathParameters.id), cb);
      break;
    case '/project/{id} - DELETE':
      handler($projects.remove(event.pathParameters.id), cb);
      break;
    case '/version/new - POST':
      handler($projects.newVersion(event.body), cb);
      break;
    case '/version - GET':
      handler($projects.getVersion(event.queryStringParameters), cb);
      break;
    default:
      cb(undefined, {
        body: JSON.stringify(new Response({
          message: 'route not found',
          status: ResponseStatus.error,
          statusCode: 501,
        })),
        headers: { 'Content-Type': 'application/json' },
        statusCode: 404,
      });
      break;
  }
};
