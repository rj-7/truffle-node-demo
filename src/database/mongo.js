const {MongoMemoryServer} = require('mongodb-memory-server');
const {MongoClient} = require('mongodb');

let database = null;

async function startDatabase() {
    const mongo = new MongoMemoryServer();
    await mongo.start()
    const mongoDBURL = mongo.getUri();
    const connection = await new MongoClient(mongoDBURL, {}).connect();
    database = connection.db();
}

async function getDatabase() {
    if (!database) await startDatabase();
    return database;
}

module.exports = {
    getDatabase
};