const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const sequelize = require('./util/database');
const auth = require('./middleware/auth.middleware');
const employeesRouter = require('./routers/employees.router');
const vacationsRouter = require('./routers/vacations.router');
const errorController = require('./controllers/error.controller');

require('./models/vacation-request.model');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/employees', auth, employeesRouter);
app.use('/vacations', auth, vacationsRouter);

app.use(errorController.get404);

//This middleware will be called directly whene ever we call next(Error)
app.use((error, req, res, next) => {

});

sequelize
    // .sync({force: true}).then(result => {
    .sync().then(result => {
        app.listen(port, () => {
        console.log(chalk.green.inverse(`SGS KHADAMATI API SERVER IS UP AND RUNNING ON PORT ${port}`));
        });
    }).catch(err => {
    console.log(err);
    });

