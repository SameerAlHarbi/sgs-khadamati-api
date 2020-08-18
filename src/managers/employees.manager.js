const erpClient = require('../util/erp-client');
const { dateUtil } = require('@abujude/sgs-khadamati');

exports.getAllEmployees = async (employeesIds = [],
     fromDate = new Date(), 
     toDate = new Date(), 
     status = 'date', 
     lang = 'A') => {

    lang = lang.toUpperCase();
    
    try {

        const searchQuery = {
            employeesIds,
            fromDate: dateUtil.formatDate(fromDate, dateUtil.defaultTextFormat),
            toDate: dateUtil.formatDate(toDate, dateUtil.defaultTextFormat),
            dateFormat: dateUtil.defaultTextFormat,
            status,
            lang
        }

        // const responseData = await erpClient.getErpData('employees', searchQuery);
        const responseData = await erpClient.getData('employees', searchQuery);
        return responseData;

    } catch(e) {
        throw e;
    }
}

exports.getEmployeeById = async (employeeId, lang = 'A') => {

    lang = lang.toUpperCase();

    if(isNaN(employeeId)) {
        throw new Error('Invalid employee id !!');
    }

    try {

        const responseData = await erpClient.getData(`employees/${employeeId}`, { lang });
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
            fromDate: dateUtil.formatDate(fromDate, dateUtil.defaultTextFormat),
            toDate: dateUtil.formatDate(toDate, dateUtil.defaultTextFormat),
            dateFormat: dateUtil.defaultTextFormat
        }

        const responseData = await erpClient.getData(`employees/${employeeId}/salary`, searchQuery);
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
            fromDate: dateUtil.formatDate(fromDate, dateUtil.defaultTextFormat),
            toDate: dateUtil.formatDate(toDate, dateUtil.defaultTextFormat),
            dateFormat: dateUtil.defaultTextFormat,
            lang
        }

        const responseData = await erpClient.getData(`employees/${employeeId}/manager`, searchQuery);
        return responseData;

    } catch(e) {
        throw e;
    }
}