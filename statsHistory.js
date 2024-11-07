function displayPlayerStats(teamName) {
    teams[teamName].forEach(player => {
      console.log(`${player.name} - Runs: ${player.runs || 0}, Balls Faced: ${player.ballsFaced || 0}`);
    });
  }
  
  function addPlayerStats(teamName, playerName, runs, balls) {
    const player = teams[teamName].find(p => p.name === playerName);
    if (player) {
      player.runs = (player.runs || 0) + runs;
      player.ballsFaced = (player.ballsFaced || 0) + balls;
    }
  }
  
  // Call these functions to display stats or update stats after each game
  addPlayerStats("team1", "Player Name", 30, 20);
  displayPlayerStats("team1");
  