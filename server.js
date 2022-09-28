// Bringing in librarys
import express from 'express';
import expressLayouts from 'express-ejs-layouts';

// Bringing in models, modules, and routes
import { departments, programs} from './sequelize.js';
import scrapeProgramList from './scraper.js';
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

// Route handlers in middleware, every time there is a request it will pick the right route based on req
// follow import trail and you can see what they do when they get hit
// if not a handled route then 404 
server.use(indexRoute);
server.use(departmentRoute);
server.use(programRoute);
server.use(formRoute);

// a hack/exception-exploit so we dont have to comment out scraper after 1st run
// If tables cant be counted == tables dont exist -> run scraper
// If tables can be counted == tables exist -> dont run scraper
// NOTE: if you stop scraper midway you will have to delete tables in mysql then run server again for full scrape
try {
  const progDB = await programs.findAndCountAll();
  const deptDB = await departments.findAndCountAll();
} catch(error) {
  console.log(error);
  await scrapeProgramList();
}

// start nodejs server, It will listen for requests on PORT.
server.listen(PORT, () => {
    console.log(`Listening: http://localhost:${PORT}`);
});
