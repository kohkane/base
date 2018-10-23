import { doc, tables } from '../../db/client';
import { Project } from '../../db/models/project';
import { Response, ResponseStatus } from '../../db/models/response';
/**
 * Creates the update query in the format defined in the AWS docs.
 * It will only add items that exist in the Project model.
 *
 * https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html
 *
 * @param projectId - The id of the project to update
 * @param body - The body from the PUT request
 * @author jordanskomer
 */
function buildUpdateQuery(projectId, body) {
  let UpdateExpression = 'set ';
  const ExpressionAttributeValues = {};
  const ExpressionAttributeNames = {};
  new Project(JSON.parse(body)).getItem((item, key) => {
    ExpressionAttributeValues[`:${key}`] = item;
    ExpressionAttributeNames[`#${key}`] = key;
    UpdateExpression += `#${key} = :${key}, `;
  });
  return {
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    Key: { id: projectId },
    TableName: tables.projects,
    // Remove last comma and space from string;
    UpdateExpression: UpdateExpression.substring(0, UpdateExpression.length - 2),
  };
}
/**
 * Updates a
 *
 * @param projectId - The project id from the path input
 * @param body - The JSON body from the PUT request
 */
export function update(projectId: string, body: {}) {
  return new Promise((resolve, reject) => {
    console.log(buildUpdateQuery(projectId, body))
    doc.update(buildUpdateQuery(projectId, body)).promise().then((result) => {
      resolve(new Response({
        data: result,
        status: ResponseStatus.success,
      }));
    }).catch((error) => {
      console.log(error);
      resolve(new Response({
        code: error.code,
        message: error.message,
        status: ResponseStatus.fail,
        statusCode: error.statusCode,
      }));
    });
  });
}
