// Functions
const clearField = () => {
    setTimeout(() => {
        playerInfo.textContent = "Let's guess!";
        playerNumber.value = "";
    }, 1500);
};

// Elements selection
const matchFinished = document.querySelector(".custom-modal");
const resetGame = document.querySelector(".reset-game");
const lastPlayerScore = document.querySelector(".last-player-score");
const highestScore = document.querySelector(".highest-score");
const secretNumber = document.querySelector(".secret-number");
const playerNumber = document.querySelector(".player-number");
const guessButton = document.querySelector(".guess-button");
const playerScore = document.querySelector(".player-score");
const playerInfo = document.querySelector(".player-info");

// Game data
let playerPoints = 20;
let randomNumber = Math.floor((Math.random() * 20) + 1);

// Guess number button
guessButton.addEventListener("click", () => {
    let inputValue = Number(playerNumber.value);
    // Score still avaible
    if(playerPoints > 1) {
        // Input between 1 and 20
        if(inputValue && inputValue > 0 && inputValue <= 20) {
            // Correct number
            if(inputValue === randomNumber) {
                playerNumber.readOnly = true;
                playerInfo.textContent = "Correct number!";
                secretNumber.textContent = randomNumber;
                document.querySelector("body").style.backgroundColor = "#06d6a0";
                lastPlayerScore.textContent = playerPoints;
                if(playerPoints > Number(highestScore.textContent)) highestScore.textContent = playerPoints;
                setTimeout(() => {matchFinished.classList.remove("no-render");}, 2000);
            // Wrong number
            } else {
                playerInfo.textContent = (inputValue > randomNumber) ? "Too high!" : "Too lower!";
                playerPoints--;
                playerScore.textContent = playerPoints;
                clearField();
            }
        // No input
        } else if(!inputValue) {
            playerInfo.textContent = "Invalid input!";
            clearField();
        // Out of range number
        } else {
            playerInfo.textContent = "Out of range number";
            clearField();
        }
    // No more score avaible
    } else {
        playerNumber.readOnly = true;
        playerPoints = 0;
        secretNumber.textContent = randomNumber;
        playerInfo.textContent = "Game lost!";
        playerScore.textContent = playerPoints;
        lastPlayerScore.textContent = playerPoints;
        setTimeout(() => {matchFinished.classList.remove("no-render");}, 2000);
    }
});

// Reset game button
resetGame.addEventListener("click", () => {
    playerNumber.value = "";
    playerNumber.readOnly = false;
    playerPoints = 20;
    secretNumber.textContent = "?";
    playerInfo.textContent = "Let's guess!";
    randomNumber = Math.floor((Math.random() * 20) + 1);
    playerScore.textContent = playerPoints;
    document.querySelector("body").style.backgroundColor = "#264653";
    matchFinished.classList.add("no-render");
});