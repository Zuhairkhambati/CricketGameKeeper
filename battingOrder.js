function displayBattingOrder(teamName) {
    const teamPlayers = teams[teamName];
    teamPlayers.forEach((player, index) => {
      console.log(`${index + 1}. ${player.name}`);
    });
  }
  
  function changeBattingOrder(teamName) {
    const teamPlayers = teams[teamName];
    const playerIndex = prompt("Enter the player number to change the batting order:");
    const newPosition = prompt("Enter the new position for this player:");
  
    if (playerIndex >= 1 && playerIndex <= teamPlayers.length && newPosition >= 1 && newPosition <= teamPlayers.length) {
      const [player] = teamPlayers.splice(playerIndex - 1, 1);
      teamPlayers.splice(newPosition - 1, 0, player);
    } else {
      alert("Invalid input!");
    }
    
    displayBattingOrder(teamName);
  }
  