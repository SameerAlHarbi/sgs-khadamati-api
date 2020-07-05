const vacationsManager = require('../managers/vacations.manager');
const VacationRequest = require('../models/vacation-request.model');
const dateUtil = require('../util/date');

exports.getAllVacations = async (req, res) => {
   
    const lang = req.query.lang;
    const employeesIds = req.query.employeesIds;
    const fromDateText = req.query.fromDate;
    const toDateText = req.query.toDate;
    const registerDateText = req.query.registerDate;
    const dateFormatText = req.query.dateFormat || dateUtil.defaultTextDateFormat;
    const vacationsTypesIds = req.query.vacationsTypesIds;

    const fromDateObject = dateUtil.parseDate(fromDateText, dateFormatText);
    const toDateObject = dateUtil.parseDate(toDateText, dateFormatText);
    const registerDateObject = dateUtil.parseDate(registerDateText, dateFormatText);

    const employeesIdsCollection = employeesIds ? employeesIds.split(',') : [];
    const vacationsTypesIdsCollection = vacationsTypesIds ? vacationsTypesIds.split(',') : [];

    try {

        const results = await vacationsManager.getAllVacations(
            employeesIdsCollection, 
            fromDateObject, 
            toDateObject,
            registerDateObject,
            vacationsTypesIdsCollection, 
            lang);
            
        res.send(results);
    } catch (e) {
        res.status(500).send();
    }
}

exports.getAllRequests = async (req, res) => {

    const ids = req.query.ids ? req.query.ids.split(',') : [];
    const employees = req.query.employees ? req.query.employees.split(',') : [];
    const requestedBy = req.query.requestedBy ? req.query.requestedBy.split(',') : [];
    const commissioners = req.query.commissioners ? req.query.commissioners.split(',') : [];
    const managers = req.query.managers ? req.query.managers.split(',') : [];
    const originalManagers = req.query.originalManagers ? req.query.originalManagers.split(',') : [];
    const vacationsTypes = req.query.vacationsTypes ? req.query.vacationsTypes.split(',') : [];
    const dateFormat = req.query.dateFormat || date.defaultCompiledDateFormat;
    const startDate = date.parseDate(req.query.startDate, dateFormat);
    const endDate = date.parseDate(req.query.endDate, dateFormat);
    const requestFromDate = date.parseDate(req.query.requestFromDate, dateFormat);
    const requestToDate = date.parseDate(req.query.requestToDate, dateFormat);
    const status = req.query.status ? req.query.status.split(',') : [];

    try {
        const results = await vacationsManager.getAllRequests(
            ids, 
            employees, 
            requestedBy, 
            commissioners,
            managers,
            originalManagers,
            vacationsTypes,
            startDate,
            endDate,
            requestFromDate,
            requestToDate,
            status);

        res.send(results);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({error: e.message});
    }
}

const validateRequest = (vacationRequest, dateFormat = date.defaultCompiledDateFormat) => {

    if(!vacationRequest) {
        return { message: 'Invalid vacation request!', propertyName: '', result: false };
    }

    const validationResult = { message : '', propertyName: '', result: true };

    vacationRequest.requestDate = date.parseDate(vacationRequest.requestDate, dateFormat);
    vacationRequest.startDate = date.parseDate(vacationRequest.startDate, dateFormat);
    vacationRequest.endDate = date.parseDate(vacationRequest.endDate, dateFormat);

    if(!vacationRequest.requestDate || isNaN(vacationRequest.requestDate)) {
        validationResult.message = 'Invalid request date!'
        validationResult.propertyName = 'requestDate';
    } else if (!vacationRequest.employeeId || isNaN(vacationRequest.employeeId)) {
        validationResult.message = 'Invalid employee id!'
        validationResult.propertyName = 'employeeId';
    } else if(!vacationRequest.startDate || isNaN(vacationRequest.startDate)) {
        validationResult.message = 'Invalid request start date!'
        validationResult.propertyName = 'startDate';
    } else if(!vacationRequest.endDate || isNaN(vacationRequest.endDate) || vacationRequest.endDate < vacationRequest.startDate) {
        validationResult.message = 'Invalid request end date!'
        validationResult.propertyName = 'endDate';
    } else if (!vacationRequest.vacationTypeId || isNaN(vacationRequest.vacationTypeId)) {
        validationResult.message = 'Invalid vacation type id!'
        validationResult.propertyName = 'vacationTypeId';
    } else if(!vacationRequest.requestedByEmployeeId || isNaN(vacationRequest.requestedByEmployeeId)) {
        validationResult.message = 'Invalid requested by employee id!'
        validationResult.propertyName = 'requestedByEmployeeId';
    } else if(!vacationRequest.managerId || isNaN(vacationRequest.managerId)) {
        validationResult.message = 'Invalid manager id!'
        validationResult.propertyName = 'managerId';
    } else if(!vacationRequest.originalManagerId || isNaN(vacationRequest.originalManagerId)) {
        validationResult.message = 'Invalid original manager id!'
        validationResult.propertyName = 'originalManagerId';
    } else if((vacationRequest.requestDate < date.addDays(vacationRequest.endDate, 1) || vacationRequest.commissionerEmployeeId) 
        && (!vacationRequest.commissionerEmployeeId || isNaN(vacationRequest.commissionerEmployeeId))) {
        validationResult.message = 'Invalid commissioner employee id!'
        validationResult.propertyName = 'commissionerEmployeeId';
    } else if (!vacationRequest.status) {
        validationResult.message = 'Invalid request status!'
        validationResult.propertyName = 'status';
    }

    validationResult.result = validationResult.message === '';
    
    return validationResult;
}

exports.createNewVacationRequest = async (req, res) => {

    const dateFormat = req.query.dateFormat || date.defaultCompiledDateFormat;

    try { 
        
        const vacationRequest = {...req.body,
            requestDate: date.formatDate(new Date(), dateFormat),
            requestedByEmployeeId: req.user.id,
            status: 'Pending',
            managerId: '865',
            originalManagerId: '1113' };

        const validationResult = validateRequest(vacationRequest, dateFormat);

        if(!validationResult.result) {
            return res.status(400).send({ error: validationResult.message, 
                type: 'Validation', 
                propertyName: validationResult.propertyName });
        }

        const result = await vacationsManager.createVacationRequest(vacationRequest);
        res.status(201).send(result);
    } catch(e) {
        res.status(500).send();
    }
}
