let currentBowler = "";

function selectBowler(teamName) {
  const bowlerIndex = prompt("Select the bowler by number:");
  if (bowlerIndex >= 1 && bowlerIndex <= teams[teamName].length) {
    currentBowler = teams[teamName][bowlerIndex - 1].name;
    console.log(`Current bowler is: ${currentBowler}`);
  } else {
    alert("Invalid bowler number.");
  }
}

// Call this function to select a bowler each over
selectBowler("team2"); // Example for team2 bowler selection
