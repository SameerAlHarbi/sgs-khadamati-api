//Packeges
const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');

//Middlewares
const authMiddleware = require('./middleware/auth.middleware');

//Routers
const employeesRouter = require('./routers/employees.router');
const departmentsRouter = require('./routers/departments.router');
const vacationsRouter = require('./routers/vacations.router');
const errorController = require('./controllers/error.controller');

//Utilities
const sequelize = require('./util/database');
require('./models/vacation-request.model');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/employees', authMiddleware, employeesRouter);
app.use('/departments', authMiddleware, departmentsRouter);
app.use('/vacations', authMiddleware, vacationsRouter);

app.use('/500', errorController.get500);
app.use(errorController.get404);

//This middleware will be called directly whene ever we call next(Error)
app.use((error, req, res, next) => {
    error.message = error.httpStatusCode !== 404 ? 
        error.message : 'Data NotFound!';
    return res.status(error.httpStatusCode).json({ error : error.message });
});

sequelize
    // .sync({force: true}).then(result => {
    .sync().then(result => {
        app.listen(port, () => {
        console.log(chalk.green.inverse(`SGS KHADAMATI API SERVER IS UP AND RUNNING ON PORT ${port}`));
        });
    }).catch(err => {
    console.error(err);
});

