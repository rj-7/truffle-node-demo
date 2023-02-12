const billsDb = require('../database/bills')

const createBill = async (content) => {
    try {
        return await billsDb.createBill(content)
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    createBill
}