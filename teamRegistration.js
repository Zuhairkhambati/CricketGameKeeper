let team1Players = [];
let team2Players = [];
let numPlayersTeam1 = 0;
let numPlayersTeam2 = 0;

function setupPlayerFields(team) {
    const teamPlayersDiv = document.getElementById(`${team}-players`);
    teamPlayersDiv.innerHTML = "";  

    if (team === "team1") {
        numPlayersTeam1 = parseInt(document.getElementById("team1-num-players").value);
        for (let i = 1; i <= numPlayersTeam1; i++) {
            const playerInput = document.createElement("input");
            playerInput.type = "text";
            playerInput.placeholder = `Player ${i} Name`;
            playerInput.id = `${team}-player-${i}`;
            playerInput.className = "player-input";
            teamPlayersDiv.appendChild(playerInput);
            teamPlayersDiv.appendChild(document.createElement("br"));
        }
    } else if (team === "team2") {
        numPlayersTeam2 = parseInt(document.getElementById("team2-num-players").value);
        for (let i = 1; i <= numPlayersTeam2; i++) {
            const playerInput = document.createElement("input");
            playerInput.type = "text";
            playerInput.placeholder = `Player ${i} Name`;
            playerInput.id = `${team}-player-${i}`;
            playerInput.className = "player-input";
            teamPlayersDiv.appendChild(playerInput);
            teamPlayersDiv.appendChild(document.createElement("br"));
        }
    }
}

function saveTeams() {
    const team1Name = document.getElementById("team1-name").value;
    const team2Name = document.getElementById("team2-name").value;

    team1Players = [];
    for (let i = 1; i <= numPlayersTeam1; i++) {
        const playerName = document.getElementById(`team1-player-${i}`).value;
        if (playerName) {
            team1Players.push(playerName);
        }
    }

    team2Players = [];
    for (let i = 1; i <= numPlayersTeam2; i++) {
        const playerName = document.getElementById(`team2-player-${i}`).value;
        if (playerName) {
            team2Players.push(playerName);
        }
    }

    localStorage.setItem("team1Name", team1Name);
    localStorage.setItem("team1Players", JSON.stringify(team1Players));
    localStorage.setItem("team2Name", team2Name);
    localStorage.setItem("team2Players", JSON.stringify(team2Players));
    localStorage.setItem("numPlayersTeam1", numPlayersTeam1);
    localStorage.setItem("numPlayersTeam2", numPlayersTeam2);

    alert("Teams have been saved successfully!");
}

function startTossPage() {
    saveTeams(); // Save the teams first
    window.location.href = "toss.html";
}
