import express from 'express';
import { programs } from '../database/sequelize.js';
import { poutcomes } from '../database/sequelize.js';

const router = express.Router();

// All programs
router.get("/programs", async (req, res) => {
    const allPrograms =  await programs.findAll({order: ['prog_name'], raw: true});
    res.render("all_programs", { title: "SLO Tracker - All Programs", programs: allPrograms });
});

// Single program
router.get("/programs/:program_id", async (req, res) => {
    const theProgram = await programs.findOne({
        where: {
            prog_id: req.params.program_id
        },
        raw: true
    });
    const allOutcomes =  await poutcomes.findAll({order: ['pout_id'], raw: true});
    if (theProgram == null) {
        res.status(404).json('ERROR: No program found with that id')
    } else {
        console.log("Found: " + theProgram.prog_name)
        res.render("single_program", { 
            program: theProgram, 
            title: `SLO Tracker - ${theProgram.prog_name}`,
            poutcomes: allOutcomes
        });
    }
});

export default router;