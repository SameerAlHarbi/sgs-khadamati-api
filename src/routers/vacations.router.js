const express = require('express');
const { queryMiddleware } = require('@abujude/sgs-khadamati');
const vacationsController = require('../controllers/vacations.controller');
const vacationsTypesController = require('../controllers/vacations-types.controller');
const vacationsBalancesController = require('../controllers/vacations-balances.controller');

const router = express.Router();

router.get('/', vacationsController.getAllVacations);
router.get('/requests', vacationsController.getAllRequests);
router.post('/requests', vacationsController.createNewVacationRequest);
router.get('/types', vacationsTypesController.getAllVacationsTypes);
router.get('/balances', queryMiddleware.parseQuery, vacationsBalancesController.getAllVacationsBalances);
router.get('/balances/summary', vacationsBalancesController.getAllVacationsBalancesSummaries);

module.exports = router;