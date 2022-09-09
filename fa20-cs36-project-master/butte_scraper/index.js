//https://docs.google.com/spreadsheets/d/1OE6LBQzO7DGGRFFmWWalNpywKhw3fveJdlmiP6c19L0/edit#gid=0
const fetch = require("node-fetch");
const cheerio = require("cheerio");
//const Sheet = require('./sheet');
const Models = require('../sequelize');
const { Sequelize, Model, DataTypes } = require('sequelize');

async function scrapeProgramList() {
    const programListRes = await fetch(
        "https://programs.butte.edu/ProgramList/All/10/false"
    );
    const programListText = await programListRes.text();
    let $ = cheerio.load(programListText);
    const programListContent = $(".content");
    const tbody = programListContent.find("tbody");
    const programScraper = tbody.find("tr").each(async function (i, elem) {
        const name = $(this).find("a").first().text().trim(); // gets name of program
        const link =
            "https://programs.butte.edu" + $(this).find("a").attr("href"); // gets link to program's page
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

        program = {}

        // Adds data to JSON object
        program.name = name;
        program.type = type;
        program.department = dept;
        program.code = code;
        program.chair = chair;
        program.about = programAbout;
        program.slos = [];
        program.link = link;
        program.id = i;

        const sloScraper = programPageContent
            .find(".dots")
            .children()
            .each(function (i, elem) {
                program.slos[i] = $(this).text().trim();
            });

        // Display program JSON in console
        // Once database is set-up this will no longer be used
        console.log(program);
        console.log("----------------------------------------");

        const newProgram = await Models.programs.create({
            prog_id: program.id,
            prog_code: program.code,
            prog_name: program.name,
            prog_type: program.type,
            prog_desc: program.about,
            prog_dept: program.department,
            prog_slos: program.slos.join(', ')
        });

        const existingDept = await Models.departments.findOne({
            where: {dept_name: program.department}
        })
        if (existingDept == null) {
            const newDepartment = await Models.departments.create({
                dept_id: program.id,
                dept_name: program.department,
                dept_chair: program.chair
            });
        }
    });
};

//scrapeProgramList() // Run Scraper

module.exports = scrapeProgramList;
