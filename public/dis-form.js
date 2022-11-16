const showTextArea = () => {
  let textArea = document.querySelector('.textarea-wrapper')
  let button = document.querySelector('.btn.btn-warning')
  textArea.style.display = 'block'
  button.removeAttribute('disabled')
}

// takes in arr of slos and parses them, returns parsed arr of slos
const parseSlos = (rawSlos) => {
  let rawSloArr = rawSlos
  let finalSlos = []
  for (let i = 0; i < rawSloArr.length-1; i++) {
    let temp = rawSloArr[i].split('.') 
    if (temp[0].charAt(0) == ',') {
      temp[0] = temp[0].slice(1)
    }
    temp = temp.filter((elem) => {
      return elem != ''
    })
    finalSlos.push(temp)
  }
  return finalSlos
}

// adds courses to arr to be shown on form based on current value
const getCoursesForValue = (selection, allCourses, allKeys ) => {
  let willRender = []
  for (let i = 0; i < allKeys.length; i++) {
    if (allKeys[i] === selection) {
      willRender.push(allCourses[i])
    }  
  }
  return willRender
}

// creates option elements for selection element for courses
const makeCourseOptions = (coursesArr) => {
  let elementArr = []
  for (let i = 0; i < coursesArr.length; i++) {
    let newOption = document.createElement('option')
    newOption.innerHTML = coursesArr[i]
    elementArr.push(newOption)
  }
  return elementArr
}

const getCloArr = (allClos, selection) => {
  let clos = allClos.split('+')
  let focusedClo
  for (let i = 0; i < clos.length; i++) {
    if (clos[i].search(selection) !== -1) {
      focusedClo = clos[i]
    }
  }
  focusedClo = focusedClo.slice(focusedClo.indexOf(',') + 1)
  focusedClo = focusedClo.split('.')
  focusedClo.pop()

  return focusedClo
}

const makeCloHeader = () =>{
  let courseHeader = document.createElement('h5')
  courseHeader.innerHTML = 'Course Learning Outcomes'
  courseHeader.classList.add('mb-4')
  courseHeader.classList.add('mt-4')
  return courseHeader
}

const makeProgHeader = () => {
  let progHeader = document.createElement('h5')
  progHeader.innerHTML = 'Program Learning Outcomes'
  progHeader.classList.add('mb-4')
  progHeader.classList.add('mt-4')
  return progHeader
}

const makeChooseOpt = () => {
  let chooseOption = document.createElement('option')
  chooseOption.value = ''
  chooseOption.setAttribute('selected', '')
  chooseOption.innerHTML = 'Choose...'
  return chooseOption
}

const makeSloCheckboxes = (sloArr) => {
  let currentSlos = sloArr
  let length = currentSlos.length
  let sloElementArr = []

  for (let i = 0; i < length; i++) {
    // make div
    let newDiv = document.createElement('div') 
    newDiv.classList.add('form-check')
    newDiv.setAttribute('id', 'plo' + i)
    // make input
    let newInput = document.createElement('input')
    newInput.classList.add('form-check-input')
    newInput.setAttribute('type', 'radio')
    newInput.value = currentSlos[i]
    // make label
    let newLabel = document.createElement('label')
    newLabel.classList.add('form-check-label')
    newLabel.setAttribute('for', 'flexCheckDefault')
    newLabel.innerHTML = currentSlos[i]
    // add elements into div
    newDiv.appendChild(newInput)
    newDiv.appendChild(newLabel)
    
    sloElementArr.push(newDiv)
  }
  return sloElementArr
}

const addOptionsForClo = (elementsArr) => {
  let DomArr = []
  for (let i = 0; i < elementsArr.length; i++) {
    elementsArr[i].firstChild.setAttribute('name', 'courseopt')
    elementsArr[i].firstChild.onclick = showTextArea
    DomArr.push(elementsArr[i])
  }
  return DomArr
}

const removeProgNodes = () => {
  let parent = document.getElementById('progs-courses')
  let label = document.querySelector('.text-secondary.coursehide')
  parent.style.display = 'block'
  label.style.display = 'unset'
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
  return parent
}

const removeCloSelections = () => {
  let progLosElement = document.querySelector('.plo-options-wrapper')
  progLosElement.style.display = 'block'
  while (progLosElement.firstChild) {
    progLosElement.removeChild(progLosElement.firstChild)
  }
  return progLosElement
}

const cleanOldClos = () => {
  let courseLosElement = document.querySelector('.clo-options-wrapper')
  courseLosElement.style.display = 'unset'
  while (courseLosElement.firstChild) {
    courseLosElement.removeChild(courseLosElement.firstChild)
  }
  return courseLosElement
}

const validateForm = () => {
  let values = document.forms['aform']['course'].value
  console.log(values)
  // TODO validate fields
  // 'return false' will block post request
  // add message for failure or success
  // if success delete all current form inputs
}