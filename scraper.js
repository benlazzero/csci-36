import * as cheerio from "cheerio"; 
import FetchHtml from './utilities/helpers.js';
import fs from 'fs';

// Handles all fetching and parsing
// Takes in text-html of the 'all programs' page of the year you want to scrape
// Returns a matrix of info to be used to hydrate models in database
// NOTE: private methods are weird in JS so they are not used, but the only real public method is getandorderinfomatrix()
class Program {
  constructor(fetchedHtml) {
    this.$ = cheerio.load(fetchedHtml);
    this.allProgramsObject = this.$(".content").find("tbody").find('tr');
    this.insideProgramsArray = [];
    this.totalPrograms = this.allProgramsObject.length;
    this.programInfo = [];
    this.butteUrl = "https://programs.butte.edu";
  }
  
  GetProgramLinks = () => {
    let programLinks = [];
    let Index = 0;
    while(Index < this.totalPrograms) {
      let currentLink = this.butteUrl + this.$(this.allProgramsObject[Index]).find('a').attr('href');
      programLinks.push(currentLink);
      Index++;
    }
    return programLinks;
  }
  
  GetProgramNames = () => {
    let programNames = [];
    let Index = 0;
    while(Index < this.totalPrograms) {
      let currentName = this.$(this.allProgramsObject[Index]).find('a').first().text().trim();
      programNames.push(currentName);
      Index++;
    }
    return programNames;
  }
  
  GetProgramTypes = () => {
    let programTypes = [];
    let Index = 0;
    while(Index < this.totalPrograms) {
      let currentType = this.$(this.allProgramsObject[Index]).find("td").eq(0).text().trim();
      programTypes.push(currentType);
      Index++;
    }
    return programTypes;
  }
  
  GetProgramDepts = () => {
    let programDepts = [];
    let Index = 0;
    while(Index < this.totalPrograms) {
      let currentDept = this.$(this.allProgramsObject[Index]).find("td").eq(1).text().trim();
      programDepts.push(currentDept);
      Index++;
    }
    return programDepts;
  }
  
  GetProgramCodes = () => {
    let programCodes = [];
    let Index = 0;
    while(Index < this.totalPrograms) {
      let currentCode = this.$(this.allProgramsObject[Index]).find("td").last().text().trim();
      programCodes.push(currentCode);
      Index++;
    }
    return programCodes;
  }

  // Start of methods for 2nd fetch, in each program
  // Uses links from the all programs page
  // loops through following each link and grabbing the html 
  // dumps that into an array in class variables
  FetchEachProgram = async () => {
    let allPrograms = [];
    const totalLinks = this.programInfo[0].length;
    // grabbing all html from each program
    for (let i = 0; i < totalLinks; i++) {
      console.log((i+1) + '/' + totalLinks);
      const currentProgram = fs.readFileSync('./dev-programs/prog' + (i+1) + '.txt', 'utf8', function(err){
        if (err) throw err;
      })
      allPrograms.push(currentProgram);
    }
    this.insideProgramsArray = allPrograms;
  }
  
  GetProgramsAbouts = () => {
    let programsAbouts = [];
    const totalPrograms = this.insideProgramsArray.length;
    for (let i = 0; i < totalPrograms; i++) {
      // Pull in next program from array and set up parser
      this.$ = cheerio.load(this.insideProgramsArray[i]);
      const programContent = this.$(".content");
      // Get program about section, add place holder if their isnt one.
      let aboutSection = programContent.find("#description:nth-child(1)").find('p').text();
      if (aboutSection.length == 0) {
        aboutSection = 'Needs about section'; 
      };
      // Push current about to function scope array
      programsAbouts.push(aboutSection);
    }
    return programsAbouts;
  }

  GetProgramsChairs = () => {
    let programsChairs = [];
    const totalPrograms = this.insideProgramsArray.length;
    for (let i = 0; i < totalPrograms; i++) {
      // Pull in next program from array and set up parser
      this.$ = cheerio.load(this.insideProgramsArray[i]);
      const programContent = this.$(".content");
      // Get chair of program
      let chair = programContent.find(".bg-darkgray-1.p-15.border-radius-5.white.mb-30").find("p").first().text().trim(); 
      chair = chair.split(",")[0];
      // Push current chair to function scope array
      programsChairs.push(chair);
    }
    return programsChairs;
  }
  
  GetProgramsSlos = () => {
    let programsSlos = [];
    const totalPrograms = this.insideProgramsArray.length;
    for (let i = 0; i < totalPrograms; i++) {
      // Pull in next program from array and set up parser
      this.$ = cheerio.load(this.insideProgramsArray[i]);
      const programContent = this.$(".content");
      // This pushes an array of a programs slos into an array of all programs slos
      let currentSloStore = []
      let allProgramsScoped = this.insideProgramsArray;
      programContent.find(".dots").children().each(function (j, elem) {
        let $$ = cheerio.load(allProgramsScoped[i])
        currentSloStore[j] = $$(elem).text().trim();
      });
      programsSlos.push(currentSloStore);
    }
    return programsSlos;
  }
  

  //TODO: refactor, maybe along with the other inprograms, a lot of repeated code
  GetProgramsCourses = () => {
    let programsCourses = [];
    let realStore = []
    const totalPrograms = this.insideProgramsArray.length;
    // going through each program
    for (let i = 0; i < totalPrograms; i++) {
      this.$ = cheerio.load(this.insideProgramsArray[i]);
      const programContent = this.$(".content");
      let currentCoursesStore = [];
      let allProgramsScoped = this.insideProgramsArray;
      // once inside program
      programContent.find(".classLinks").children().each(function (j, elem) {
        let $$ = cheerio.load(allProgramsScoped[j])
        currentCoursesStore.push($$(elem).text().trim());
      }) 
      // format the data so each index is a full course description
      let numberOfCourses = currentCoursesStore.length / 3;
      let tempStore = []
      let ti = 0;
      for (let i = 0; i < numberOfCourses; i++) {
        tempStore.push(currentCoursesStore.slice(ti, ti+3).join(' ')) 
        ti = ti + 3;
      }
      currentCoursesStore = tempStore;
      programsCourses.push(currentCoursesStore)
    }
    return programsCourses;
  }
  
  // populate infoMatrix class variable with data from all programs page
  SetAllPrograms = () => {
    let links = this.GetProgramLinks();
    let names = this.GetProgramNames();
    let types = this.GetProgramTypes();
    let depts = this.GetProgramDepts();
    let codes = this.GetProgramCodes();
    this.programInfo.push(links);
    this.programInfo.push(names);
    this.programInfo.push(types);
    this.programInfo.push(depts);
    this.programInfo.push(codes);
  }
  
  // populate infoMatrix class variable with data from inside each program
  SetAllInnerPrograms = () => {
    let abouts = this.GetProgramsAbouts();
    let chairs = this.GetProgramsChairs();
    let slos = this.GetProgramsSlos();
    //let courses = this.GetProgramsCourses(); // Not using currently, commented out to save compute
    this.programInfo.push(abouts);
    this.programInfo.push(chairs);
    this.programInfo.push(slos);
    //this.programInfo.push(courses);
  }

  // This is the only method that should be used from the class outside of the class
  // something like encapsulation minus the part that enforces it... lol
  Scrape = async () => {
    // setting the infoMatrix with links/names/types/depts/codes.
    this.SetAllPrograms();
    // performing the second fetch with links from setAllPrograms().
    await this.FetchEachProgram();
    // setting the infoMatrix with abouts/chairs/slos.
    this.SetAllInnerPrograms();
    // returns the multi-d array 
    return this.programInfo; 
  }
}

// fetch can to be used to construct class outside of here
export { FetchHtml, Program };
