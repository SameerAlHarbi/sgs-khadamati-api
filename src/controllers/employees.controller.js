const employeesManager = require('../managers/employees.manager');

exports.getAllEmployees = async (req, res, next) => {

    const employeesIds = req.query.employeesIds;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const status = req.query.status;
    const lang = req.query.lang || 'A';

    try {

        const results = await employeesManager
            .getAllEmployees(
                employeesIds,
                fromDate,
                toDate,
                status, 
                lang);

        res.json(results);
        
    } catch(e) {
        e.httpStatusCode = 500;
        return next(e);
    }
}

exports.getEmployeeById = async (req, res, next) => {
    
    const employeeId = req.params.id;
    const lang = req.query.lang || 'A';

    try {

        const result = await employeesManager
            .getEmployeeById(employeeId, lang);

        if(!result) {
            const error = new Error();
            error.httpStatusCode = 404;
            return next(error);
        }
        
        res.json(result);

    } catch(e) {
        e.httpStatusCode = 500;
        return next(e);
    }
}

exports.getEmployeeSalary = async (req, res, next) => {

    const employeeId = req.params.id;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;

    try {

        const result = await employeesManager.getEmployeeSalary(
            employeeId, 
            fromDate, 
            toDate);

        if(!result) {
            const error = new Error();
            error.httpStatusCode = 404;
            return next(error);
        }

        res.json(result);

    } catch(e) {
        e.httpStatusCode = 500;
        return next(e);
    }
}

exports.getEmployeeManager = async (req, res, next) => {

    const employeeId = req.params.id;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const lang = req.query.lang || 'A';

    try {

        const result = await employeesManager.getEmployeeManager(
            employeeId, 
            fromDate, 
            toDate, 
            lang);

        if(!result) {
            const error = new Error();
            error.httpStatusCode = 404;
            return next(error);
        }

        res.json(result);

    } catch (e) {
        e.httpStatusCode = 500;
        return next(e);
    }
}
