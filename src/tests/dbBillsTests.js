const {MongoClient} = require('mongodb');
const {createBill, getBills} = require('../database/bills');
const {MongoMemoryServer} = require("mongodb-memory-server");

describe('Bills database module', () => {
    let connection;
    let db;

    beforeAll(async () => {
        const mongo = new MongoMemoryServer();
        await mongo.start()
        const mongoDBURL = mongo.getUri();
        const connection = await new MongoClient(mongoDBURL, {}).connect();
        db = await connection.db();
    });

    describe('createBill function', () => {
        test('should insert a new bill into the database', async () => {
            await db.collection('bills').deleteMany({});
            const bill = {
                "patientId": "encryptedIdOne", "patientFirstName": "Test", "patientLastName": "One", "patientAddress": {
                    "addressLineOne": "2214 Test Dr",
                    "addressLineTwo": "Apt 1",
                    "zip": "11111",
                    "city": "Boulder",
                    "state": "CO"
                }, "serviceDate": "2022-08-08", "billTotal": "52.49"
            };
            const insertedId = await createBill(bill);
            expect(insertedId).toBeTruthy();
        });
    });

    describe('getBills function', () => {
        test('should return an array of bills for the given userId, 1 bill', async () => {
            const userId = 'encryptedIdOne';
            const bills = await getBills(userId);
            expect(bills.length).toBe(1);
        });

        test('should return an array of bills for the given userId, no bills', async () => {
            const userId = 'encryptedIdTwo';
            const bills = await getBills(userId);
            expect(bills.length).toBe(0);
        });
    });
});
