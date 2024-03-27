const { MongoClient } = require('mongodb');
// const { DATABASE_URL } = require('./config');
const DATABASE_URL = "mongodb+srv://james:applepie@cis3500.yqpjrwc.mongodb.net/?retryWrites=true&w=majority&appName=CIS3500";

let MongoConnection;
const connect = async () => {
  try {
    MongoConnection = await MongoClient.connect(
      DATABASE_URL,
    );
    return MongoConnection;
  } catch (err) {
    return err;
  }
};

const getDB = async () => {
  if (!MongoConnection) {
    await connect();
  }

  return MongoConnection.db();
};

const closeMongoDBConnection = async () => {
  await MongoConnection.close();
};

module.exports = {
  closeMongoDBConnection,
  getDB,
  connect,
};