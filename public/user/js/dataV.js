window.onload = function () {
   let test = JSON.parse(document.querySelector('#testData').value);
   console.log(typeof test)

   let tp = document.querySelector('#totalNum p');
   let tc = document.querySelector('#completedNum p');
   let tDS = document.querySelector('#tDS');
   let tAll = document.querySelector('#tAll');
   let select = document.querySelector("#select select");
   let statsDS = document.querySelector("#statsDS");
   let statsAll = document.querySelector("#statsAll");
   let loDS = document.querySelector("#loDS");
   let laDS = document.querySelector("#laDS");

   let total = test.length;
   let compl = 0;

   let longDS = 0;
   let lastDS = 0;

   let VDS = 0

   //time
   let timeVDS = []
   let timeAll = []


   test.forEach(test => {
      //get completed
      if (test.complete) compl++
      //get test type
      if (test.test == "VDS") VDS++
      //long and last ds
      if (test.complete) {
         let Long = test.longDS
         let Last = test.lastDS
         if (Long > longDS) longDS = Long
         if (Long > lastDS) lastDS = Last
      }
      if (test.complete && test.test == 'VDS') {
         let tarray = test.time.split(':')
         let min = +tarray[0]
         let seconds = +tarray[1]
         let mill = seconds * 1000 + min * 60000
         timeVDS.push(mill)
      }
      if (test.complete) {
         let tarray = test.time.split(':')
         let min = +tarray[0]
         let seconds = +tarray[1]
         let mill = seconds * 1000 + min * 60000
         timeAll.push(mill)
      }
   });

   tp.textContent = total;
   tc.textContent = compl;

   //time
   let avgVDS = 0
   let avgAll = 0
   if (timeVDS.length !== 0) {
      timeVDS.forEach(time => {
         avgVDS += time
      });
      avgVDS = avgVDS / timeVDS.length
   }

   if (timeAll.length !== 0) {
      timeAll.forEach(time => {
         avgAll += time
      });
      avgAll = avgAll / timeAll.length
   }

   function millisToMinutesAndSeconds(millis) {
      let minutes = Math.floor(millis / 60000);
      let seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
   }
   tDS.textContent = millisToMinutesAndSeconds(avgVDS)
   tAll.textContent = millisToMinutesAndSeconds(avgAll)

   //toggle view on selection
   select.onchange = function (event) {
      if (select.value == 'All') {
         statsAll.classList.remove('hide')
         statsDS.classList.remove('hide')
         statsDS.classList.add('hide')
      }

      if (select.value == 'VDS') {
         statsDS.classList.remove('hide')
         statsAll.classList.remove('hide')
         statsAll.classList.add('hide')
      }
   }
   //digit spans
   loDS.textContent = longDS;
   laDS.textContent = lastDS;

};