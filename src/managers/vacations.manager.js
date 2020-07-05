const { Op } = require('sequelize');
const VacationRequest = require('../models/vacation-request.model');
const dateUtil = require('../util/date');
const erpClient = require('../util/erp-client');

exports.getAllVacations = async (
    employeesIds = [],
    fromDate = null,
    toDate = null,
    registerDate = null, 
    vacationsTypesIds = [],
    lang = 'A') => {

    lang = lang.toUpperCase();
    
    try {

        const searchQuery = {
            employeesIds,
            fromDate: dateUtil.formatDate(fromDate, dateUtil.defaultTextDateFormat),
            toDate: dateUtil.formatDate(toDate, dateUtil.defaultTextDateFormat),
            registerDate: dateUtil.formatDate(registerDate, dateUtil.defaultTextDateFormat), 
            dateFormat: dateUtil.defaultTextDateFormat,
            vacationsTypesIds,
            lang
        }

        const responseData = await erpClient.getErpData('vacations', searchQuery);
        return responseData;
    } catch(e) {
        console.log(e);
        throw e;
    }
}

exports.getAllRequests = async (
    ids = [], 
    employees = [], 
    requestedBy = [],
    commissioners = [],
    managers = [],
    originalManagers = [],
    vacationsTypes = [],
    startDate = null,
    endDate = null,
    requestFromDate = null,
    requestToDate = null,
    status = []) => {
   
    try {

        let where = {};
        where.id = {[ids.length > 0 ? Op.in : Op.notIn] : ids};
        where.employeeId = {[employees.length > 0 ? Op.in : Op.notIn] : employees};
        where.requestedByEmployeeId = {[requestedBy.length > 0 ? Op.in : Op.notIn] : requestedBy};
        where.commissionerEmployeeId = {[commissioners.length > 0 ? Op.in : Op.notIn] : commissioners};
        where.managerId = {[managers.length > 0 ? Op.in : Op.notIn] : managers};
        where.originalManagerId = {[originalManagers.length > 0 ? Op.in : Op.notIn] : originalManagers};
        where.vacationTypeId = {[vacationsTypes.length > 0 ? Op.in : Op.notIn] : vacationsTypes};
        where.status = {[status.length > 0 ? Op.in : Op.notIn] : status};

        if(startDate || endDate) {

            where.endDate = {};
            if(startDate) {
                where.endDate[Op.gte] = new Date(startDate.toDateString());
            }
            if(endDate) {
                where.endDate[Op.lt] = date.addDays(new Date(endDate.toDateString()), 1);
            }
        }

        if (requestFromDate || requestToDate) {
            where.requestDate = {};
            if(requestFromDate) {
                where.requestDate[Op.gte] = requestFromDate;
            }
            if(requestToDate) {
                where.requestDate[Op.lte] = requestToDate;
            }
        }

        const results = await VacationRequest.findAll({where});
        return results;
    } catch(e) {
        throw e;
    }
}

exports.createVacationRequest = async (vacationRequest) => {
 
    try {
        const results = await VacationRequest.create(vacationRequest);
        return results;
    } catch(e) {
        throw e;
    }
}