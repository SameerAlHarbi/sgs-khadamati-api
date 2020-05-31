const express = require('express');
const vacationsController = require('../controllers/vacations.controller');

const router = express.Router();

router.get('/', vacationsController.getAllVacations);
router.get('/requests', vacationsController.getAllVacationsRequests);

module.exports = router;