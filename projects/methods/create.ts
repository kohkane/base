import { doc, invalidParams, tables } from '../../db/client';
import { Project } from '../../db/models/project';
import { Response, ResponseStatus } from '../../db/models/response';
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
    invalidParams(jsonBody, reject, ['name', 'owner']);
    const Item = new Project({ name: jsonBody.name, owner: jsonBody.owner }, true);
    doc.get({
      Key: {
        id: Item.id,
      },
      ProjectionExpression: 'id',
      TableName: tables.projects,
    }).promise().then((r) => {
      if (r.Item) {
        reject(new Response({
          data: jsonBody,
          message: 'Project already exists',
          status: ResponseStatus.fail,
          statusCode: 409,
        }));
      } else {
        doc.put({
          Item,
          TableName: tables.projects,
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
      }
    }).catch((e) => {
      reject(new Response({
        code: e.code,
        message: e.message,
        status: ResponseStatus.fail,
        statusCode: e.statusCode,
      }));
    });
  });
}