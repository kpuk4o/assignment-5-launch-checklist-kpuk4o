

// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

window.addEventListener("load", function() {
   let form = document.querySelector("form");
   let button = document.getElementById("formSubmit");
  
   button.addEventListener("click", function(event) {
      event.preventDefault();
      let integrityCheck = [0, 0, 0, 0];
      let fields = ["Pilot Name", "Co-pilot Name", "Fuel Level", "Cargo Mass"];
      let pilotName = document.getElementById("pilotName");
      let copilotName = document.getElementById("copilotName");
      let fuelLevel = document.getElementById("fuelLevel");
      let cargoMass = document.getElementById("cargoMass");
      let fuelStatus = document.getElementById("fuelStatus");
      let cargoStatus = document.getElementById("cargoStatus");

      if (pilotName.value.length == 0){
         integrityCheck[0] = 1;  
      }
      if (copilotName.value.length == 0){
         integrityCheck[1] = 1;
      }
      if (fuelLevel.value.length == 0){
         integrityCheck[2] = 1;
      } else if (isNaN(fuelLevel.value)){
         integrityCheck[2] = 10;
      }
      if (cargoMass.value.length == 0){
         integrityCheck[3] = 1;
      } else if (isNaN(cargoMass.value)){
         integrityCheck[2] = 100;
      }

      // Create a sum of all the values in integrityCheck
      let integritySum = integrityCheck.reduce(function(a, b){
         return a + b;
      },0);
      
      if (integritySum == 1){
         let missingField = fields[integrityCheck.indexOf(1)];
            alert(`Please, make sure you fill out ${missingField} before submission.`);
      } else if (integritySum > 1 && integritySum < 10) {
         alert("Multiple fields unfilled. Please, make sure you fill them out before submission.");
      } else if (integritySum == 10) {
         alert("Fuel Level requires a number. Please, enter a valid value before submission");
      } else if (integritySum > 10 && integritySum < 100){
         alert("Fuel Level requires a number, also all fields must be filled out before submission");
      } else if (integritySum == 100){
         alert("Cargo Mass requires a number. Please, enter a valid value before submission");
      } else if (integritySum > 100 && integritySum < 110){
         alert("Cargo Mass requires a number, also all fields must be filled out before submission");
      } else if (integritySum == 110) {
         alert("Fuel Level and Cargo Mass require numbers. Please, enter valid values before submission");
      } else if (integritySum > 110){
         alert("Fuel Level and Cargo Mass require numbers, also all fields must be filled out before submission");
      } else {
         // Updating shuttle requeriments
         let pilotStatus = document.getElementById("pilotStatus");
         pilotStatus.innerHTML = `Pilot ${pilotName.value} Ready`;
         let copilotStatus = document.getElementById("copilotStatus");
         copilotStatus.innerHTML = `Co-pilot ${copilotName.value} Ready`; 
         if(fuelLevel.value < 10000 || cargoMass.value > 10000){
            document.getElementById("faultyItems").style.visibility = "visible";
            document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
            document.getElementById("launchStatus").style.color = "red";
            if (fuelLevel.value < 10000){
               fuelStatus.innerHTML = "There is no enough fuel for the journey";
            }else{
               fuelStatus.innerHTML = "Fuel level high enough for launch";
            }
            if (cargoMass.value > 10000){
               cargoStatus.innerHTML = "There is too much mass for the shuttle to take off";
            }else{
               cargoStatus.innerHTML = "Cargo mass low enough for launch";
            }
            
         }else {
            document.getElementById("launchStatus").innerHTML = "Shuttle is Ready for Launch";
            document.getElementById("launchStatus").style.color = "green";
            document.getElementById("faultyItems").style.visibility = "hidden";
         }
      } 
   });

   // form.addEventListener("submit", function(event) {

   // });

   // Fetching planetary data
   let missionTarget = document.getElementById("missionTarget");
   let ol=document.createElement('ol');
   missionTarget.appendChild(ol);
   let destinationHeaders = ["name", "diameter", "star", "distance", "moons"];
   let headers = ["Name: ", "Diameter: ", "Star: ", "Distance from Earth: ", "Number of Moons: "];
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
        response.json().then(function(json) { 
           console.log(json);
            let destinationIndex = Math.floor(Math.random() * 6);
            let table = document.createElement('table');
            for (let i = 0; i < destinationHeaders.length; i++){
               let tr = document.createElement('tr');   
               let td1 = document.createElement('td');
               let td2 = document.createElement('td');
               let text1 = document.createTextNode((i+1) + ".");
               let text2 = document.createTextNode(headers[i] + json[destinationIndex][destinationHeaders[i]]);

               td1.appendChild(text1);
               td2.appendChild(text2);
               tr.appendChild(td1);
               tr.appendChild(td2);

               table.appendChild(tr);   
            }
            document.getElementById("missionTarget").appendChild(table);
            
            let img=document.createElement('img');
                missionTarget.appendChild(img);
                img.src = json[destinationIndex].image;
         });
      });

  
});