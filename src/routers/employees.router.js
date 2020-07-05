const express = require('express');
const employeesController = require('../controllers/employees.controller');

const Router = express.Router();

Router.get('/', employeesController.getAllEmployees);
Router.get('/:employeeId', employeesController.getEmployeeById);
Router.get('/:employeeId/salary', employeesController.getEmployeeSalary);
Router.get('/:employeeId/manager', employeesController.getEmployeeManager);
// router.get('/:employeeId/vacations', employeesController.getEmployeeVacations);
Router.get('/:employeeId/vacations/balances', employeesController.getEmployeeVacationsBalances);
Router.get('/:employeeId/vacations/balances/summary', employeesController.getEmployeeVacationsBalancesSummaries);

module.exports = Router;