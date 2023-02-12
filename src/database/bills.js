const {getDatabase} = require('./mongo');

const billCollection = 'bills';

async function createBill(bill) {
    const database = await getDatabase();
    const {insertedId} = await database.collection(billCollection).insertOne(bill);
    return insertedId;
}

async function getBills(userId) {
    const database = await getDatabase();
    return await database.collection(billCollection).find({patientId: userId}).toArray();
}

module.exports = {
    createBill,
    getBills
};