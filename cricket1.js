let ballCount = 0;
let currentOverScore = 0;
let currentScore = 0;
let currentOver = 1;
let totalScore = 0;
let wickets = 0;
let overScores = [];
let currentTeam = 1; // Start with Team 1 batting
let teamScores = [[], []];
let selectedBatsman = "";
let selectedBowler = "";
let matchStats = {
    team1: { runsPerOver: [], wickets: [] },
    team2: { runsPerOver: [], wickets: [] }
};

// Retrieve team names and player lists from localStorage
const team1Name = localStorage.getItem("team1Name");
const team2Name = localStorage.getItem("team2Name");
const team1Players = JSON.parse(localStorage.getItem("team1Players"));
const team2Players = JSON.parse(localStorage.getItem("team2Players"));
const numPlayersTeam1 = parseInt(localStorage.getItem("numPlayersTeam1"));
const numPlayersTeam2 = parseInt(localStorage.getItem("numPlayersTeam2"));

// Get the maximum number of wickets for the current batting team
function getMaxWickets() {
    return currentTeam === 1 ? numPlayersTeam1 : numPlayersTeam2;
}

// Function to handle scoring for each ball
function addBall(type) {
    const maxWickets = getMaxWickets();

    // Check if batsman and bowler are selected
    if (!selectedBatsman || !selectedBowler) {
        alert("Please select both a batsman and a bowler before scoring.");
        return; // Exit the function if not selected
    }

    if (wickets < maxWickets && ballCount < 6) {
        const ballsContainer = document.getElementById("balls-container");
        const ball = document.createElement("div");
        ball.classList.add("ball");
        ball.innerText = type === "dot" ? "." : type;
        ballsContainer.appendChild(ball);
        ballCount++;

        if (type !== "dot") {
            if (type !== "wicket") {
                const runs = parseInt(type);
                currentOverScore += runs;
                currentScore += runs;
            } else {
                addWicket();
                if (wickets === maxWickets) {
                    endOver();
                    return;
                }
            }
        }

        if (ballCount === 6) {
            endOver();
        }

        updateTeamScore();
        displayCurrentScore();
    }
}


// Function to handle extra runs for wide and no balls
function addExtraBall(type) {
    // Check if batsman and bowler are selected
    if (!selectedBatsman || !selectedBowler) {
        alert("Please select both a batsman and a bowler before scoring.");
        return; // Exit the function if not selected
    }

    if (wickets < getMaxWickets()) {
        const ballsContainer = document.getElementById("balls-container");
        const ball = document.createElement("div");
        ball.classList.add("ball");
        ball.innerText = type === "wide" ? "WD1" : "NB1";
        currentOverScore += 1;
        currentScore += 1;
        ballsContainer.appendChild(ball);

        updateTeamScore();
        displayCurrentScore();
    }
}


// Function to display the current score
function displayCurrentScore() {
    const currentScoreElement = document.getElementById("current-score");
    currentScoreElement.innerText = `Current Score: ${currentScore} Runs, ${wickets} Wickets`;
}

// Update the cumulative score for each team
function updateTeamScore() {
    const team1Score = teamScores[0].reduce((total, score) => total + score, 0);
    const team2Score = teamScores[1].reduce((total, score) => total + score, 0);

    if (currentTeam === 2 && team2Score > team1Score) {
        declareWinner(2, 10 - wickets, "wickets");
    }
}

// Function to handle the end of an over
function endOver() {
    overScores.push(currentOverScore);
    teamScores[currentTeam - 1].push(currentOverScore);
    matchStats[`team${currentTeam}`].runsPerOver.push(currentOverScore);
    totalScore += currentOverScore;

    updateLocalStorage();

    const cumulativeScoreDisplay = document.getElementById("cumulative-score");
    const overScoreElement = document.createElement("div");
    overScoreElement.innerText = `Team ${currentTeam}, Over ${currentOver}: ${currentOverScore} runs`;
    cumulativeScoreDisplay.appendChild(overScoreElement);

    currentOver++;
    ballCount = 0;
    currentOverScore = 0;

    displayCurrentScore();

    if (currentOver > 20 || wickets === getMaxWickets()) {
        endInnings();
    } else {
        showNewOverButton();
        disableScoringButtons();
        document.getElementById("select-bowler-button").disabled = false; // Enable bowler selection at the end of each over
    }
}

// Function to manage the end of an innings
function endInnings() {
    if (currentTeam === 1) {
        currentTeam = 2; // Switch to Team 2 batting
        resetForNextTeam();
    } else {
        declareWinner();
    }
}

// Reset for the next team’s innings
function resetForNextTeam() {
    overScores = [];
    totalScore = 0;
    wickets = 0;
    currentOver = 1;
    ballCount = 0;
    currentOverScore = 0;
    currentScore = 0;

    const ballsContainer = document.getElementById("balls-container");
    ballsContainer.innerHTML = "";

    const cumulativeScoreDisplay = document.getElementById("cumulative-score");
    cumulativeScoreDisplay.innerHTML = "";

    const scoreDisplay = document.getElementById("score-display");
    scoreDisplay.innerText = `Team ${currentTeam} starts their innings`;

    enableScoringButtons();
}

// Function to declare the winner
function declareWinner() {
    const team1Score = teamScores[0].reduce((total, score) => total + score, 0);
    const team2Score = teamScores[1].reduce((total, score) => total + score, 0);
    const scoreDisplay = document.getElementById("score-display");

    let winnerText;
    if (team1Score > team2Score) {
        winnerText = `Team 1 wins by ${team1Score - team2Score} runs!`;
    } else if (team2Score > team1Score) {
        winnerText = `Team 2 wins by ${10 - wickets} wickets!`;
    } else {
        winnerText = `The match is a tie!`;
    }

    scoreDisplay.innerText = `Match complete! ${winnerText}`;
    disableScoringButtons();

    setTimeout(() => {
        localStorage.clear();
    }, 5000);
}

// Function to add a wicket and enable Select Batsman button
function addWicket() {
    if (!selectedBatsman || !selectedBowler) {
        alert("Please select both a batsman and a bowler before recording a wicket.");
        return; // Exit the function if not selected
    }

    matchStats[`team${currentTeam}`].wickets.push({ batsman: selectedBatsman, bowler: selectedBowler });
    selectedBatsman = ""; // Reset selection
    document.getElementById("select-batsman-button").disabled = false; // Enable batsman selection
    wickets++;
}


// Function to open and populate the Batsman Modal
function openBatsmanModal() {
    const batsmanList = document.getElementById("batsman-list");
    batsmanList.innerHTML = "";
    const players = currentTeam === 1 ? team1Players : team2Players;
    players.forEach(player => {
        const btn = document.createElement("button");
        btn.innerText = player;
        btn.onclick = () => selectBatsman(player);
        batsmanList.appendChild(btn);
    });
    document.getElementById("batsman-modal").style.display = "block";
}

function selectBatsman(player) {
    selectedBatsman = player;
    closeBatsmanModal();
    document.getElementById("select-batsman-button").disabled = true;
}

// Close Batsman Modal
function closeBatsmanModal() {
    document.getElementById("batsman-modal").style.display = "none";
}

// Function to open and populate the Bowler Modal
function openBowlerModal() {
    const bowlerList = document.getElementById("bowler-list");
    bowlerList.innerHTML = "";
    const players = currentTeam === 1 ? team2Players : team1Players;
    players.forEach(player => {
        const btn = document.createElement("button");
        btn.innerText = player;
        btn.onclick = () => selectBowler(player);
        bowlerList.appendChild(btn);
    });
    document.getElementById("bowler-modal").style.display = "block";
}

function selectBowler(player) {
    selectedBowler = player;
    closeBowlerModal();
    document.getElementById("select-bowler-button").disabled = true;
}

// Close Bowler Modal
function closeBowlerModal() {
    document.getElementById("bowler-modal").style.display = "none";
}

// Function to open Stats Modal
function openStatsModal() {
    const statsContent = document.getElementById("stats-content");
    statsContent.innerHTML = "<h3>Match Stats</h3>";
    statsContent.innerHTML += generateStats();
    document.getElementById("stats-modal").style.display = "block";
}

// Generate match stats
function generateStats() {
    let statsHTML = `<h4>${team1Name}</h4>`;
    statsHTML += `<p>Runs per Over: ${matchStats.team1.runsPerOver.join(", ")}</p>`;
    statsHTML += `<p>Wickets: ${matchStats.team1.wickets.map(w => `${w.batsman} by ${w.bowler}`).join(", ")}</p>`;

    statsHTML += `<h4>${team2Name}</h4>`;
    statsHTML += currentTeam === 2 ? 
        `<p>Not batted yet</p>` : 
        `<p>Runs per Over: ${matchStats.team2.runsPerOver.join(", ")}</p><p>Wickets: ${matchStats.team2.wickets.map(w => `${w.batsman} by ${w.bowler}`).join(", ")}</p>`;
    return statsHTML;
}

// Close Stats Modal
function closeStatsModal() {
    document.getElementById("stats-modal").style.display = "none";
}

// Enable and Disable Scoring Buttons
function disableScoringButtons() {
    document.querySelectorAll(".scoring-button").forEach(button => {
        button.disabled = true;
    });
}

function enableScoringButtons() {
    document.querySelectorAll(".scoring-button").forEach(button => {
        button.disabled = false;
    });
}

// Function to show the "New Over" button
function showNewOverButton() {
    const existingButton = document.getElementById("new-over-button");
    if (existingButton) existingButton.remove();

    const newOverButton = document.createElement("button");
    newOverButton.id = "new-over-button";
    newOverButton.innerText = "New Over";
    newOverButton.onclick = resetOver;
    document.querySelector(".buttons-container").appendChild(newOverButton);
}

// Function to reset the over
function resetOver() {
    const ballsContainer = document.getElementById("balls-container");
    ballsContainer.innerHTML = "";

    const newOverButton = document.getElementById("new-over-button");
    if (newOverButton) newOverButton.remove();

    enableScoringButtons();
}

// Function to update scores in localStorage
function updateLocalStorage() {
    localStorage.setItem("teamScores", JSON.stringify(teamScores));
}

// Add event listeners for scoring buttons on page load
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("button-1").classList.add("scoring-button");
    document.getElementById("button-2").classList.add("scoring-button");
    document.getElementById("button-3").classList.add("scoring-button");
    document.getElementById("button-4").classList.add("scoring-button");
    document.getElementById("button-5").classList.add("scoring-button");
    document.getElementById("button-6").classList.add("scoring-button");
    document.getElementById("button-dot").classList.add("scoring-button");
    document.getElementById("button-wicket").classList.add("scoring-button");
    document.getElementById("button-wide").classList.add("scoring-button");
    document.getElementById("button-no").classList.add("scoring-button");

    document.getElementById("button-1").onclick = () => addBall("1");
    document.getElementById("button-2").onclick = () => addBall("2");
    document.getElementById("button-3").onclick = () => addBall("3");
    document.getElementById("button-4").onclick = () => addBall("4");
    document.getElementById("button-5").onclick = () => addBall("5");
    document.getElementById("button-6").onclick = () => addBall("6");
    document.getElementById("button-dot").onclick = () => addBall("dot");
    document.getElementById("button-wicket").onclick = () => addBall("wicket");
    document.getElementById("button-wide").onclick = () => addExtraBall("wide");
    document.getElementById("button-no").onclick = () => addExtraBall("no");
});
