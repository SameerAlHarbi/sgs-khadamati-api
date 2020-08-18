const vacationsBalancesManager = require('../managers/vacations-balances.manager');

exports.getAllVacationsBalances = async (req, res) => {

    const ids = req.query.ids;
    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const vacationsTypes = req.query.Types;
    const lang = req.query.lang;

    try {

        let results = await vacationsBalancesManager
            .getAllVacationsBalances(ids,
                     fromDate,
                     toDate, 
                     vacationsTypes, 
                     lang);

        res.json(results);
        
    } catch (e) {
        e.httpStatusCode = 500;
        return next(e);
    }

}

exports.getAllVacationsBalancesSummaries = async (req, res) => {

    const ids = req.query.ids;
    const fromDate = req.query.fromDate;
    const vacationsTypes = req.query.Types;
    const lang = req.query.lang;

    try {

        let results = await vacationsBalancesManager
            .getAllVacationsBalancesSummaries(ids,
                 fromDate,
                 vacationsTypes,
                 lang);
                 
        res.json(results);

    } catch (e) {
        e.httpStatusCode = 500;
        return next(e);
    }

}
