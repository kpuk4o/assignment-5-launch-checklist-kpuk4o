

window.addEventListener("load", function() {
    fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
        response.json().then( function(json) {
           const div = document.getElementById("missionTarget");
              document.getElementById("missionTarget").style.color = "gold";
              const missionDestination = Math.round(Math.random()*5);
              div.innerHTML = `
                 <h2>Mission Destination</h2>
                 <ol id="results">
                    <li>Name ${json[missionDestination].name}</li>
                    <li>Diameter ${json[missionDestination].diameter}</li>
                    <li>Star ${json[missionDestination].star}</li>
                    <li>Distance from Earth ${json[missionDestination].distance}</li>
                    <li>Number of Moons ${json[missionDestination].moons}</li>
                 </ol>
                 <img src="${json[missionDestination].image}">
              `;
           });
        });
     let form = document.querySelector("form");
     form.addEventListener("submit", function(event) {
        let pilotInput = document.querySelector("input[id=pilotName]");
        let copilotInput = document.querySelector("input[id=copilotName]");
        let fuelLevelInput = document.querySelector("input[id=fuelLevel]");
        let cargoMassInput = document.querySelector("input[id=cargoMass]");
        if ((pilotInput.value == "") || (fuelLevelInput.value == "") || (cargoMassInput.value == "") || (copilotInput.value == "")){
           alert("All fields are required!");
           event.preventDefault();
        } else if ((isNaN(pilotInput.value) === false) || (isNaN(copilotInput.value) === false)){
           alert("Names should not include numbers!");
           event.preventDefault();
        } else if ((isNaN(fuelLevelInput.value) === true) || (isNaN(cargoMassInput.value) === true)){
           alert("Fuel level & Cargo Mass should be numbers only!");
           event.preventDefault();
        }
  
        document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotInput.value} is ready for launch`;
        document.getElementById("copilotStatus").innerHTML = `Copilot ${copilotInput.value} is ready for launch`;
        if (fuelLevelInput.value <= 10000) {
           document.getElementById("faultyItems").style.visibility = "visible";
           document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
           document.getElementById("launchStatus").style.color = "red";
           document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
        } else {
           document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
        }
        if (cargoMassInput.value >= 10000) {
           document.getElementById("faultyItems").style.visibility = "visible";
           document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
           document.getElementById("launchStatus").style.color = "red";
           document.getElementById("cargoStatus").innerHTML = "Cargo mass too high for launch";
        } else {
           document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
        }
        if (cargoMassInput.value <= 10000 && fuelLevelInput.value >= 10000) {
           document.getElementById("launchStatus").innerHTML = "Shuttle Ready for Launch";
           document.getElementById("launchStatus").style.color = "green";
           document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
           document.getElementById("faultyItems").style.visibility = "hidden";
        }
        event.preventDefault();
     });
  });