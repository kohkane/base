import { doc, tables } from '../../db/client';
import { Response, ResponseStatus } from '../../db/models/response';

export function remove(projectId: string) {
  return new Promise((resolve, reject) => {
    doc.delete({
      Key: {
        id: projectId,
      },
      TableName: tables.projects,
    }).promise().then((result) => {
      resolve(new Response({
        data: { id: projectId },
        message: 'Project deleted',
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
