const Sequelize = require('sequelize');
const sequelize = require('../src/util/database');
const chalk = require('chalk');
const date = require('../src/util/date');

console.log(chalk.blue.inverse('Start Testing'));

testConnection = async () => {
    
    try {
         await sequelize.authenticate();
         console.log('Connection has been established successfully.');
    } catch (error) {
        console.error(chalk.red.inverse('Unable to connect to the database:', error));
    }
}

// (async function() {
//     await testConnection();
// })();

validateData = (data) => {
    console.log(isNaN(data.date));
}

validateData({ id: 0});