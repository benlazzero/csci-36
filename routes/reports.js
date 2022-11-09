import express from 'express';
import { assessments } from '../database/sequelize.js';

const router = express.Router();

router.get("/reports", async (req, res) => {
  const allAssessments =  await assessments.findAll({order: ['discussion_id'],raw: true});
    res.render("reports", { title: "SLO Tracker - Reports",
     assessments:allAssessments });
});

export default router;