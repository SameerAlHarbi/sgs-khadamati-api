const erpClient = require('../util/erp-client');
const { dateUtil } = require('@abujude/sgs-khadamati');

exports.getAllDepartments = async (
    fromDate = new Date(), 
    toDate = new Date(),
    flat = false,
    lang = 'A') => {

        lang = lang.toUpperCase();   
        
        try {

            const searchQuery = {
                fromDate: dateUtil.formatDate(fromDate, dateUtil.defaultTextFormat),
                toDate: dateUtil.formatDate(toDate, dateUtil.defaultTextFormat),
                dateFormat: dateUtil.defaultTextFormat,
                flat,
                lang
            };

            const responseData = await erpClient.getData('departments', searchQuery);
            return responseData;

        } catch(e) {
            throw e;
        }
}

exports.getDepartmentById = async (
    departmentId, 
    fromDate = new Date(), 
    toDate = new Date(), 
    childDepth = -1, 
    lang = 'A') => {

        lang = lang.toUpperCase(); 

        if(!departmentId) {
            throw new error('Invalid department id !!')
        }

        try {

            const searchQuery = {
                fromDate: dateUtil.formatDate(fromDate, dateUtil.defaultTextFormat),
                toDate: dateUtil.formatDate(toDate, dateUtil.defaultTextFormat),
                dateFormat: dateUtil.defaultTextFormat,
                childDepth,
                lang
            };

            const responseData = await erpClient.getData(`departments/${departmentId}`, searchQuery);
            return responseData;

        } catch(e) {
            throw e;
        }
}

exports.getChildDepartments = async (
    departmentId ,
    fromDate = new Date(), 
    toDate = new Date(),
    childDepth = -1, 
    flat = false,
    lang = 'ِA' )  => {

        lang = lang.toUpperCase(); 

        if(!departmentId) {
            throw new error('Invalid department id !!')
        }

        try {

            const searchQuery = {
                fromDate: dateUtil.formatDate(fromDate, dateUtil.defaultTextFormat),
                toDate: dateUtil.formatDate(toDate, dateUtil.defaultTextFormat),
                dateFormat: dateUtil.defaultTextFormat,
                childDepth,
                flat,
                lang
            };

            const responseData = await erpClient.getData(`departments/${departmentId}/childs`, searchQuery);
            return responseData;

        } catch(e) {
            throw e;
        }
}
