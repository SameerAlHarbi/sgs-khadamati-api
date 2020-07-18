const dateUtil = require('../util/date');
const erpClient = require('../util/erp-client');

exports.getAllEmployees = async (employeesIds = [],
     fromDate = new Date(), 
     toDate = new Date(), 
     status = 'date', 
     lang = 'A') => {

    lang = lang.toUpperCase();
    
    try {

        const searchQuery = {
            employeesIds,
            fromDate: dateUtil.formatDate(fromDate, dateUtil.defaultTextDateFormat),
            toDate: dateUtil.formatDate(toDate, dateUtil.defaultTextDateFormat),
            dateFormat: dateUtil.defaultTextDateFormat,
            status,
            lang
        }

        const responseData = await erpClient.getErpData('employees', searchQuery);
        return responseData;

    } catch(e) {
        throw e;
    }
}

exports.getEmployeeById = async (employeeId, lang = 'A') => {

    lang = lang.toUpperCase();

    if(isNaN(employeeId)) {
        throw new error('Invalid employee id !!')
    }

    try {

        const responseData = await erpClient.getErpData(`employees/${employeeId}`, { lang });
        return responseData;
    } catch(e) {
        throw e;
    }
}

exports.getEmployeeSalary = async (employeeId, 
    fromDate = new Date(), 
    toDate = new Date()) => {

    if(isNaN(employeeId)) {
        throw new error('Invalid employee id !!')
    }

    try {

        const searchQuery = {
            fromDate: dateUtil.formatDate(fromDate, dateUtil.defaultTextDateFormat),
            toDate: dateUtil.formatDate(toDate, dateUtil.defaultTextDateFormat),
            dateFormat: dateUtil.defaultTextDateFormat
        }

        if(!employeeId || isNaN(employeeId)) {
            throw new Error('employee id required!')
        }

        const responseData = await erpClient.getErpData(`employees/${employeeId}/salary`, searchQuery);
        return responseData;

    } catch(e) {
        throw e;
    }

}

exports.getEmployeeManager = async (employeeId,
    fromDate = new Date(),
    toDate = new Date(),
    lang = 'A') => {

    lang = lang.toUpperCase();

    if(isNaN(employeeId)) {
        throw new error('Invalid employee id !!')
    }

    try {

        const searchQuery = {
            fromDate: dateUtil.formatDate(fromDate, dateUtil.defaultTextDateFormat),
            toDate: dateUtil.formatDate(toDate, dateUtil.defaultTextDateFormat),
            dateFormat: dateUtil.defaultTextDateFormat,
            lang
        }

        const responseData = await erpClient.getErpData(`employees/${employeeId}/manager`, searchQuery);
        return responseData;

    } catch(e) {
        throw e;
    }
}