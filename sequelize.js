import Sequelize from 'sequelize';
import { departmentModel } from './models/departments.js';
import { programModel } from './models/programs.js';

// Removed enviroment variables from docker file, everything is here just minus Docker.
const sequelize = new Sequelize({
    host: {image: 'mysql:5.7', 
    volumes: 'db_data:/var/lib/mysql', 
    environment: { 
        MYSQL_ROOT_PASSWORD: 'somestrongpass',
        MYSQL_DATABASE: 'csci36',
        MYSQL_USER: 'csci36',
        MYSQL_PASSWORD: 'csci36'
      }
    },
    database: 'home',
    username: 'root',
    password: 'superDUPER@m3',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
});

//TODO: what is this code block doing?
const departments = departmentModel(sequelize, Sequelize);
const programs = programModel(sequelize, Sequelize);
sequelize.sync({alter: true})
.then(() => {
    console.log('Database & Tables Created Successfully!');
});
//

export { departments, programs };