import express from 'express';
import { programs } from '../database/sequelize.js';

const router = express.Router();

// get each program name without duplicates for the form page
router.get("/dis-form", async (req, res) => {
  const currentDate = new Date().toJSON().slice(0, 10);
  const allPrograms =  await programs.findAll({order: ['prog_name'], attributes: ['prog_name']})
  const allProgNames = allPrograms.map((key) => (key.dataValues.prog_name))
  const uniqueProgNames = [...new Set(allProgNames)]
  res.render("dis-form", { title: "SLO Tracker - Form", programs: uniqueProgNames, date: currentDate });
});

export default router;