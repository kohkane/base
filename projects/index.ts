import * as dynamodb from '../db/client';
import { Project } from '../db/models/project';
import { Response, ResponseStatus } from '../db/models/response';
const db = dynamodb.doc;
/**
 * Checks that the correct parameters is in the passes in payload
 *
 * @param jsonBody - The body parsed from the event
 * @param reject - The promise's reject function if error is found
 * @param bothRequired - True if both name and owner should be present, false if only one
 * @author jordanskoemer
 */
const checkBody = (jsonObject, reject, bothRequired = true) => {
  if (bothRequired) {
    if (!jsonObject.name && jsonObject.owner) {
      reject(new Response({
        data: jsonObject,
        message: 'Invalid Request - Missing name',
        status: ResponseStatus.fail,
      }));
    } else if (!jsonObject.owner && jsonObject.name) {
      reject(new Response({
        data: jsonObject,
        message: 'Invalid Request - Missing owner',
        status: ResponseStatus.fail,
      }));
    } else if (!jsonObject.owner && !jsonObject.name) {
      reject(new Response({
        data: jsonObject,
        message: 'Invalid Request - Missing owner and name',
        status: ResponseStatus.fail,
      }));
    }
  } else {
    if (!jsonObject.name && !jsonObject.owner) {
      reject(new Response({
        data: jsonObject,
        message: 'Invalid Request - Missing name or owner',
        status: ResponseStatus.fail,
      }));
    }
  }
};
/**
 * Creates a new project. Will fail if the name or owner field is missing
 * on the POST request
 *
 * @param eventBody - The body from the POST request
 * @author jordanskomer
 */
export function create(eventBody: string) {
  return new Promise((resolve, reject) => {
    const jsonBody = JSON.parse(eventBody);
    checkBody(jsonBody, reject);
    const Item = new Project(jsonBody.name, jsonBody.owner);
    db.put({
      ConditionExpression: 'attribute_not_exists(#id)',
      ExpressionAttributeNames: {
        '#id': 'id',
      },
      Item,
      TableName: dynamodb.tables.projects,
    }).promise().then((result) => {
      resolve(new Response({
        data: Item,
        status: ResponseStatus.success,
      }));
    }).catch((error) => {
      reject(new Response({
        code: error.code,
        message: error.message,
        status: ResponseStatus.fail,
        statusCode: error.statusCode,
      }));
    });
  });
}

export function find(query: {}): Promise<{}> {
  return new Promise((resolve, reject) => {
    checkBody(query, reject, false);
    db.query({
      ExpressionAttributeNames: {
        '#name': 'name',
        '#owner': 'owner',
      },
      ExpressionAttributeValues: {
        ':owner': query['owner'],
      },
      IndexName: 'OwnerIndex',
      KeyConditionExpression: '#owner = :owner',
      ProjectionExpression: 'id, #name',
      ScanIndexForward: true,
      TableName: dynamodb.tables.projects,
    }).promise().then((result) => {
      console.log(result);
      if (result.Items.length > 0) {
        resolve(result.Items);
      } else {
        reject('No projects not found');
      }
    }).catch((error) => {
      reject(new Response({
        code: error.code,
        message: error.message,
        status: ResponseStatus.fail,
        statusCode: error.statusCode,
      }));
    });
  });
}
