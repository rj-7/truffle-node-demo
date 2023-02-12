const billsDb = require('../database/bills')

const getBills = async (userId) => {
    try {
        return await billsDb.getBills(userId)
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    getBills
}