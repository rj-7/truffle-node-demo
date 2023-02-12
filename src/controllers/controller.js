const getBillService = require('../services/getBillsService')
const postBillService = require('../services/postBillService')

const validateString = (name) => {
    return name && typeof name === "string"
}

const validateRequest = (req) => {
    if (!req) {
        return "No request body"
    }
    const {
        patientId,
        patientFirstName,
        patientLastName,
        patientAddress,
        serviceDate,
        billTotal
    } = req
    if (!validateString(patientId)) {
        return "patientId is a required string"
    }
    if (!validateString(patientFirstName)) {
        return "patientFirstName is a required string"
    }
    if (!validateString(patientLastName)) {
        return "patientLastName is a required string"
    }
    if (!patientAddress || typeof patientAddress !== "object") {
        return "patientAddress is missing"
    }
    if (!validateString(patientAddress.addressLineOne)) {
        return "Address incomplete: address line 1"
    }
    if (!validateString(patientAddress.zip)) {
        return "Address incomplete: zip"
    }
    if (!validateString(patientAddress.city)) {
        return "Address incomplete: city"
    }
    if (!validateString(patientAddress.state)) {
        return "Address incomplete: state"
    }
    if (!validateString(serviceDate)) {
        return "serviceDate is a required string"
    }
    if (!validateString(billTotal)) {
        return "billTotal is a required string"
    }
    return null
}

const getBills = async (req, res, next) => {
    const userId = req.params.userId
    try {
        const bills = await getBillService.getBills(userId)
        res.status(200).send(bills)
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const postBill = async (req, res, next) => {
    const content = req.body
    const validation = validateRequest(content)
    if (validation) {
        res.status(400).json({"message": validation})
        return
    }
    try {
        await postBillService.createBill(content)
        res.sendStatus(201)
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

module.exports = {
    getBills,
    postBill
}