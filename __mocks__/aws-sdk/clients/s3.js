'use strict';
function listObjects(params, cb) {
  cb(undefined, {
    CommonPrefixes: [
      {
        Prefix: `${params.Prefix}/1`,
      },
      {
        Prefix: `${params.Prefix}/2`,
      },
      {
        Prefix: `${params.Prefix}/3`,
      },
    ],
  });
}

module.exports = jest.fn().mockImplementation(() => {
  return {
    listObjects
  }
});