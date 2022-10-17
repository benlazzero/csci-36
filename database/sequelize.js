import Sequelize from 'sequelize';

// Tables used for filling out website tables
import { departmentModel } from '../models/departments.js';
import { programModel } from '../models/programs.js';

// Table used for storing form information
import { assessmentModel } from '../models/assessments.js';
import { courseModel } from '../models/courses.js';
import { coutcomeModel } from '../models/coutcomes.js';
import { poutcomeModel } from '../models/poutcomes.js';

// Our join tables
// import { ploAssessmentsModel } from '../models/plo_assessments.js';
// import { proCourseModel } from '../models/programs_courses.js';

// Our function that creates our FKs
import { buildAssociations } from '../models/associates.js';

// Setting up the database connection, ripped from Sequelize docs
const sequelize = new Sequelize({
    host: {image: 'mysql:5.7', 
    volumes: 'db_data:/var/lib/mysql', 
    environment: { 
        MYSQL_ROOT_PASSWORD: 'superDUPER@m3',
        MYSQL_DATABASE: 'csci36',
        MYSQL_USER: 'csci36',
        MYSQL_PASSWORD: 'csci36'
      }
    },
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
    logging: false
});

// Makes the tables that will store data from the scrapers
const departments = departmentModel(sequelize, Sequelize);
const programs = programModel(sequelize, Sequelize);
const courses = courseModel(sequelize, Sequelize);

const assessments = assessmentModel(sequelize, Sequelize);

const coutcomes = coutcomeModel(sequelize, Sequelize);
const poutcomes = poutcomeModel(sequelize, Sequelize);
// const ploassessments = ploAssessmentsModel(sequelize, Sequelize);
// const procourses = ploAssessmentsModel(sequelize, Sequelize);

buildAssociations(sequelize);

sequelize.sync({alter: true})
.then(() => {
    console.log('Database & Tables Created Successfully!');
});

// exports the models for read/write from other modules. 
export { departments, programs };