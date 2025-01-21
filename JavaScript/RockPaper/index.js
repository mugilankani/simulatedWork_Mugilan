document.addEventListener("DOMContentLoaded", function() {
    let playerScore = 0;
    let computerScore =0;

    const choice= ["rock", "paper", "scissers"];
    const resultDiv = document.getElementById("result") ;
    const scoreDiv = document.getElementById("score") ;
    const resetButton = document.getElementById("reset") ;

    function playGame(playerChoice){
        const computerChoice = choice[Math.floor(Math.random()*3)]
        let resultMessage = `You chose <span class="highlight">${playerChoice}</span>, Computer chose <span class="highlight">${computerChoice}</span>. `;

        if(playerChoice === computerChoice){
            resultMessage += "It's a tie!" ;
        }
        else if(
            (playerChoice === "rock" && computerChoice == "scissers") ||
            (playerChoice == "paper" && computerChoice == "rock") ||
            (playerChoice == "scissers" && computerChoice == "paper")
        ){
            resultMessage += "You win!" ;
            playerScore++ ;

        }
        else{
            resultMessage +="Computer Wins!" ;
            computerScore++ ;
        }

        updateScore() ;
        resultDiv.innerHTML = resultMessage ;
    }

    function updateScore(){
        scoreDiv.innerHTML = `Player: ${playerScore} | Computer: ${computerScore}`
    }

    function resetGame(){
        playerScore = 0 ;
        computerScore = 0 ;
        updateScore() ;
        resultDiv.innerText = " ";
    }

    document.getElementById("rock").addEventListener("click",()=> playGame("rock"))
    document.getElementById("paper").addEventListener("click",()=> playGame("paper"))
    document.getElementById("scisser").addEventListener("click",()=> playGame("scissers"))

    resetButton.addEventListener("click", resetGame) ;

})
