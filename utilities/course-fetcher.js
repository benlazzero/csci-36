import puppeteer from 'puppeteer'
import fs from 'node:fs'

const GetCoursesControlsArray = (infoMatrix) => {
  let courseControlsArray = []
  const totalPrograms = infoMatrix[8].length
  for (let i = 0; i < totalPrograms; i++) {
    let progCoursesArray = []
    const TotalCourses = infoMatrix[8][i].length 
    for (let j = 0; j < TotalCourses; j++) {
      let courseControl = infoMatrix[8][i][j].split(',', 1).join()
      // Check for 'or', if present then cut it out
      // TODO: check for 'and'
      if (courseControl.search('or ') == -1) {
        progCoursesArray.push(courseControl) 
      } else {
        progCoursesArray.push(courseControl.slice(3)) 
      }
    }
    courseControlsArray.push(progCoursesArray)
  }
  return courseControlsArray
}

// example link to clos report
//https://butte.curriqunet.com/DynamicReports/AllFieldsReportByEntity/2861?entityType=Course&reportId=213 
const GetCoursesClos = async (infoMatrix) => {
  let cloArray = []
  let controlsArray = GetCoursesControlsArray(infoMatrix)
  controlsArray = controlsArray.flat()
  controlsArray = controlsArray.flat()
  let uniqueControls = [...new Set(controlsArray)]
  uniqueControls = uniqueControls.splice(171)
  console.log(uniqueControls)
  const browser = await puppeteer.launch({ ignoreDefaultArgs: true })
  const page = await browser.newPage();

  for (let i = 0; i < uniqueControls.length; i++) {
    let key = uniqueControls[i]
    //checking for 'and'
    let alterkey = key.search('and ')
    console.log(alterkey)
    if (alterkey !== -1) {
      key = key.slice(4)
    }
    await page.goto('https://butte.curriqunet.com/Account/Logon?ReturnUrl=%2f', { waitUntil: 'load' })
    await page.type('#iptMainKeywordSearch', key)
    await page.waitForSelector('#CETDropdown-trigger-button')
    await page.click('#CETDropdown-trigger-button')
    await page.click('.dropdown-item')

    await page.waitForSelector('#client-entity-type-search-button')
    
    await Promise.all([
      page.focus('#client-entity-type-search-button'),
      page.waitForNavigation(),
      page.click('#client-entity-type-search-button')
    ])
    
    const html = await page.$eval('#searchResultsList', el => el.outerHTML);
    const indexer = html.search('Active')
    const newHtml = html.slice(indexer)
    const hrefIndex = newHtml.search(/href/)
    const finalHtml = newHtml.slice(hrefIndex)
    const hrefLink = finalHtml.split(' ')
    const link = hrefLink[0]
    let finalLink = link.slice(6)
    finalLink = finalLink.slice(0, -1); 
    finalLink = finalLink.replace(/&amp;/g, '&') 
    
    console.log(finalLink)
    const cpage = 'https://butte.curriqunet.com' + finalLink
    await page.goto(cpage, { waitUntil: 'load' })
    let value;
    try {
      value = await page.$eval('ol', el => el.innerText)
    } catch (error) {
      value = 'no clos for this course'
    }
    let data = { [key]: value }
    data = JSON.stringify(data)
    fs.appendFile('clos.json', data + '\r\n', {'flags': 'a'}, err => {
      if (err) {
        throw err
      }
    })
    console.log(data)
  }
}

export default GetCoursesClos