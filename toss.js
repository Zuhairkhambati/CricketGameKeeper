const team1Name = localStorage.getItem("team1Name");
const team2Name = localStorage.getItem("team2Name");

const tossResult = document.getElementById("toss-result");
const tossButton = document.getElementById("toss-button");
const startMatchButton = document.getElementById("start-match-button");

function startToss() {
    tossResult.classList.add("spin");
    tossButton.disabled = true;

    setTimeout(() => {
        tossResult.classList.remove("spin");

        const battingFirst = Math.random() < 0.5 ? team1Name : team2Name;
        const bowlingFirst = battingFirst === team1Name ? team2Name : team1Name;

        tossResult.innerText = `${battingFirst} will bat first!`;

        localStorage.setItem("battingTeam", battingFirst);
        localStorage.setItem("bowlingTeam", bowlingFirst);

        startMatchButton.style.display = "inline";
    }, 2000); 
}

function startMatch() {
    window.location.href = "cricket1.html";
}
