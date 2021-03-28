window.onload = function () {

  // get form
  let form = document.querySelector('form');
  // get inputs
  let inputs = document.querySelectorAll('input');
  //general validation function
  function validPass(input) {
    const regex = /^[a-z0-9]+$/i;
    return regex.test(input);
  };
  //validate email
  function validEmail(input) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(input.toLowerCase());
  };

  //check validation onsubmit
  form.onsubmit = function (event) {

    const email = form.elements[0];
    const pass = form.elements[1];

    if (!validEmail(email.value) && !validPass(pass.value)) {
      event.preventDefault();
      inputs[0].style.borderColor = 'red';
      inputs[1].style.borderColor = 'red';
    } else if (!validPass(email.value)){
      inputs[0].style.borderColor = 'red';
      inputs[1].style.borderColor = 'black';
    } else if (!validPass(pass.value)){
      inputs[0].style.borderColor = 'black';
      inputs[1].style.borderColor = 'red';
    }else
      return true;
    }
  }


};