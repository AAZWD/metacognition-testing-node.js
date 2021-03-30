window.onload = function () {
    //filter patient directory

    let input = document.getElementById('nameSearch');
    let tRow = document.querySelectorAll('tbody tr');
    input.onkeyup = function (event) {
        if (input.value) {
            tRow.forEach(row => {
                if (!row.textContent.includes(input.value))
                    row.classList.add('hide');
            });
        }else{
            tRow.forEach(row => {
                    row.classList.remove('hide');
            });
        }
        
    }
    
};