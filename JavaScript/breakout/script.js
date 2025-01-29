const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const resetButton = document.querySelector("#reset");

const blockWidth = 100;
const blockHeight = 20;

const userStart = [230, 10];

const boardWidth = 560;
const boardHeight = 300;

let xDirection = -2;
let yDirection = 2;

const currentPosition = userStart;

const ballStart = [270, 40];
const ballDiameter = 20;

let ballCurrentPosition = ballStart;

let timerId;
let score = 0; // Initialize score
let blocksBroken = 0; // Track blocks broken

resetButton.addEventListener("click", resetGame);

function resetGame() {
  location.reload();
}

class block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

const blocks = [
  new block(10, 270),
  new block(120, 270),
  new block(230, 270),
  new block(340, 270),
  new block(450, 270),
  new block(10, 240),
  new block(120, 240),
  new block(230, 240),
  new block(340, 240),
  new block(450, 240),
  new block(10, 210),
  new block(120, 210),
  new block(230, 210),
  new block(340, 210),
  new block(450, 210),
];

function addBlock() {
  for (let i = 0; i < blocks.length; i++) {
    const blockElement = document.createElement("div");
    blockElement.classList.add("block");

    blockElement.style.left = `${blocks[i].bottomLeft[0]}px`;
    blockElement.style.bottom = `${blocks[i].bottomLeft[1]}px`;
    blockElement.style.width = `${blockWidth}px`;
    blockElement.style.height = `${blockHeight}px`;

    grid.appendChild(blockElement);
  }
}

addBlock();

const user = document.createElement("div");
user.classList.add("user");
user.style.left = currentPosition[0] + "px";
user.style.bottom = currentPosition[1] + "px";
grid.appendChild(user);

function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

const ball = document.createElement("div");
ball.classList.add("ball");
ball.style.left = ballCurrentPosition[0] + "px";
ball.style.bottom = ballCurrentPosition[1] + "px";

grid.appendChild(ball);

function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

// move user
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}

document.addEventListener("keydown", moveUser);

function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;

  // Increase speed after every 5 blocks broken
  if (blocksBroken % 5 === 0 && blocksBroken > 0) {
    clearInterval(timerId);
    timerId = setInterval(moveBall, 30 - Math.min(blocksBroken * 2, 15)); // Increase speed
  }

  drawBall();
  checkForCollisions();
}

timerId = setInterval(moveBall, 30);

function checkForCollisions() {
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = "Score: " + score;
      blocksBroken++; // Increment the block broken counter

      if (blocksBroken % 5 === 0) {
        console.log("Ball speed increased!");
      }

      if (blocks.length == 0) {
        scoreDisplay.innerHTML = "You Win!";
        clearInterval(timerId);
        document.removeEventListener("keydown", moveUser);
      }
    }
  }
  // check for wall hits
  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[0] <= 0
  ) {
    xDirection = -xDirection; // Change x direction
  }

  if (ballCurrentPosition[1] >= boardHeight - ballDiameter) {
    yDirection = -yDirection; // Change y direction
  }

  //check for user collision
  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + blockHeight
  ) {
    yDirection = -yDirection; // Change y direction
  }

  //game over
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    const status = document.getElementById("status");
    status.innerHTML = "Game Over";
    status.style.color = "red";

    scoreDisplay.innerHTML = "Score: " + score;
    document.removeEventListener("keydown", moveUser);
  }
}

function changeDirection() {
  yDirection = -yDirection; // Reverse y direction
}
