const express = require('express')

const billsController = require('../controllers/controller')
const getBillService = require("../services/getBillsService");

const router = express.Router()

router.get('/items/:userId', billsController.getBills)
router.post('/item', billsController.postBill)

module.exports = router