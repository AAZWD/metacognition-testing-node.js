window.onload = function () {

  // get form
  let form = document.querySelector('form');
  // get inputs
  let inputs = document.getElementsByClassName('form-control');

  //general validation function
  function validInput(input) {
    const regex = /^[a-z0-9]+$/i;
    return regex.test(input);
  };

  //password input matches
  function matchingPass(pass1, pass2) {
    return pass1 == pass2;
  };

  //check validation onsubmit
  form.onsubmit = function (event) {

    const fName = form.elements[0];
    const lName = form.elements[1]; 
    const user = form.elements[2];
    const pass = form.elements[3];
    const pass2 = form.elements[4];

    if (!validInput(user.value) || !validInput(pass.value)) {
      event.preventDefault();
      inputs[2].style.borderColor = 'red';
      inputs[3].style.borderColor = 'red';
    } else if (!validInput(fName.value) || !validInput(lName.value)) {
      event.preventDefault();
      inputs[0].style.borderColor = 'red';
      inputs[1].style.borderColor = 'red';
      inputs[2].style.borderColor = 'black';
      inputs[3].style.borderColor = 'black';
      inputs[4].style.borderColor = 'black';
    }else if (!matchingPass(pass.value, pass2.value)) {
      event.preventDefault();
      inputs[0].style.borderColor = 'black';
      inputs[1].style.borderColor = 'black';
      inputs[2].style.borderColor = 'black';
      inputs[3].style.borderColor = 'red';
      inputs[4].style.borderColor = 'red';
    } else {
      inputs[2].style.borderColor = 'black';
      inputs[3].style.borderColor = 'black';
      inputs[4].style.borderColor = 'black';
      form.classList.add('was-validated');
      return true;
    }
  }
};