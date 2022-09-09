const Sequelize = require('sequelize')

const departmentModel = require('./models/departments');
const programModel = require('./models/programs');
const sequelize = new Sequelize({
    host: process.env.DBHOST,
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false,
    logging: false
});

const departments = departmentModel(sequelize, Sequelize);
const programs = programModel(sequelize, Sequelize);
sequelize.sync({alter: true})
.then(() => {
    console.log('Database & Tables Created Successfully!');
});

module.exports = {
    departments,
    programs,
};
