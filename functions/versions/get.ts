import * as S3 from 'aws-sdk/clients/s3';
// const s3 = new S3();

const setupVersionFolderStructure = (basePath: string): void => {
  // @TODO Change this based on person's plan
  const baseFolders = ['media', 'db', 'plugins', 'theme'];
  for (let i = baseFolders.length - 1; i >= 0; i--) {
    s3.putObject({
      Bucket: process.env.STASH_BUCKET,
      Key: `${basePath}${baseFolders[i]}/`,
    }, (err, data) => {
      if (err) { console.error(err); }
    });
  }
};

const setupNewVersion = (username: string, app: string, version: number): Promise<string> => {
  const versionString = `${username}/${app}/${version}/`;
  return new Promise((resolve, reject) => {
    s3.putObject({
      Bucket: process.env.STASH_BUCKET,
      Key: versionString,
    }, (err, data) => {
      if (err) {
        reject(undefined);
      } else {
        resolve(versionString);
        setupVersionFolderStructure(versionString);
      }
    });
  });
};

/**
 * Returns the current version number from the current project's S3 structure
 *
 * @param s3Response - The response from the S3 list objects call
 * @author jordanskomer
 */
const retrieveVersionNumber = (s3Response: S3.ListObjectsOutput): number => {
  let version = 1;
  // The root project folder is always shown in S3 return, so if there's more than one result
  // then we have versions already and need to pull the newest one
  console.log('versions', s3Response.CommonPrefixes);
  if (s3Response.CommonPrefixes.length > 1) {
    // Returns the current version number from the Key (Path) string
    // Key (Path) Ex: evan@kohkane.com/test-application/1/
    version = parseInt(/\/(\d+)\//.exec(s3Response.CommonPrefixes[s3Response.CommonPrefixes.length - 1].Prefix)[1], 10);
  }
  return version;
};

export const newVersion = (body) => {
  const payload = JSON.parse(body);
  return new Promise((resolve, reject) => {
    s3.listObjects({
      Bucket: DEFAULT_BUCKET,
      Delimiter: '/',
      Prefix: `${payload.username}/${payload.project}/`,
    }, async (err, data) => {
      if (err) { reject(err); }
      const versionNum = retrieveVersionNumber(data) + 1;
      const result = await setupNewVersion(
        payload.username,
        payload.project,
        versionNum,
      );
      if (!result) {
        reject({ message: 'Error creating version' });
      } else {
        resolve({ url: result, version: versionNum });
      }
    });
  });
};

export const getVersion = (queryParams) => {
  return new Promise((resolve, reject) => {
    if (!queryParams && !queryParams.username && !queryParams.project) {
      reject({
        message: 'Username or project param is missing',
      });
    }
    s3.listObjects({
      Bucket: DEFAULT_BUCKET,
      Delimiter: '/',
      Prefix: `${queryParams.username}/${queryParams.project}/`,
    }, (err, data) => {
      if (!data) {
        reject({ message: 'Error retrieving versions from S3' });
      } else {
        resolve({ version: retrieveVersionNumber(data) });
      }
    });
  });
};
