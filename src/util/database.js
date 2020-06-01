const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD,
    { dialect: 'mssql', host: process.env.DB_SERVER, dialectOptions: {
        options: { trustServerCertificate: true}
    }});

module.exports = sequelize;

