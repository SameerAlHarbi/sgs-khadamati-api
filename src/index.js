//Packeges
const express = require('express');
const chalk = require('chalk');

//Middlewares
const { queryMiddleware } = require('@abujude/sgs-khadamati');
const authMiddleware = require('./middlewares/auth.middleware');

//Routers
const employeesRouter = require('./routers/employees.router');
const departmentsRouter = require('./routers/departments.router');
const vacationsRouter = require('./routers/vacations.router');

const errorsController = require('./controllers/errors.controller');

//Utilities
const sequelize = require('./util/database');
// require('./models/vacation-request.model');

//Express server
const app = express();

app.use(express.json());

//Empty middleware for future use.
app.use((req, res, next) => {

    //put something here
    next();

});

app.use(queryMiddleware.setLanguage('A', 'lang'));

// app.use(authMiddleware);

app.use('/employees', authMiddleware, employeesRouter);
app.use('/departments', authMiddleware, departmentsRouter);
app.use('/vacations', authMiddleware, vacationsRouter);

app.use('/500', errorsController.get500);
app.use(errorsController.get404);

//This middleware will be called directly whene ever we call next(Error)
app.use((error, req, res, next) => {
    error.httpStatusCode = error.httpStatusCode || 500;
    error.message = error.httpStatusCode !== 404 ? 
        error.message || '' : 'Data NotFound!';
    return res.status(error.httpStatusCode).json({ error : error.message });
});

const port = process.env.PORT || 7000;

app.listen(port, () => {
    switch(process.env.SAP_SERVER_TYPE)
    {
        case 'DEVELOPMENT':
            console.log(chalk.yellowBright
                .inverse(`SGS KHADAMATI API ${process.env.SAP_SERVER_TYPE} SERVER IS UP AND RUNNING ON PORT ${port}`));
            break;
        case 'QUALITY':
            console.log(chalk.cyan
                .inverse(`SGS KHADAMATI API ${process.env.SAP_SERVER_TYPE} SERVER IS UP AND RUNNING ON PORT ${port}`));
            break;
        default :
             console.log(chalk.greenBright
                .inverse(`SGS KHADAMATI API ${process.env.SAP_SERVER_TYPE} SERVER IS UP AND RUNNING ON PORT ${port}`));
    }
});

// sequelize
//     // .sync({force: true}).then(result => {
//     .sync().then(result => {
//         app.listen(port, () => {
//             switch(process.env.SAP_SERVER_TYPE)
//             {
//                 case 'DEVELOPMENT':
//                     console.log(chalk.yellowBright
//                         .inverse(`SGS KHADAMATI API ${process.env.SAP_SERVER_TYPE} SERVER IS UP AND RUNNING ON PORT ${port}`));
//                     break;
//                 case 'QUALITY':
//                     console.log(chalk.cyan
//                         .inverse(`SGS KHADAMATI API ${process.env.SAP_SERVER_TYPE} SERVER IS UP AND RUNNING ON PORT ${port}`));
//                     break;
//                 default :
//                      console.log(chalk.greenBright
//                         .inverse(`SGS KHADAMATI API ${process.env.SAP_SERVER_TYPE} SERVER IS UP AND RUNNING ON PORT ${port}`));
//             }
//         });
//     }).catch(error => {
//     console.log(chalk.red.inverse('Db Error!'));
//     console.error(error);
// });

