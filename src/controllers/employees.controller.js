const employeesManager = require('../managers/employees.manager');
const dateUtil = require('../util/date');

exports.getAllEmployees = async (req, res) => {

    //extract query parametars data
    const lang = req.query.lang;
    const employeesIds = req.query.employeesIds;
    const fromDateText = req.query.fromDate;
    const toDateText = req.query.toDate;
    const dateFormatText = req.query.dateFormat || dateUtil.defaultCompiledDateFormat;
    const status = req.query.status;

    const fromDateObject = dateUtil.parseDate(fromDateText, dateFormatText);
    const toDateObject = dateUtil.parseDate(toDateText, dateFormatText);

    const employeesIdsCollection = employeesIds ? employeesIds.split(',') : [];

    try {

        const results = await employeesManager.getAllEmployees(employeesIdsCollection,
            fromDateObject,
            toDateObject,
            status, 
            lang);

        res.send(results);
        
    } catch(e) {
        res.status(500).send();
    }
}

exports.getEmployeeById = async (req, res) => {
    
    const employeeId = req.params.employeeId;
    const lang = req.query.lang;

    try {

        if(isNaN(employeeId))
        {
            return res.status(400).send({ error: 'Invalid Employee id!'});
        }

        const result = await employeesManager.getEmployeeById(employeeId, lang);

        if(!result) {
            return res.status(404).send();
        }
        
        res.send(result);
    } catch(e) {
        res.status(500).send({ error: 'Something went wrong please try again later!'});
    }
}

exports.getEmployeeSalary = async (req, res, next) => {

    const employeeId = req.params.employeeId;
    const fromDateText = req.query.fromDate;
    const toDateText = req.query.toDate;
    const dateFormatText = req.query.dateFormat || dateUtil.defaultApiDateFormatText;

    const fromDateObject = dateUtil.parseDate(fromDateText, dateFormatText);
    const toDateObject = dateUtil.parseDate(toDateText, dateFormatText);

    try {

        const result = await employeesManager.getEmployeeSalary(employeeId, fromDateObject, toDateObject,);

        if(!result) {
           return res.status(404).send();
        }

        res.send(result);
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
}

exports.getEmployeeManager = async (req, res, next) => {

    const employeeId = req.params.employeeId;
    const lang = req.query.lang;
    const fromDateText = req.query.fromDate;
    const toDateText = req.query.toDate;
    const dateFormatText = req.query.dateFormat || dateUtil.defaultApiDateFormatText;

    const fromDateObject = dateUtil.parseDate(fromDateText, dateFormatText);
    const toDateObject = dateUtil.parseDate(toDateText, dateFormatText);

    try {

        const result = await employeesManager.getEmployeeManager(employeeId, fromDateObject, toDateObject, lang);

        if(!result) {
           return res.status(404).send();
        }

        res.send(result);

    } catch (e) {
        res.status(500).send();
    }

}

exports.getEmployeeVacationsBalances = async (req, res) => {

    const employeeId = req.params.employeeId;
    const lang = req.query.lang;
    const fromDateText = req.query.fromDate;
    const toDateText = req.query.toDate;
    const dateFormatText = req.query.dateFormat || dateUtil.defaultApiDateFormatText;
    const vacationsTypesIds = req.query.vacationsTypesIds;

    const fromDateObject = dateUtil.parseDate(fromDateText, dateFormatText);
    const toDateObject = dateUtil.parseDate(toDateText, dateFormatText);

    const vacationsTypesIdsCollection = vacationsTypesIds ? vacationsTypesIds.split(',') : [];

    try{

        const results = await vacationsBalancesManager
            .getAllVacationsBalances([employeeId],
                 fromDateObject, 
                 toDateObject, 
                 vacationsTypesIdsCollection, lang);

        return res.send(results);

    } catch(e) {
        res.status(500).send();
    }
}

exports.getEmployeeVacationsBalancesSummaries = async (req, res) => {

    const employeeId = req.params.employeeId;
    const lang = req.query.lang;
    const balanceDateText = req.query.balanceDate;
    const dateFormatText = req.query.dateFormat || dateUtil.defaultApiDateFormatText;
    const vacationsTypesIds = req.query.vacationsTypesIds;

    const balanceDateObject = dateUtil.parseDate(balanceDateText, dateFormatText);

    const vacationsTypesIdsCollection = vacationsTypesIds ? vacationsTypesIds.split(',') : [];

    try {

        const results = await vacationsBalancesManager
            .getAllVacationsBalancesSummaries([employeeId], balanceDateObject, vacationsTypesIdsCollection, lang);

        res.send(results);
    } catch(e) {
        res.status(500).send();
    }
}
