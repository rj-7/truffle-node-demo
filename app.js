const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const router = require('./src/routers/index')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
app.use(morgan('combined'));
app.use('/', router);

app.listen(8000, () => {
    console.log('listening on port 8000');
});