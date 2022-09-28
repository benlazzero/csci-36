import express from 'express';
import { departments } from '../sequelize.js';

const router = express.Router();

// All departments
router.get("/departments", async (req, res) => {
    const allDepartments =  await departments.findAll({order: ['dept_name'],raw: true});
    res.render("all_departments", { title: "SLO Tracker - All Departments", departments: allDepartments });
});

// Single department
router.get("/departments/:dept_id", async (req, res) => {
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

export default router;