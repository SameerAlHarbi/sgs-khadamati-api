const vacationsManager = require('../managers/vacations.manager');

exports.getAllVacations = async (req, res) => {
   
    try {

        const results = await vacationsManager.getAllVacations();
        res.send(results);
    } catch (e) {
        res.status(500).send();
    }
}

exports.getAllVacationsRequests = async (req, res) => {

    try {

        const results = await vacationsManager.getAllVacationsRequests();
        res.send(results);
    } catch (e) {
        res.status(500).send();
    }
}