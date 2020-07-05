const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const sequelize = require('./util/database');
const auth = require('./middleware/auth.middleware');
const employeesRouter = require('./routers/employees.router');
const vacationsRouter = require('./routers/vacations.router');

require('./models/vacation-request.model');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/employees', auth, employeesRouter);
app.use('/vacations', auth, vacationsRouter);

sequelize
    // .sync({force: true}).then(result => {
    .sync().then(result => {
        app.listen(port, () => {
        console.log(chalk.green.inverse(`SGS KHADAMATI API SERVER IS UP AND RUNNING ON PORT ${port}`));
        });
    }).catch(err => {
    console.log(err);
    });

