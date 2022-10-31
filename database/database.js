import { departments, programs, poutcomes, courses } from './sequelize.js';
// InfoMatrix Key:
// [links, PROG_NAME, DEG_TYPE, DEP_NAME, PROG_CODE, PROG_DESC, DEP_CHAIR, [PROG_SLO], [COUR_NAME]]
// TODO: COUR_DESC

// Same thing that was happening before just with a matrix
// As the models grow or change we can just add methods here without worrying about scraper
class Database {
  constructor(infoMatrix) {
    this.infoMatrix = infoMatrix;
  } 
  
  insertPrograms = async () => {
    let mLength = this.infoMatrix[0].length;
    let i = 0;
    while (i < mLength) {
      await programs.create({
        prog_code: this.infoMatrix[4][i],
        prog_name: this.infoMatrix[1][i],
        prog_type: this.infoMatrix[2][i],
        prog_desc: this.infoMatrix[5][i],
        prog_dept: this.infoMatrix[3][i],
        prog_slos: this.infoMatrix[7][i].join(''),
      });
      
      let ploQuantity = this.infoMatrix[7][i].length;
      for (let j = 0; j < ploQuantity; j++) {
        await poutcomes.create({
          pout_desc: this.infoMatrix[7][i][j],
          prog_id: i+1,
        });
      }
      i++;
    } 
  }
  
  insertDepartments = async () => {
    let mLength = this.infoMatrix[3].length;
    let i = 0;
    while (i < mLength) {
      let existingDept = await departments.findOne({
        where: { dept_name: this.infoMatrix[3][i]}
      });
      if (await existingDept == null) {
        await departments.create({
          dept_name: this.infoMatrix[3][i],
          dept_chair: this.infoMatrix[6][i],
        });
      }
      i++;
    }
  }
  
  insertCourses = async () => {
    let ccourses = this.infoMatrix[8].flat()
    ccourses = [...new Set(ccourses)]
    let uniqueC = []
    let mLength = ccourses.length;
    for (let i = 0; i < mLength; i++) {
      let cString = ccourses[i].split(',') 
      uniqueC.push(cString[0] + ',' + cString[1])
    }
    uniqueC = [...new Set(uniqueC)]
    for (let i = 0; i < uniqueC.length; i++) {
      let values = uniqueC[i].split(',')
      await courses.create({
        cour_id: values[0],
        cour_name: values[1] 
      }) 
    }
    console.log('inserted courses')
  }
  
  addProgramCourses = async () => {
    let progCourses = this.infoMatrix[8]
    let length = this.infoMatrix[8].length
    let courKeyArr = []
    for (let i = 0; i < length; i++) {
      let cProg = progCourses[i]
      let plength = progCourses[i].length
      let tempArr = []
      for (let j = 0; j < plength; j++) {
        let cKey = cProg[j].split(',') 
        tempArr.push(cKey[0])
      } 
      courKeyArr.push(tempArr)
    }
    
    let fLength = courKeyArr.length
    for (let i = 0; i < fLength; i++) {
      let cArr = courKeyArr[i]
      let pLength = cArr.length
      let cprog = await programs.findOne({ where: { prog_id: (i+1) }})
      for ( let j = 0; j < pLength; j++) {
        let cCour = await courses.findOne({ where: { cour_id: cArr[j]}})
        cprog.addCourses(cCour)
      }
    }
  }
  
  InsertData = async () => {
    await this.insertPrograms();
    await this.insertDepartments();
    await this.insertCourses();
    await this.addProgramCourses();
  }
} 

export default Database;