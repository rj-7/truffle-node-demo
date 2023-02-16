# truffle-node-demo

- Student name: Rakshith Jayanna


## To Run:

- In the project code base, execute command `npm start`
- For post bills end point, send a post request to `http://localhost:8000/item` on PostMan<br>
  Also add a request body, For example <br>
  `{
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
  }`
- For get bills end point, send a get request to `http://localhost:8000/items/{patientId}` <br>
  Replace patientID with a valid id to fetch the bill record
- To run tests for the endpoints, execute `npm test`, api tests are written for controllers/controller and db tests for database/bills

## Dependencies

- Database - Mongo In-Memory database
- Server App - Express
- Tests - Jest and SuperTest