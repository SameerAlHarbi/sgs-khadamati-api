const dateUtil = require('../util/date');
const erpClient = require('../util/erp-client');

exports.getAllDepartments = async (
    fromDate = new Date(), 
    toDate = new Date(),
    flatData = false,
    lang = 'A') => {

        lang = lang.toUpperCase();   
        
        try {

            const searchQuery = {
                fromDate: dateUtil.formatDate(fromDate, dateUtil.defaultTextDateFormat),
                toDate: dateUtil.formatDate(toDate, dateUtil.defaultTextDateFormat),
                dateFormat: dateUtil.defaultTextDateFormat,
                flatData,
                lang
            };

            const responseData = await erpClient.getErpData('departments', searchQuery);
            return responseData;

        } catch(e) {
            throw e;
        }
}

exports.getDepartmentById = async (
    departmentId, 
    fromDate = new Date(), 
    toDate = new Date(), 
    childsDepth = -1, 
    lang = 'A') => {

        lang = lang.toUpperCase(); 

        if(!departmentId) {
            throw new error('Invalid department id !!')
        }

        try {

            const searchQuery = {
                fromDate: dateUtil.formatDate(fromDate, dateUtil.defaultTextDateFormat),
                toDate: dateUtil.formatDate(toDate, dateUtil.defaultTextDateFormat),
                dateFormat: dateUtil.defaultTextDateFormat,
                childsDepth,
                lang
            };

            const responseData = await erpClient.getErpData(`departments/${departmentId}`, searchQuery);
            return responseData;

        } catch(e) {
            throw e;
        }
}

exports.getChildDepartments = async (
    departmentId ,
    fromDate = new Date(), 
    toDate = new Date(),
    childsDepth = -1, 
    flatData = false,
    lang = 'ِA' )  => {

        lang = lang.toUpperCase(); 

        if(!departmentId) {
            throw new error('Invalid department id !!')
        }

        try {

            const searchQuery = {
                fromDate: dateUtil.formatDate(fromDate, dateUtil.defaultTextDateFormat),
                toDate: dateUtil.formatDate(toDate, dateUtil.defaultTextDateFormat),
                dateFormat: dateUtil.defaultTextDateFormat,
                childsDepth,
                flatData,
                lang
            };

            const responseData = await erpClient.getErpData(`departments/${departmentId}/childs`, searchQuery);
            return responseData;

        } catch(e) {
            throw e;
        }
}
