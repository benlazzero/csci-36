import scrapeProgramList from './butte_scraper/index.js';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import { departments, programs} from './sequelize.js';

const app = express();
const port = process.env.PORT || 3000; // switched to port 3000 because 5000 is always inuse on macOS.

app.use(expressLayouts);
app.set("view engine", "ejs");

import dotenv from 'dotenv'
dotenv.config();

// WARNING: scraper does not handle data gathering gracefully... temporary hack below.
// 
// uncomment if database is empty(first run)
// comment out after database is populated(after first run)
//
// await scrapeProgramList();
//

// Home Route
app.get("/", (req, res) => {
    res.render("index", { title: "SLO Tracker - Home" });
});

// All departments
app.get("/departments", async (req, res) => {
    const allDepartments =  await departments.findAll({order: ['dept_name'],raw: true});
    res.render("all_departments", { title: "SLO Tracker - All Departments", departments: allDepartments });
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
    const allPrograms =  await programs.findAll({raw: true});
    res.render("all_programs", { title: "SLO Tracker - All Programs", programs: allPrograms });
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
    res.render("dis-form", { title: "SLO Tracker - Form"});
});

app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});
