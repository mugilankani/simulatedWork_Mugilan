document.addEventListener("DOMContentLoaded", function() {
    let playerScore = 0;
    let computerScore = 0;

    const choice = ["rock", "paper", "scissors"];
    const resultDiv = document.getElementById("result");
    const scoreDiv = document.getElementById("score");
    const resetButton = document.getElementById("reset");

    const rockButton = document.getElementById("rock");
    const paperButton = document.getElementById("paper");
    const scissorsButton = document.getElementById("scissors");

    const modeToggle = document.getElementById("toggle-mode");

    function playGame(playerChoice) {
        const computerChoice = choice[Math.floor(Math.random() * 3)];
        let resultMessage = `You chose <span class="highlight">${playerChoice}</span>, Computer chose <span class="highlight">${computerChoice}</span>.`;

        if (playerChoice === computerChoice) {
            resultMessage += " It's a tie!";
            resultDiv.classList.remove("winner");
        } else if (
            (playerChoice === "rock" && computerChoice == "scissors") ||
            (playerChoice == "paper" && computerChoice == "rock") ||
            (playerChoice == "scissors" && computerChoice == "paper")
        ) {
            resultMessage += " You win!";
            playerScore++;
            resultDiv.classList.add("winner");
        } else {
            resultMessage += " Computer Wins!";
            computerScore++;
            resultDiv.classList.add("winner");
        }

        updateScore();
        resultDiv.innerHTML = resultMessage;
    }

    function updateScore() {
        scoreDiv.innerHTML = `Player: ${playerScore} | Computer: ${computerScore}`;
    }

    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        updateScore();
        resultDiv.innerText = "Make your choice!";
        resultDiv.classList.remove("winner");
    }

    rockButton.addEventListener("click", () => playGame("rock"));
    paperButton.addEventListener("click", () => playGame("paper"));
    scissorsButton.addEventListener("click", () => playGame("scissors"));

    resetButton.addEventListener("click", resetGame);

    modeToggle.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            modeToggle.innerText = "🌞 Switch to Light Mode";
        } else {
            modeToggle.innerText = "🌙 Switch to Dark Mode";
        }
    });
});
