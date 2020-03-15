const users = {
  TableName: "users",
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  },
  KeySchema: [
    { AttributeName: "email", KeyType: "HASH" },
    { AttributeName: "uuid", KeyType: "RANGE" }
  ],
  AttributeDefinitions: [
    { AttributeName: "email", AttributeType: "S" },
    { AttributeName: "uuid", AttributeType: "S" }
  ]
};

module.exports = users;
