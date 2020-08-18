const vacationsTypesManager = require('../managers/vacations-types.manager');

exports.getAllVacationsTypes = async (req, res) => {

    const lang = req.query.lang || 'A';
    const workSystem = req.query.workSystem;

    try{
        
        let results = await vacationsTypesManager.getAllVacationsTypes(workSystem, lang);
        return res.json(results);
    } catch(e) {
        e.httpStatusCode = 500;
        return next(e);
    }
}