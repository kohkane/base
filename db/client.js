var AWS = require('aws-sdk'),
  options = {
    region: "localhost",
    endpoint: "http://localhost:8000/"
  };

var isOffline = function () {
  return process.env.IS_OFFLINE;
};

module.exports = {
  doc: isOffline() ? new AWS.DynamoDB.DocumentClient(options) : new AWS.DynamoDB.DocumentClient(),
  raw: isOffline() ? new AWS.DynamoDB(options) : new AWS.DynamoDB(),
  tables: {
    users: `${process.env.PROJECT_ENV}-users`,
  }
};