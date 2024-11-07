let currentBatsmen = [teams.team1[0], teams.team1[1]];

function updateLiveScoreboard() {
  const scoreElement = document.getElementById("score-display");
  scoreElement.innerHTML = `
    Current Batsmen: ${currentBatsmen[0].name} and ${currentBatsmen[1].name} <br>
    Bowler: ${currentBowler} <br>
    Runs: ${currentScore}, Wickets: ${wickets}
  `;
}

function changeBatsman(newBatsman) {
  currentBatsmen[1] = teams.team1[newBatsman - 1];
  updateLiveScoreboard();
}
