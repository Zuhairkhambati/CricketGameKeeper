function saveGameState() {
    localStorage.setItem("teams", JSON.stringify(teams));
    localStorage.setItem("currentScore", currentScore);
    localStorage.setItem("wickets", wickets);
  }
  
  function loadGameState() {
    if (localStorage.getItem("teams")) {
      teams = JSON.parse(localStorage.getItem("teams"));
      currentScore = parseInt(localStorage.getItem("currentScore"));
      wickets = parseInt(localStorage.getItem("wickets"));
    }
    updateLiveScoreboard();
  }
  
  // Call saveGameState periodically or when game updates
  saveGameState();
  
  // Call loadGameState to restore saved state
  loadGameState();
  