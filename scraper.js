import fetch from "node-fetch"; // for the http request 
import * as cheerio from "cheerio"; // parsing library

// Utility, returns html from a given url
// should be in utils file but its the only one so whatever
const fetchHtml = async (url) => {
  const fullPageHtmlEncoded = await fetch(url);
  const fullPageHtmlDecoded = await fullPageHtmlEncoded.text();
  return fullPageHtmlDecoded;
}

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
      Index = Index + 1;
    }
    return programLinks;
  }
  
  GetProgramNames = () => {
    let programNames = [];
    let Index = 0;
    while(Index < this.totalPrograms) {
      let currentName = this.$(this.allProgramsObject[Index]).find('a').first().text().trim();
      programNames.push(currentName);
      Index = Index + 1;
    }
    return programNames;
  }
  
  GetProgramTypes = () => {
    let programTypes = [];
    let Index = 0;
    while(Index < this.totalPrograms) {
      let currentType = this.$(this.allProgramsObject[Index]).find("td").eq(0).text().trim();
      programTypes.push(currentType);
      Index = Index + 1;
    }
    return programTypes;
  }
  
  GetProgramDepts = () => {
    let programDepts = [];
    let Index = 0;
    while(Index < this.totalPrograms) {
      let currentDept = this.$(this.allProgramsObject[Index]).find("td").eq(1).text().trim();
      programDepts.push(currentDept);
      Index = Index + 1;
    }
    return programDepts;
  }
  
  GetProgramCodes = () => {
    let programCodes = [];
    let Index = 0;
    while(Index < this.totalPrograms) {
      let currentCode = this.$(this.allProgramsObject[Index]).find("td").last().text().trim();
      programCodes.push(currentCode);
      Index = Index + 1;
    }
    return programCodes;
  }

  // Start of methods for 2nd fetch, in each program

  // Uses links from the all programs page
  // loops through following each link and grabbing the html 
  // dumps that into an array in class variables
  InsideEachProgram = async () => {
    let allPrograms = [];
    const totalLinks = this.programInfo[0].length;
    let index = 0;
    
    // grabbing all html from each program
    while(index < totalLinks) {
      console.log((index+1) + '/' + totalLinks);
      const currentProgram = await fetchHtml(this.programInfo[0][index])
      allPrograms.push(currentProgram);
      index = index + 1;
    }
    
    this.insideProgramsArray = allPrograms;
  }
  
  GetProgramsAbouts = () => {
    let programsAbouts = [];
    for (let i = 0; i < this.insideProgramsArray.length; i++) {
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
    for (let i = 0; i < this.insideProgramsArray.length; i++) {
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
    for (let i = 0; i < this.insideProgramsArray.length; i++) {
      // Pull in next program from array and set up parser
      this.$ = cheerio.load(this.insideProgramsArray[i]);
      const programContent = this.$(".content");
      // This pushes an array of a programs slos into an array of all programs slos
      let currentSloStore = []
      let allps = this.insideProgramsArray;
      programContent.find(".dots").children().each(function (j, elem) {
        // scope issues inside this foreach loop, couldnt figure out so just made new cheerio here.
        let $$ = cheerio.load(allps[i])
        currentSloStore[j] = $$(elem).text().trim();
      });
      // Push current slo array to function scoped array
      programsSlos.push(currentSloStore);
    }
    return programsSlos;
  }

  // This uses all 'private methods' to populate the matrix of data
  // Theres two main scrapes happening, 1: the page that lists all programs 2: in each program page
  // This is the only method that should be used from the class outside of the class
  // something like encapsulation minus the part that enforces it... lol
  GetAndOrderInfoMatrix = async () => {
    // 1st fetch, grabing info from the all programs page
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

    // This is for 2nd Fetch, populates an array with scrapes from each program page as cheerio object
    await this.InsideEachProgram();
    
    // 2nd fetch, grabbing info from in each program 
    let abouts = this.GetProgramsAbouts();
    let chairs = this.GetProgramsChairs();
    let slos = this.GetProgramsSlos();

    this.programInfo.push(abouts);
    this.programInfo.push(chairs);
    this.programInfo.push(slos);

    // returns the multi-d array 
    return this.programInfo; 
  }
}

// fetch can to be used to construct class outside of here
export { fetchHtml, Program };