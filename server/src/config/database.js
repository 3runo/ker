const AWS = require("aws-sdk");
const sdkConfig = { apiVersion: "2012-08-10" };

const {
  AWS_DB_ACCESS_KEY_ID,
  AWS_DB_SECRET_ACCESS_KEY,
  AWS_DB_REGION
} = process.env;

AWS.config.update({
  region: String(AWS_DB_REGION),
  accessKeyId: String(AWS_DB_ACCESS_KEY_ID),
  secretAccessKey: String(AWS_DB_SECRET_ACCESS_KEY)
});

module.exports = {
  dynamoDB: new AWS.DynamoDB(sdkConfig),
  dynamoDBCli: new AWS.DynamoDB.DocumentClient(sdkConfig),
  awsSDK: AWS
};
