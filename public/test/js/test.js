window.onload = function () {
    let submit = document.querySelector('.dsBtn');
    let area = document.getElementById('testArea');
    let display = document.getElementById('number');
    let circle = document.getElementById('circle');
    let start = document.getElementsByName('start');
    let end;
    let time;
    let input = document.getElementsByName('answer');
    
    let random;
    let digits = [];
    //reset after 2
    let mistake = 0;
    //starting level
    let level = 4;
    let trial = 0;
    //ends at this point
    let maxTrial = 3; //subtract 1 with each pass

    let lastDS;
    let longDS;

    let TEST_ans = [];
    let MC_ans;

    //for first pass
    let first = true;
    submit.onclick = function (event) {
        if (first) {
            //format
            submit.textContent = 'Submit';
            area.classList.remove('hide');
            //set start time
            start.value = new Date()
            console.log(start.value)
        }
        first = false;
        //display numbers area
        setTimeout(function () {
            circle.classList.add('hide');
            display.classList.remove('hide');
        }, 2000);

        //gen random numbers and add to array
        for(let x = 0; x < level; x++){
            random =  Math.floor(Math.random()*10).toString();
            digits.push(random);
        }
        console.log(digits)
        //show the digits 1 by one in 2 second intervals

        //how to get the input values without submiting on a normal click
        // also how to clear the area
        if(input.value){
            console.log(input.value)
        }
    }
    
};