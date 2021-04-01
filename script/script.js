var membersDiv = document.querySelector("#members");

function init() {
  console.log("page loaded");
}  

function search() {
    var bandName = document.querySelector("#bandName").value;
    console.log(bandName);
    
    
    // API for getting info about an artist/band by name
    var url = encodeURI("https://wasabi.i3s.unice.fr/api/v1/artist/name/" + bandName);

    console.log(url);
    membersDiv.innerHTML = " ";
    fetch(url)
     .then(function(risposta) {
      // response is a json string,
      // convert it to a pure JavaScript object
       return risposta.json();
     })
     .then(function(complessino) {
        membersDiv.innerHTML += "<h2>Current and old members of " +complessino.name + "</h2>"
        displayMembers(complessino.members);
        console.log(complessino.members);
    
    })
     .catch(function(error) {
        console.log('Error during fetch: ' + error.message);
        membersDiv.innerHTML += "<h2>No Results</h2>"
     });
  }
 
 

function displayMembers(listOfMembers) {
          // users is a JavaScript object
        var table = document.createElement("table");
          
        listOfMembers.forEach(function(member) {
          // iterate on the array of members
          var row = table.insertRow();
          var memberNameCell = row.insertCell();
          memberNameCell.innerHTML = member.name;
          var memberRealNameCell = row.insertCell();
          memberRealNameCell.innerHTML = member.realName;
          if(member.realName == "") {
            memberRealNameCell.innerHTML += " - ";
        }

          // Show instruments played by this member
          var instrumentCell = row.insertCell();
          member.instruments.forEach(function(inst, index) {
             instrumentCell.innerHTML += inst;
             if(index !== member.instruments.length-1) {
               instrumentCell.innerHTML += ",";
             }
          });
          var activeYearsCell = row.insertCell();
          activeYearsCell.innerHTML += member.begin;
          if(member.end !== "") {
            activeYearsCell.innerHTML += " - " + member.end;
          } else {
            activeYearsCell.innerHTML += " - still active in band";
          }
          
        });
      membersDiv.appendChild(table);
}