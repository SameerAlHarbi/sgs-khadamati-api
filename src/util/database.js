const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('khadamati-db', 
    process.env.DB_USER, 
    process.env.DB_PASSWORD,
    { dialect: 'mssql', host: process.env.DB_SERVER, dialectOptions: {
        options: { trustServerCertificate: true}
    }});

module.exports = sequelize;

