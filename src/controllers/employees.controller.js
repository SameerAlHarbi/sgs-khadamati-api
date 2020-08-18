const employeesManager = require('../managers/employees.manager');

exports.getAllEmployees = async (req, res, next) => {

    const ids = req.query.ids;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const status = req.query.status;
    const lang = req.query.lang;

    try {

        const results = await employeesManager
            .getAllEmployees(
                ids,
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
    
    const id = req.params.id;
    const lang = req.query.lang;

    try {

        const result = await employeesManager
            .getEmployeeById(id, lang);

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

    const id = req.params.id;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;

    try {

        const result = await employeesManager.getEmployeeSalary(
            id, 
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

    const id = req.params.id;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const lang = req.query.lang;

    try {

        const result = await employeesManager.getEmployeeManager(
            id, 
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
