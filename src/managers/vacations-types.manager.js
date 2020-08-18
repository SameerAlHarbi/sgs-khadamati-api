const erpClient = require('../util/erp-client');

exports.getAllVacationsTypes = async (workSystem = 'ALL',lang = 'A') => {

    lang = lang.toUpperCase();
    workSystem = workSystem.toUpperCase();

    try{

        const responseData = await erpClient.getData('vacations/types', {workSystem, lang});
        return responseData;
    } catch (e) {
        throw e;
    }
};