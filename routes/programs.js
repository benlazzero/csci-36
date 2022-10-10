import express from 'express';
import { programs } from '../sequelize.js';

const router = express.Router();

// All programs
router.get("/programs", async (req, res) => {
    const allPrograms =  await programs.findAll({order: ['prog_name'], raw: true});
    res.render("all_programs", { title: "SLO Tracker - All Programs", programs: allPrograms });
});

// Single program
router.get("/programs/:program_id", async (req, res) => {
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

export default router;