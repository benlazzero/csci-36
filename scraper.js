import fetch from "node-fetch"; // for the http request 
import cheerio from "cheerio"; // parsing library
import { departments, programs} from './sequelize.js'; // models from DB for read/write

// scraper implementation is 'brute force' to say the least. 
// this is maybe the least important to understand at this point, I would look this over last.

async function scrapeProgramList() {
    // temporary fix for duplicate primary keys being entered on intial scrape -> DB.
    let currentid = 1; 
    //
    
    const programListRes = await fetch("https://programs.butte.edu/ProgramList/All/10/false"); // streams the program list in binary or hex or something 

    const programListText = await programListRes.text(); // decodes that to utf-8 or ascii so we can read it
    let $ = cheerio.load(programListText); // pretty sure this makes a DOM tree from all the html that can be parsed by the cheerio lib, like preprocessing
    
    // grabbing specific classes or tags?
    const programListContent = $(".content");
    const tbody = programListContent.find("tbody");

    const programScraper = tbody.find("tr").each(async function (i, elem) {
        console.log(elem);
        const name = $(this).find("a").first().text().trim(); // gets name of program
        const link = "https://programs.butte.edu" + $(this).find("a").attr("href"); // gets link to program's page
        const type = $(this).find("td").eq(0).text().trim(); // type of program (Cert, AS, AA, etc...)
        const dept = $(this).find("td").eq(1).text().trim(); // department that the program belongs to
        const code = $(this).find("td").last().text().trim(); // program code
        let SLOs = []; // array for SLOs

        // Go into programs page for slo's, etc..
        const programRes = await fetch(link);
        const programText = await programRes.text();
        $ = cheerio.load(programText);
        const programPageContent = $(".content");
        const programAbout = programPageContent.find("p").first().text(); // Description of the program
        let chair = programPageContent
            .find(".bg-darkgray-1.p-15.border-radius-5.white.mb-30")
            .find("p")
            .first()
            .text()
            .trim(); // Program chair
        chair = chair.split(",")[0]; // removes extra info from chair string

        let program = {};
        
        // Adds data to JSON object
        program.name = name;
        program.type = type;
        program.department = dept;
        program.code = code;
        program.chair = chair;
        program.about = programAbout;
        program.slos = [];
        program.link = link;
        program.id = currentid; //NOTICE: currentid var "hack" is here to avoid duplicate primary keys from last class

        const sloScraper = programPageContent
            .find(".dots")
            .children()
            .each(function (i, elem) {
                program.slos[i] = $(this).text().trim();
            });

        // DEBUGGING
        // Once database is set-up this will no longer be used
        console.log(program);
        console.log("----------------------------------------");
        //

        // SQL DATABASE 
        // this is where the push to DB happends
        // the currentid var "hack" is implemented here
        const newProgram = await programs.create({
            prog_id: currentid,
            prog_code: program.code,
            prog_name: program.name,
            prog_type: program.type,
            prog_desc: program.about,
            prog_dept: program.department,
            prog_slos: program.slos.join(', '),
        }).then(currentid = currentid + 1);

        const existingDept = await departments.findOne({
            where: {dept_name: program.department}
        })
        if (existingDept == null) {
            const newDepartment = await departments.create({
                dept_id: program.id,
                dept_name: program.department,
                dept_chair: program.chair
            });
        }
    });
}

export default scrapeProgramList;
