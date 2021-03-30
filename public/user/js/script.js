window.onload = function () {
    //filter by name
    let input = document.getElementById('nameSearch');
    let tRow = document.querySelectorAll('tbody .info');
    input.onkeyup = function (event) {
        if (input.value) {
            tRow.forEach(row => {
                console.log(row)
                let name = row.querySelector('.name');
                console.log(name)
                if (!name.textContent.includes(input.value))
                    row.classList.add('hide');
            });
        }else{
            tRow.forEach(row => {
                    row.classList.remove('hide');
            });
        }
        
    }


       //filter by id
       let input2 = document.getElementById('idSearch');
       let tRow2 = document.querySelectorAll('tbody .info');
       input2.onkeyup = function (event) {
           if (input2.value) {
               tRow2.forEach(row => {
                   let id = row.querySelector('.id');
                   if (!id.textContent.includes(input2.value))
                       row.classList.add('hide');
               });
           }else{
               tRow2.forEach(row => {
                       row.classList.remove('hide');
               });
           }
           
       }
    
};