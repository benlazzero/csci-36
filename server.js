import scrapeProgramList from './butte_scraper/index.js';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
// import ejs from 'ejs'; Not used?

import { departments, programs} from './sequelize.js';

// const router = express.Router(); Not used?
const app = express();
const port = process.env.PORT || 5000;

app.use(expressLayouts);
app.set("view engine", "ejs");

import dotenv from 'dotenv'
dotenv.config();

// require("dotenv").config();

scrapeProgramList(); // Run scraper

// Home Route
app.get("/", (req, res) => {
    res.render("index", { title: "SLO Tracker - Home" });
});

// All departments
app.get("/departments", async (req, res) => {
    const departments =  await departments.findAll({order: ['dept_name'],raw: true});
    res.render("all_departments", { title: "SLO Tracker - All Departments", departments: departments });
});

// Single department
app.get("/departments/:dept_id", async (req, res) => {
    const department = await departments.findOne({
        where: {
            dept_id: req.params.dept_id
        },
        raw: true
    });
    if (department == null) {
        res.status(404).json('ERROR: No department found with that id')
    } else {
        console.log("Found: " + department.dept_name)
        res.render("single_department", {
            department: department,
            title: `SLO Tracker - ${department.dept_name}`,
        });
    }
});

// All programs
app.get("/programs", async (req, res) => {
    const programs =  await programs.findAll({raw: true});
    res.render("all_programs", { title: "SLO Tracker - All Programs", programs: programs });
});

// Single program
app.get("/programs/:program_id", async (req, res) => {
    const program = await programs.findOne({
        where: {
            prog_id: req.params.program_id
        },
        raw: true
    });
    if (program == null) {
        res.status(404).json('ERROR: No program found with that id')
    } else {
        console.log("Found: " + program.prog_name)
        res.render("single_program", {
            program: program,
            title: `SLO Tracker - ${program.prog_name}`,
        });
    }
});

// Discussion Form
app.get("/dis-form", async (req, res) => {
    const programs =  await programs.findAll({raw: true});
    res.render("dis-form", { title: "SLO Tracker - Form"});
});

app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});
