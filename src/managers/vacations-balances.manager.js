const vacationsTypesManager = require('./vacations-types.manager');
const dateUtil = require('../util/date');

exports.getAllVacationsBalances = async (employeesIds = [],
     fromDate = new Date(),
     toDate = new Date(), 
     vacationsTypesIds = [],
     lang = 'A') => {

    lang = lang.toUpperCase();

    try {

        const searchQuery = {
            employeesIds,
            fromDate: dateUtil.formatDate(fromDate, dateUtil.defaultTextDateFormat),
            toDate: dateUtil.formatDate(toDate, dateUtil.defaultTextDateFormat),
            dateFormat: dateUtil.defaultTextDateFormat,
            vacationsTypesIds,
            lang
        }

        const responseData = await erpClient.getErpData('vacations/balances', searchQuery);
        return responseData;
    } catch(e) {
        throw e;
    }
}

exports.getAllVacationsBalancesSummaries = async (
    employeesIds = [],
    balanceDate = new Date(),
    vacationsTypesIds = [],
    lang = 'A') => {

        lang = lang.toUpperCase();

        try {

            const searchQuery = {
                employeesIds,
                balanceDate: dateUtil.formatDate(balanceDate, dateUtil.defaultTextDateFormat),
                dateFormat: dateUtil.defaultTextDateFormat,
                vacationsTypesIds,
                lang
            }
    
            const responseData = await erpClient.getErpData('vacations/balances/summary', searchQuery);
            return responseData;
        } catch (e) {
            throw e;
        }
}