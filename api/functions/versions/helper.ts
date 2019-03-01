/**
 * Defaults to stashes.kohkane.com but allows for overridding if the env variable STASH_BUCKET
 * is set
 *
 * @author jordanskomer
 */
export const STASH_BUCKET: string = process.env.STASH_BUCKET || 'stashes.kohkane.com';

/**
 * Returns the current version number from the current project's S3 structure
 *
 * @param s3Response - The response from the S3 list objects call
 * @author jordanskomer
 */
export const retrieveVersionNumber = (s3Response): number => {
  let version = 1;
  // The root project folder is always shown in S3 return, so if there's more than one result
  // then we have versions already and need to pull the newest one
  if (s3Response.CommonPrefixes.length > 1) {
    // Returns the current version number from the Key (Path) string
    // Key (Path) Ex: evan@kohkane.com/test-application/1/
    version = parseInt(/\/(\d+)\//.exec(s3Response.CommonPrefixes[s3Response.CommonPrefixes.length - 1].Prefix)[1], 10);
  }
  return version;
};
