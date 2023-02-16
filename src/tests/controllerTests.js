const request = require('supertest');
const express = require('express');
const app = express();
const getBillService = require('../services/getBillsService');
const postBillService = require('../services/postBillService');
const bodyParser = require("body-parser");
const router = require("../routers");
const {json} = require("body-parser");

jest.mock('../services/getBillsService');
jest.mock('../services/postBillService');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', router);

describe('getBills tests', () => {
    test('200 status with a patient id and correct bills', async () => {
        const mockBills = [
            {
                "_id": "63ed9d42534139f6bc4aa94a",
                "patientId": "encryptedIdOne",
                "patientFirstName": "Test",
                "patientLastName": "One",
                "patientAddress": {
                    "addressLineOne": "2214 Test Dr",
                    "addressLineTwo": "Apt 1",
                    "zip": "11111",
                    "city": "Boulder",
                    "state": "CO"
                },
                "serviceDate": "2022-08-08",
                "billTotal": "52.49"
            },
            {
                "_id": "63ed9d50534139f6bc4aa94b",
                "patientId": "encryptedIdOne",
                "patientFirstName": "Test",
                "patientLastName": "One",
                "patientAddress": {
                    "addressLineOne": "2214 Test Dr",
                    "addressLineTwo": "Apt 1",
                    "zip": "11111",
                    "city": "Boulder",
                    "state": "CO"
                },
                "serviceDate": "2022-08-09",
                "billTotal": "5.49"
            }
        ];
        getBillService.getBills.mockResolvedValue(mockBills);
        const response = await request(app).get('/items/encryptedIdOne');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockBills);
    });

    test('404 error with no patient id', async () => {
        const response = await request(app).get('/items/');
        expect(response.status).toBe(404);
    });

    test('500 status', async () => {
        const mockError = new Error('getBills error');
        getBillService.getBills.mockRejectedValue(mockError);
        const response = await request(app).get('/items/encryptedIdOne');
        expect(response.status).toBe(500);
    });

    afterEach(() => {
        jest.resetAllMocks()
    })
});

describe('postBill tests', () => {
    test('returns 201 with valid request', async () => {
        const mockRequest = {
            "patientId": "encryptedIdOne",
            "patientFirstName": "Test",
            "patientLastName": "One",
            "patientAddress": {
                "addressLineOne": "2214 Test Dr",
                "addressLineTwo": "Apt 1",
                "zip": "11111",
                "city": "Boulder",
                "state": "CO"
            },
            "serviceDate": "2022-08-08",
            "billTotal": "52.49"
        };
        postBillService.createBill.mockResolvedValue();
        const response = await request(app).post('/item').send(mockRequest);
        expect(response.status).toBe(201);
    });

    test('returns 400 with empty body', async () => {
        const mockRequest = {};
        const response = await request(app).post('/item').send(mockRequest);
        expect(response.status).toBe(400);
    });

    test('returns 400 with missing address details', async () => {
        const mockRequest = {
            "patientId": "encryptedIdOne",
            "patientFirstName": "Test",
            "patientLastName": "One",
            "patientAddress": {
                "addressLineOne": "2214 Test Dr",
                "addressLineTwo": "Apt 1",
                "zip": "",
                "city": "Boulder",
                "state": "CO"
            },
            "serviceDate": "2022-08-08",
            "billTotal": "52.49"
        };
        const response = await request(app).post('/item').send(mockRequest);
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            {"message": "Address incomplete: zip"});
    });

    test('returns 400 with incomplete name', async () => {
        const mockRequest = {
            "patientId": "encryptedIdOne",
            "patientFirstName": "Test",
            "patientLastName": "",
            "patientAddress": {
                "addressLineOne": "2214 Test Dr",
                "addressLineTwo": "Apt 1",
                "zip": "11111",
                "city": "Boulder",
                "state": "CO"
            },
            "serviceDate": "2022-08-08",
            "billTotal": "52.49"
        };
        const response = await request(app).post('/item').send(mockRequest);
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            {"message": "patientLastName is a required string"});
    });

    test('returns 400 with missing id', async () => {
        const mockRequest = {
            "patientId": "",
            "patientFirstName": "Test",
            "patientLastName": "joe",
            "patientAddress": {
                "addressLineOne": "2214 Test Dr",
                "addressLineTwo": "Apt 1",
                "zip": "11111",
                "city": "Boulder",
                "state": "CO"
            },
            "serviceDate": "2022-08-08",
            "billTotal": "52.49"
        };
        const response = await request(app).post('/item').send(mockRequest);
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            {"message": "patientId is a required string"});
    });

    test('returns 500 with error message', async () => {
        const mockRequest = {
            "patientId": "encryptedIdOne",
            "patientFirstName": "Test",
            "patientLastName": "One",
            "patientAddress": {
                "addressLineOne": "2214 Test Dr",
                "addressLineTwo": "Apt 1",
                "zip": "11111",
                "city": "Boulder",
                "state": "CO"
            },
            "serviceDate": "2022-08-08",
            "billTotal": "52.49"
        };
        const mockError = new Error('postBill error');
        postBillService.createBill.mockRejectedValue(mockError);
        const response = await request(app).post('/item').send(mockRequest);
        expect(response.status).toBe(500);
    });

    afterEach(() => {
        jest.resetAllMocks()
    })
});