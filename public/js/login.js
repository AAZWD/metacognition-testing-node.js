window.onload = function () {
  
    // get form
    let form = document.querySelector('form');
    // get inputs
    let inputs = document.getElementsByClassName('form-control');
    //general validation function
    function validUserPass(input) {
      const regex = /^[a-z0-9]+$/i;
      return regex.test(input);
    };

    //check validation onsubmit
    form.onsubmit = function (event) {

      const user = form.elements[0];
      const pass = form.elements[1];

      if (!validUserPass(user.value) || !validUserPass(pass.value)) {
        event.preventDefault();
        inputs[0].style.borderColor = 'red';
        inputs[1].style.borderColor = 'red';
      } else {
        inputs[0].style.borderColor = 'black';
        inputs[1].style.borderColor = 'black';
        form.classList.add('was-validated');
        return true;
      }
    }
  

};