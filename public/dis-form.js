const showTextArea = () => {
  let textArea = document.querySelector('.textarea-wrapper')
  let button = document.querySelector('.btn.btn-warning')
  textArea.style.display = 'block'
  button.removeAttribute('disabled')
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
  
  console.log(currentSlos)
  return sloElementArr
}

const validateForm = () => {
  let values = document.forms['aform']['course'].value
  console.log(values)
  // TODO validate fields
  // 'return false' will block post request
  // add message for failure or success
  // if success delete all current form inputs
}