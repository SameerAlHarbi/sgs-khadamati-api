const express = require('express');
const employeesController = require('../controllers/employees.controller');
const queryUtil = require('../middleware/query-util.middleware');

const Router = express.Router();

Router.get('/', 
    queryUtil.queryParser,
    employeesController.getAllEmployees);

Router.get('/:id', 
    queryUtil.validateId, 
    employeesController.getEmployeeById);

Router.get('/:id/salary', 
    queryUtil.validateId, 
    queryUtil.queryParser, 
    employeesController.getEmployeeSalary);

Router.get('/:id/manager', 
    queryUtil.validateId, 
    queryUtil.queryParser, 
    employeesController.getEmployeeManager);

module.exports = Router;
