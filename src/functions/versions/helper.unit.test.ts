import * as helpers from '@functions/versions/helper';

const mockS3GetResponse = {
  CommonPrefixes: [
    {
      Prefix: 'test@user.com/test-project/1',
    },
    {
      Prefix: 'test@user.com/test-project/2',
    },
    {
      Prefix: 'test@user.com/test-project/3',
    },
  ],
};

const mockS3InvalidReponse = {
  CommonPrefixes: [
    {
      Prefix: 'wrong/wrong/1234',
    },
  ],
};

test('S3 Stash Bucket defaults to stashes.kokhane.com', () => {
  expect(helpers.STASH_BUCKET).toEqual('stashes.kohkane.com');
});

test('Retrieve current version number from S3 response', () => {
  expect(helpers.retrieveVersionNumber(mockS3GetResponse)).toEqual(3);
});

test('Retrieve version 1 if no folders in S3 response', () => {
  expect(helpers.retrieveVersionNumber({ CommonPrefixes: [] })).toEqual(1);
});

test('Receive undefined on none user/project folders', () => {
  expect(helpers.retrieveVersionNumber(mockS3InvalidReponse)).toEqual(undefined);
});
