import express from 'express';
import fs from 'node:fs';
import { programs, courprog, assessments } from '../database/sequelize.js';

const router = express.Router();

// get each program name without duplicates for the form page
router.get("/dis-form", async (req, res) => {
  // get current date for assessment
  const currentDate = new Date().toJSON().slice(0, 10);
  // get all clos from clos.json file
  let rawClos = fs.readFileSync('clos.json');
  rawClos = JSON.parse(rawClos)
  rawClos = Object.keys(rawClos).map((key) => [String(key), rawClos[key]]);
  // parse and clean up
  for (let i = 0; i < rawClos.length; i++) {
    let index = i
    rawClos[i][0] = '+' + rawClos[i][0]
    for (let j = 0; j < rawClos[index].length; j++) {
      rawClos[index][j] = rawClos[index][j].replace(/\n/g, "")    
      rawClos[index][j] = rawClos[index][j].replace(/["']/g, "")    
    }
  }
  // get all programs,slos and degree type for dropdown
  const allPrograms =  await programs.findAll({order: ['prog_name'], attributes: ['prog_name', 'prog_type', 'prog_slos']})
  const allProgNames = allPrograms.map((key) => (key.dataValues.prog_name))
  const allProgTypes = allPrograms.map((key) => (key.dataValues.prog_type))
  // ugly post processing on slos
  let allProgSlos = allPrograms.map((key) => ([key.dataValues.prog_slos]))
  allProgSlos = allProgSlos.flat()
  for(let i = 0; i < allProgSlos.length; i++) {
    allProgSlos[i] = allProgSlos[i].replace(/\n/g, "")
    allProgSlos[i] = allProgSlos[i].replace(/["']/g, "")    
    allProgSlos[i] = allProgSlos[i] + '+'
  }
  // get all courses from join table
  let allCourses = await courprog.findAll({order: ['courprog_id'], attributes: ['programProgId', 'courseCourId']}) 
  let allCourProg = allCourses.map((key) => (key.dataValues.programProgId))
  allCourses = allCourses.map((key) => (key.dataValues.courseCourId))

  res.render("dis-form", { title: "SLO Tracker - Form", programs: allProgNames, 
    types: allProgTypes, date: currentDate, courses: allCourses, courkey: allCourProg, slos: allProgSlos, clos: rawClos });
});

// send the data to the database
router.post("/dis-form", async (req, res) => {
  let assessObject = JSON.stringify(await req.body)
  assessObject = await JSON.parse(assessObject)
  const selectedProg =  await programs.findOne({ where: {prog_id: (assessObject.program) }})
 
  await assessments.create({
    discussion_completed_by: assessObject.username,
    email: assessObject.email,
    date_assessed: assessObject.date,
    discussion_also_present: assessObject.contributers,
    assesed_course: assessObject.course,
    assessed_program: selectedProg.prog_name,
    assessed_plos: assessObject.programopt,
    assessed_clos: assessObject. courseopt,
    assesed_strats: assessObject.strategies,
    assesed_resources: assessObject.resources,
    notes: assessObject.notes,
  }).then(() => {
    res.writeHead(302, {
      'Location': '/dis-form'
    });
    res.end();
  }).catch((error) => {
    console.log(error) 
    res.writeHead(418, {
      'Location': '/dis-form'
    })
  })
 
})

export default router;