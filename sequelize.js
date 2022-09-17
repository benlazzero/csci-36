import Sequelize from 'sequelize';

import { departmentModel } from './models/departments.js';
import { programModel } from './models/programs.js';
const sequelize = new Sequelize({
    host: process.env.DBHOST,
    database: 'home',
    username: 'csci36',
    password: 'superDUPER@m3',
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

export { departments, programs };
