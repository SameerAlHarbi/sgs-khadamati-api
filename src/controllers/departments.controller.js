const departmentsManager = require('../managers/departments.manager');

exports.getAllDepartments = async (req, res, next) => {

    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const flatData = req.query.flat;
    const lang = req.query.lang || 'A';

    try {

        const results =  await departmentsManager.getAllDepartments(
            fromDate, 
            toDate, 
            flatData, 
            lang);

        return res.json(results);

    } catch(e) {
        e.httpStatusCode = 500;
        return next(e);
    }
}

exports.getDepartmentById = async (req, res, next) => {

    const departmentId = req.params.id;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const childDepth = isNaN(req.query.childDepth) ? -1 : +req.query.childDepth;
    const lang = req.query.lang || 'A';

    try {

        const result = await departmentsManager.getDepartmentById(
            departmentId,
            fromDate,
            toDate,
            childDepth,
            lang);

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

exports.getChildDepartments = async (req, res, next) => {
    
    const departmentId = req.params.id;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const childDepth = isNaN(req.query.childDepth)  ? -1 : +req.query.childDepth;
    const flatData = req.query.flat;

    const lang = req.query.lang || 'A';

    try {

        const results = await departmentsManager.getChildDepartments(
            departmentId, 
            fromDate, 
            toDate,
            childDepth, 
            flatData,
            lang);

        res.json(results);

    } catch(e) {
        e.httpStatusCode = 500;
        return next(e);
    }
}