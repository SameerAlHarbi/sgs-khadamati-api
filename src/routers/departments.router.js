const express = require('express');
const { queryMiddleware }= require('@abujude/sgs-khadamati');
const departmentsController = require('../controllers/departments.controller');

const Router = express.Router();

Router.get('/',
    queryMiddleware.parseQuery,
    departmentsController.getAllDepartments);

Router.get('/:id',
    queryMiddleware.parseQuery,
    departmentsController.getDepartmentById);

Router.get('/:id/childs',
    queryMiddleware.parseQuery,
    departmentsController.getChildDepartments);

module.exports = Router;