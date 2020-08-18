const express = require('express');
const { queryMiddleware }= require('@abujude/sgs-khadamati');
const employeesController = require('../controllers/employees.controller');

const Router = express.Router();

Router.get('/', 
    queryMiddleware.parseQuery,
    employeesController.getAllEmployees);

Router.get('/:id', 
    queryMiddleware.validateNumberId,
    employeesController.getEmployeeById);

Router.get('/:id/salary', 
    queryMiddleware.validateNumberId,
    queryMiddleware.parseQuery,
    employeesController.getEmployeeSalary);

Router.get('/:id/manager', 
    queryMiddleware.validateNumberId,
    queryMiddleware.parseQuery,
    employeesController.getEmployeeManager);

module.exports = Router;
