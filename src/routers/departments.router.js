const express = require('express');
const departmentsController = require('../controllers/departments.controller');
const queryUtil = require('../middleware/query-util.middleware');

const Router = express.Router();

Router.get('/', 
    queryUtil.queryParser, 
    departmentsController.getAllDepartments);

Router.get('/:id',
    queryUtil.queryParser,
    departmentsController.getDepartmentById);

Router.get('/:id/childs',
    queryUtil.queryParser,
    departmentsController.getChildDepartments);

module.exports = Router;