import fs from 'fs'

const writeCoursesToJson = (CArray) =>{
  const length = CArray.length

  for(let i = 0; i < length; i++) {
    let key = i + 1
    let value = CArray[i]
    fs.writeFile('courses.json', ) 
  }
}