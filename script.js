const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
let score = 0;
let snake = [{ x: 5, y: 5 }];
let direction = "RIGHT";
let gameInterval;
let food = {
  x: Math.floor(Math.random() * (canvas.width / box)),
  y: Math.floor(Math.random() * (canvas.height / box))
};

document.getElementById("startButton").addEventListener("click", () => {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameContent").style.display = "block";
  startGame();
});

document.getElementById("restartButton").addEventListener("click", () => {
  resetGame();
});

document.addEventListener("keydown", event => {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw food with glow
  ctx.shadowColor = "red";
  ctx.shadowBlur = 10;
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * box, food.y * box, box, box);
  ctx.shadowBlur = 0;

  // Draw snake
  ctx.fillStyle = "lime";
  snake.forEach(segment => {
    ctx.fillRect(segment.x * box, segment.y * box, box, box);
  });

  // Move snake
  let head = { ...snake[0] };
  if (direction === "UP") head.y -= 1;
  if (direction === "DOWN") head.y += 1;
  if (direction === "LEFT") head.x -= 1;
  if (direction === "RIGHT") head.x += 1;

  // Collision detection
  if (
    head.x < 0 || head.x >= canvas.width / box ||
    head.y < 0 || head.y >= canvas.height / box ||
    snake.some(seg => seg.x === head.x && seg.y === head.y)
  ) {
    clearInterval(gameInterval);
    alert("Game Over! Score: " + score);
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("scoreBoard").textContent = "Score: " + score;
    food = {
      x: Math.floor(Math.random() * (canvas.width / box)),
      y: Math.floor(Math.random() * (canvas.height / box))
    };
  } else {
    snake.pop();
  }
}

function startGame() {
  gameInterval = setInterval(draw, 100);
}

function resetGame() {
  clearInterval(gameInterval);
  score = 0;
  snake = [{ x: 5, y: 5 }];
  direction = "RIGHT";
  document.getElementById("scoreBoard").textContent = "Score: 0";
  food = {
    x: Math.floor(Math.random() * (canvas.width / box)),
    y: Math.floor(Math.random() * (canvas.height / box))
  };
  startGame();
}
