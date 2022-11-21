// This route feeds learning_outcomes.ejs the requisite data

// IMPORTS AND FUNCTION DEFINITIONS --------------------------------------------

import express from 'express';

// CLO data
import clos from '../clos.json' assert { type: "json" }; // KEEP ASSERT
import updates from '../lastUpdated.js';

// PLO data
import { poutcomes } from '../database/sequelize.js';
import { programs } from '../database/sequelize.js';

const router = express.Router();

// Function for creating outcome objects
function createOutcome (out_id, out_desc, dom_id, dom_name, last_update) {
    
    // Next update should be six years after the most recent update
    let next_update = new Date(last_update);
    next_update.setFullYear(next_update.getFullYear() + 6);
    
    const outcome = {
        outcome_id: out_id,
        outcome_description: out_desc,
        domain_id: dom_id,
        domain_name: dom_name,
        last_updated: last_update,
        next_update: next_update
    };
    
    return outcome;
}
/*
// FORMATTING PLOS -------------------------------------------------------------

// Create PLO arrays
const highPriorityPLOs = [];
const medPriorityPLOs = [];
const lowPriorityPLOs = [];

// Create an object for each PLO and add it to an array
for (let po of poutcomes) {
    
    // Add PLO signifier to the PLO id
    let idPrefix = "PLO-";
    let po_id = idPrefix.concat(po.pout_id);
    
    // Find the name of the program associated with the PLO
    let program_name = "";
    
    for (let prog of programs) {
      if (po.prog_id == prog.prog_id) {
          program_name = prog.prog_name;
          break;
      }  
    }
    
    // As far as I'm aware, we don't currently have any way of knowing when a
    // PLO was last updated. For now, I'm using the "updatedAt" field from the
    // "poutcomes" table. This should be easy to change if the correct dates are
    // discovered and added to the database.
    let last_update = po.updatedAt;
    
    // Create object for PLO
    let newPLO = createOutcome(po_id, po.pout_desc, po.prog_id, 
                                   program_name, last_update);
    
    // Add PLO to the appropriate array
    
    let highPriorityDate = new Date();
    highPriorityDate.setFullYear(highPriorityDate.getFullYear() - 6);
    
    let medPriorityDate = new Date();
    medPriorityDate.setFullYear(medPriorityDate.getFullYear() - 5);
    
    // PLOs that have not been updated for 6+ years are high priority
    if (last_update <= highPriorityDate) {
        highPriorityPLOs.push(newPLO);
        
    // PLOs that were updated 5-6 years ago are medium priority
    } else if (last_update <= medPriorityDate) {
        medPriorityPLOs.push(newPLO);
        
    // PLOs that were updated less than 5 years ago are low priority
    } else {
        lowPriorityPLOs.push(newPLO);
    }
}

// Sort the PLO arrays by update (oldest to newest)
highPriorityPLOs.sort(function (a,b){return a.last_updated - b.last_updated;});
medPriorityPLOs.sort(function (a,b){return a.last_updated - b.last_updated;});
lowPriorityPLOs.sort(function (a,b){return a.last_updated - b.last_updated;});

// FORMATTING CLOS -------------------------------------------------------------

// Create CLO arrays
const highPriorityCLOs = [];
const medPriorityCLOs = [];
const lowPriorityCLOs = [];

// Each line of clos.json contains two fields: a course id followed by a string
// of learning outcomes separated by newlines. Each line of lastUpdated.js also
// contains two fields: a course id followed by a date (the most recent update
// for the webpage that describes the course). Course ids should correspond
// line-by-line between the two files; for example, line 212 currently displays 
// data for CSCI 42 in both clos.json and lastUpdated.js.

let numberOfCourses = clos.length;
let i = 0;

while (i < numberOfCourses) {
    
    // Separate individual CLOs 
    const cloArray = clos[1].split("\n");
    
    // Set aside shared CLO variables for efficiency
    let idPrefix = "CLO-";
    let course_id = clos[0];
    let last_update = updates[i][1];
    
    // Create an object for each CLO associated with the current course
    for (let clo of cloArray) {
        
        // Create an id for the CLO
        let idSuffix = cloArray.indexOf(clo);
        let clo_id = idPrefix.concat(course_id.replace(" ", ""), "-", idSuffix);
        
        // For now, course id's are also used as the course name
        let newCLO = createOutcome(clo_id, clo, course_id, course_id, 
                                   last_update);
        
        // Add CLO to the appropriate array
        
        let highPriorityDate = new Date();
        highPriorityDate.setFullYear(highPriorityDate.getFullYear() - 6);
        
        let medPriorityDate = new Date();
        medPriorityDate.setFullYear(medPriorityDate.getFullYear() - 5);
        
        // CLOs that have not been updated for 6+ years are high priority
        if (last_update <= highPriorityDate) {
            highPriorityCLOs.push(newCLO);
            
        // CLOs that were updated 5-6 years ago are medium priority
        } else if (last_update <= medPriorityDate) {
            medPriorityCLOs.push(newCLO);
            
        // CLOs that were updated less than 5 years ago are low priority
        } else {
            lowPriorityCLOs.push(newCLO);
        }
    }
    
    // Move on to the next course
    i += 1;
}

// Sort the CLO arrays by update (oldest to newest)
highPriorityCLOs.sort(function (a,b){return a.last_updated - b.last_updated;});
medPriorityCLOs.sort(function (a,b){return a.last_updated - b.last_updated;});
lowPriorityCLOs.sort(function (a,b){return a.last_updated - b.last_updated;});

// RENDERING -------------------------------------------------------------------

// Render the page
router.get("/learning_outcomes", (req, res) => {
    res.render("learning_outcomes", { 
        title: "Timeline",
        PLOs_1: highPriorityPLOs,
        PLOs_2: medPriorityPLOs,
        PLOs_3: lowPriorityPLOs,
        CLOs_1: highPriorityCLOs,
        CLOs_2: medPriorityCLOs,
        CLOs_3: lowPriorityCLOs
    });
});
*/


let test = {
    outcome_id: "test_outcome_id",
    outcome_description: "test_outcome_description",
    domain_id: "test_domain_id",
    domain_name: "test_domain_name",
    last_updated: new Date(),
    next_update: new Date()
};

let testArray = [test, test, test];

// Render the page
router.get("/learning_outcomes", (req, res) => {
    res.render("learning_outcomes", { 
        title: "Timeline",
        PLOs_1: testArray,
        PLOs_2: testArray,
        PLOs_3: testArray,
        CLOs_1: testArray,
        CLOs_2: testArray,
        CLOs_3: testArray
    });
});



export default router;
