// Bringing in librarys
import express from 'express';
import expressLayouts from 'express-ejs-layouts';

// Bringing in models, modules, and routes
import { departments, programs } from './database/sequelize.js'; // models from DB for read/write
import { FetchHtml, Program } from './scraper.js';
import Database from './database/database.js';
import indexRoute from './routes/index.js';
import departmentRoute from './routes/departments.js';
import programRoute from './routes/programs.js';
import formRoute from './routes/form.js';

// bind express class to 'server' and define port (process.env.PORT is for non-local deployment)
const server = express();
const PORT = process.env.PORT || 3000;

// ejs middleware and setup
server.use(expressLayouts);
server.set("view engine", "ejs");
server.use(express.static('public'));

// Route handlers in middleware, every time there is a request it will pick the right route based on req
// follow import trail and you can see what they do when they get hit
// if not a handled route then 404 
server.use(indexRoute);
server.use(departmentRoute);
server.use(programRoute);
server.use(formRoute);

// start nodejs server, It will listen for requests on PORT.
server.listen(PORT, async () => {
    console.log(`Listening on Port: ${PORT}`);

    // to run the scraper or not to run the scraper...
    try {
      const progDB = await programs.findAndCountAll();
      const deptDB = await departments.findAndCountAll();
    } catch(error) {
        // side effects like crazy because this is a web scraper...
        // awaits are simply stating 'we need this request to come back before proceding'
        
        // Get html from year to scrape
        const butteAllProgramsUrl = "https://programs.butte.edu/ProgramList/All/12/false"
        let butteAllProgramsHtml = await FetchHtml(butteAllProgramsUrl);

        // Program class used to get infoMatrix of all data
        const butteProgram = new Program(butteAllProgramsHtml);
        const infoMatrix = await butteProgram.Scrape();

        // Database class to populate models in database
        const butteDatabase = new Database(infoMatrix);
        await butteDatabase.InsertData().then(() => {
          console.log('Database is full, Scrape Complete!')
        });
    }
});
