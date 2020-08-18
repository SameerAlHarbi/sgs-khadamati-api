const dateUtil = require('../util/date');

exports.queryParser = (req, res, next) => {

    req.query.lang = req.query.lang || 'A';

    req.query.employeesIds = req.query.employeesIds ? 
        req.query.employeesIds.split(',') : [];

    req.query.dateFormat = req.query.dateFormat ||
        dateUtil.defaultTextDateFormat;

    req.query.fromDate = dateUtil.parseDate(req.query.fromDate, 
        req.query.dateFormat);

    req.query.toDate = dateUtil.parseDate(req.query.toDate, 
        req.query.dateFormat);

    req.query.registerFromDate = dateUtil.parseDate(req.query.registerFromDate, 
        req.query.dateFormat);

    req.query.registerToDate = dateUtil.parseDate(req.query.registerToDate, 
        req.query.dateFormat);

    req.query.vacationsTypesIds = req.query.vacationsTypesIds ? 
        req.query.vacationsTypesIds.split(',') : [];

    req.query.balanceDate = dateUtil.parseDate(req.query.balanceDate, 
        req.query.dateFormat);

    next();
}

exports.validateId = (req, res, next) => {

    if(isNaN(req.params.id)) {

        const error = new Error('Invalid id!');
        error.httpStatusCode = 400;
        return next(error);
    }

    next();
}

exports.validateNumberParam = (paramName) => {
    return function(req, res, next) {
        if(isNaN(req.params[paramName]))
        {
            const error = new Error(`Invalid ${paramName}!`);
            error.httpStatusCode = 400;
            return next(error);
        }
        next();
    }
}
