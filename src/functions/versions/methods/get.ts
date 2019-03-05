import { Response, ResponseStatusCode } from '@models/Response';
import S3 = require('aws-sdk/clients/s3');
import { retrieveVersionNumber, STASH_BUCKET } from '../helper';
const Promise = require('es6-promise').Promise;
const s3 = new S3();
let startTime;

const getVersion = (queryParams) => {
  return new Promise((resolve, reject) => {
    if (!queryParams && !queryParams.username && !queryParams.project) {
      reject(new Response({
        message: 'Username or project param is missing',
        responseTime: new Date().getTime() - startTime,
        status: 'error',
        statusCode: ResponseStatusCode.BadRequest,
      }));
    }
    s3.listObjects({
      Bucket: STASH_BUCKET,
      Delimiter: '/',
      Prefix: `${queryParams.username}/${queryParams.project}/`,
    }, (err, data) => {
      if (!data) {
        reject(new Response({
          message: 'Error retrieving versions from S3',
          responseTime: new Date().getTime() - startTime,
          status: 'error',
          statusCode: ResponseStatusCode.BadRequest,
        }));
      } else {
        const versionNumber = retrieveVersionNumber(data);
        resolve(new Response({
          data: { version: {
            bucket: STASH_BUCKET,
            fileCount: {
              db: 0,
              media: 0,
              plugins: 0,
              theme: 0,
              total: 0,
            },
            number: versionNumber,
            path: `${queryParams.username}/${queryParams.project}/${versionNumber}`,
            stashes: {
             db: true,
             media: true,
             plugins: true,
             theme: true,
            },
          } },
          responseTime: new Date().getTime() - startTime,
          status: 'ok',
        }));
      }
    });
  });
};

export const handler = (event, context, cb) => {
  startTime = new Date().getTime();
  getVersion(event.queryStringParameters)
    .then((result: Response) => cb(undefined, result.send()))
    .catch((error: Response) => cb(error.send(), undefined));
};
