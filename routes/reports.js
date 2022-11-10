import express from 'express';
import { poutcomes } from '../database/sequelize.js';
import { assessments } from '../database/sequelize.js';

const router = express.Router();

router.get("/reports", async (req, res) => {
  const allAssessments =  await assessments.findAll({order: ['discussion_id'],raw: true});
    res.render("reports", { title: "SLO Tracker - Reports",
     assessments:allAssessments });
});
//single_report
router.get("/reports/:discussion_id", async (req, res) => {
    const theAssessment = await assessments.findOne({
        where: {
            disscussion_id: req.params.discussion_id
        },
        raw: true
    });
    const allOutcomes =  await poutcomes.findAll({order: ['pout_id'], raw: true});
    if (theAssessment == null) {
        res.status(404).json('ERROR: No program found with that id')
    } else {
        console.log("Found: " + theAssessment.discussion_id)
        res.render("single_report", { 
            assessment: theAssessment, 
            title: `Report - ${theAssessment.assessed_program}`,
            poutcomes: allOutcomes
        });
    }
});



export default router;