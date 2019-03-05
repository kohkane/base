// import { S3 } from 'aws-sdk';
// import { retrieveVersionNumber } from '../helper';
// const s3 = new S3();

// const setupVersionFolderStructure = (basePath: string): void => {
//   // @TODO Change this based on person's plan
//   const baseFolders = ['media', 'db', 'plugins', 'theme'];
//   for (let i = baseFolders.length - 1; i >= 0; i--) {
//     s3.putObject({
//       Bucket: process.env.STASH_BUCKET,
//       Key: `${basePath}${baseFolders[i]}/`,
//     }, (err, data) => {
//       if (err) { console.error(err); }
//     });
//   }
// };

// const setupNewVersion = (username: string, app: string, version: number): Promise<string> => {
//   const versionString = `${username}/${app}/${version}/`;
//   return new Promise((resolve, reject) => {
//     s3.putObject({
//       Bucket: process.env.STASH_BUCKET,
//       Key: versionString,
//     }, (err, data) => {
//       if (err) {
//         reject(undefined);
//       } else {
//         resolve(versionString);
//         setupVersionFolderStructure(versionString);
//       }
//     });
//   });
// };

// export const newVersion = (body) => {
//   const payload = JSON.parse(body);
//   return new Promise((resolve, reject) => {
//     s3.listObjects({
//       Bucket: process.env.STASH_BUCKET,
//       Delimiter: '/',
//       Prefix: `${payload.username}/${payload.project}/`,
//     }, async (err, data) => {
//       if (err) { reject(err); }
//       const versionNum = retrieveVersionNumber(data) + 1;
//       const result = await setupNewVersion(
//         payload.username,
//         payload.project,
//         versionNum,
//       );
//       if (!result) {
//         reject({ message: 'Error creating version' });
//       } else {
//         resolve({ url: result, version: versionNum });
//       }
//     });
//   });
// };
