const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const vacationsRouter = require('./routers/vacations.router');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/vacations', vacationsRouter);

app.listen(port, () => {
    console.log(chalk.green.inverse(`SGS KHADAMATI API SERVER IS UP AND RUNNING ON PORT ${port}`));
});



