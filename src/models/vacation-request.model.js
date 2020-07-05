const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const date = require('../util/date');

const VacationRequest = sequelize.define('vacationRequest', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        requestDate: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
            get: function() {
                return date.formatDate(this.getDataValue('requestDate'));
            }
        },
        employeeId: {
            type: Sequelize.INTEGER,
            allowNullL: false,
            validate: {
                min: { args: [1], msg: 'Invalid employee id!'}
            }
        },
        vacationTypeId: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                // not: ["a-z", 'i'],
                // isNumeric: true,
                notEmpty: true,
                isInt: true
            }
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: false,
            get: function() {
                return date.formatDate(this.getDataValue('startDate'));
            },
            set: function(val) {
                if(val instanceof Date && !isNaN(val)) {
                    this.setDataValue('startDate', new Date(val.toDateString()));
                }
                else {
                    this.setDataValue('startDate', val);
                }
            },
            validate: {
                isValidDateObject: function(value) {
                    if(!(value instanceof Date && !isNaN(value))) {
                        throw new Error('Invalid start date object!')
                    }
                }
            }
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: false,
            get: function() {
                return date.formatDate(this.getDataValue('endDate'));
            },
            set: function(val) {
                if(val instanceof Date && !isNaN(val)) {
                    this.setDataValue('endDate', new Date(val.toDateString()));
                }
                else {
                    this.setDataValue('endDate', val);
                }
            },
            validate: {
                isValidDateObject: function(val) {
                    if(!(val instanceof Date && !isNaN(val))) {
                        throw new Error('Invalid end date object!');
                    }
                    else if(this.endDate < this.startDate) {
                        throw new Error('End date must be after start date!');
                    }
                },
            }
        },
        commissionerEmployeeId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate: {
                min: { args: [1], msg: 'Commissioner employee id must be equal or greater than 1!'},
                isRequired: function(value) {
                    if(!value && this.getDataValue('requestDate') < date.addDays(this.getDataValue('endDate'),1)) {
                        throw new Error('Required commissioner employee id');
                    }
                }
            }
        },
        requestedByEmployeeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                min: { args: [1], msg: 'Invalid requestd by employee id!'}
            }
        },
        managerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                min: { args: [1], msg: 'Invalid invalid manager id!'}
            }
        },
        originalManagerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                min: { args: [1], msg: 'Invalid original manager id!'}
            }
        },
        status: {
            type: Sequelize.ENUM('Pending' ,
                'New', 
                'Processing', 
                'Accepted', 
                'Rejected', 
                'Expired', 
                'Canceled'),
            allowNull: false,
            defaultValue: 'Pending'
        },
        note: {
            type: Sequelize.STRING,
            allowNull: true
        }
    }, {
    getterMethods : {
        // duration: function () { 
        //     return date.calcDaysDuration(this.startDate, this.endDate); 
        // },
        // expireDate: function () { 
        //     return getDataValue('status') === 'Pending' || 
        //         getDataValue('status') === 'New' ||
        //         getDataValue('status') === 'Expired' ? 
        //         date.addDays(getDataValue('requestDate'), 10) : undefined; 
        // }
    },
    setterMethods : {

    },
    timestamps: true,
    createdAt: false,
    // validate: {
    //     validEndDate: function () {
    //         if(this.endDate < this.startDate) {
    //             throw new Error('Invalid end date!');
    //         }
    //     }
    // }
});

module.exports = VacationRequest;