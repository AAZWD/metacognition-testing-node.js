window.onload = function () {
    let submit = document.getElementById('submit');
    let confirm = document.getElementById('confirm');
    console.log(confirm)
    let display = document.getElementById('number');
    let form = document.querySelector('#startForm');
    let endForm = document.getElementById('endForm');
    let start;
    let end;
    let random;
    let digits = [];
    let number = '';
    //reset after 2
    let mistake = 0;
    //starting level
    let level = 4;
    let trial = 0;
    //ends at this point
    let maxTrial = 3; //subtract 1 with each pass

    let lastDS = 0;
    let longDS = 0;

    let TEST_ans = [];

    form.onsubmit = function (event) {
        event.preventDefault();
    }

    //start + first pass
    confirm.onclick = function () {
        console.log(666)
        confirm.classList.add('hide');
        display.classList.remove('hide');
        //set start time
        start = new Date()
        //display numbers area

        display.classList.remove('hide');

        //gen random numbers and add to array
        digits.push('**')
        for (let x = 0; x < level; x++) {
            random = Math.floor(Math.random() * 10).toString();
            digits.push(random);
            digits.push(' ');
            number += random
        }

        digits.push('**')
        console.log(digits)
        console.log('length of number', number.length)
        //display array
        let x = 1
        digits.forEach(num => {
            setTimeout(function () {
                display.innerHTML = num;
            }, (x * 1000));
            x++
        });

        setTimeout(function () {
            form.classList.remove('hide');
        }, (x * 1000));

    }

    submit.onclick = function () {
        form.classList.add('hide');
        let input = document.getElementById('answer');
        console.log('this is the input value: ', input.value)
        console.log('this is the number     : ', number)

        //add level to array, and up the trial
        TEST_ans.push(level);
        trial++
        console.log('trial', trial)
        console.log('Test ans', TEST_ans)
        if (trial == 1) {

        }
        //track data
        if (input.value.trim() != number.trim()) {
            mistake++
            console.log('mistake', mistake)
        } else {
            if (mistake == 2) {
                longDS = level
                level++
                mistake = 0
                console.log('long', longDS, 'last', lastDS, 'level', level, 'mistake', mistake)
            } else {
                longDS = level
                lastDS = level
                level++
                console.log('long', longDS, 'last', lastDS, 'level', level, 'mistake', mistake)
            }
        }

        //for displaying new numbers
        if (trial < maxTrial) {
            input.value = ''

            //numbers again
            digits = []
            number = ''
            //gen random numbers and add to array
            digits.push('**')
            for (let x = 0; x < level; x++) {
                random = Math.floor(Math.random() * 10).toString();
                digits.push(random);
                digits.push(' ');
                number += random
            }
            digits.push('**')
            console.log(digits)
            console.log(number)
            //display array
            let x = 1
            digits.forEach(num => {
                setTimeout(function () {
                    display.innerHTML = num;
                }, (x * 1000));
                x++
            });

            setTimeout(function () {
                form.classList.remove('hide');
            }, (x * 1000));
        } else {
            endForm.classList.remove('hide');
            display.innerHTML = 'Test Completed. \n Answer the following question then click "End Testing"';
            end = new Date();
            //set hidden values
            let startTime = document.getElementById('startTime');
            let totalTime = document.getElementById('totalTime');
            let last = document.getElementById('last');
            let long = document.getElementById('long');
            let test = document.getElementById('test');

            startTime.value = start;
            function millisToMinutesAndSeconds(millis) {
                let minutes = Math.floor(millis / 60000);
                let seconds = ((millis % 60000) / 1000).toFixed(0);
                return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
            }
            totalTime.value = millisToMinutesAndSeconds(end - start);
            last.value = lastDS;
            long.value = longDS;
            test.value = TEST_ans;
        }

    }

};