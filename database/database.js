import { departments, programs } from './sequelize.js';
// InfoMatrix Key:
// [links, names, types, depts, codes, abouts, chairs, [slos]]

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
      console.log('inserting program ' + (i+1) + '/' + mLength);
      await programs.create({
        prog_code: this.infoMatrix[4][i],
        prog_name: this.infoMatrix[1][i],
        prog_type: this.infoMatrix[2][i],
        prog_desc: this.infoMatrix[5][i],
        prog_dept: this.infoMatrix[3][i],
        prog_slos: this.infoMatrix[7][i].join(', '),
      });
      i++;
    } 
  }
  
  insertDepartments = async () => {
    let mLength = this.infoMatrix[3].length;
    let i = 0;
    while (i < mLength) {
      console.log('inserting departments ' + (i+1) + '/' + mLength);
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
  
  InsertData = async () => {
    await this.insertPrograms();
    await this.insertDepartments();
  }
} 

export default Database;