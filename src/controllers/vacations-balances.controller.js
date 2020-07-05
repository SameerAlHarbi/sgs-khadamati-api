const vacationsBalancesManager = require('../managers/vacations-balances.manager');
const dateUtil = require('../util/date');

exports.getAllVacationsBalances = async (req, res) => {

    const lang = req.query.lang;
    const employeesIds = req.query.employeesIds;
    const fromDateText = req.query.fromDate;
    const toDateText = req.query.toDate;
    const dateFormatText = req.query.dateFormat || dateUtil.defaultApiDateFormatText;
    const vacationsTypesIds = req.query.vacationsTypesIds;

    const fromDateObject = dateUtil.parseDate(fromDateText, dateFormatText);
    const toDateObject = dateUtil.parseDate(toDateText, dateFormatText);

    const employeesIdsCollection = employeesIds ? employeesIds.split(',') : [];
    const vacationsTypesIdsCollection = vacationsTypesIds ? vacationsTypesIds.split(',') : [];

    try {
        let results = await vacationsBalancesManager
            .getAllVacationsBalances(employeesIdsCollection,
                     fromDateObject,
                     toDateObject, 
                     vacationsTypesIdsCollection, 
                     lang);

        res.send(results);
    } catch (e) {
        res.status(500).send();
    }

}

exports.getAllVacationsBalancesSummaries = async (req, res) => {

    const lang = req.query.lang;
    const employeesIds = req.query.employeesIds;
    const balanceDateText = req.query.balanceDate;
    const dateFormatText = req.query.dateFormat || dateUtil.defaultApiDateFormatText;
    const vacationsTypesIds = req.query.vacationsTypesIds;

    const balanceDateObject = dateUtil.parseDate(balanceDateText, dateFormatText);

    const employeesIdsCollection = employeesIds ? employeesIds.split(',') : [];
    const vacationsTypesIdsCollection = vacationsTypesIds ? vacationsTypesIds.split(',') : [];

    try {
        let results = await vacationsBalancesManager
            .getAllVacationsBalancesSummaries(employeesIdsCollection,
                 balanceDateObject,
                 vacationsTypesIdsCollection,
                 lang);
                 
        res.send(results);
    } catch (e) {
        res.status(500).send();
    }

}
