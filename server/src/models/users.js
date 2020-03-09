const users = {
  TableName: "users",
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  },
  AttributeDefinitions: [{ AttributeName: "uuid", AttributeType: "S" }],
  KeySchema: [{ AttributeName: "uuid", KeyType: "HASH" }]
};

module.exports = users;
