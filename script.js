const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
let score = 0;

// Snake and food setup
let snake = [{ x: 5, y: 5 }];
let direction = "RIGHT";
let food = {
  x: Math.floor(Math.random() * (canvas.width / box)),
  y: Math.floor(Math.random() * (canvas.height / box))
};

// Keyboard controls
document.addEventListener("keydown", event => {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// Draw functions
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * box, food.y * box, box, box);

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

  // Game Over conditions
  if (
    head.x < 0 || head.x >= canvas.width / box ||
    head.y < 0 || head.y >= canvas.height / box ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    alert("Game Over! Score: " + score);
    resetGame();
    return;
  }

  snake.unshift(head);

  // Check food collision
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * (canvas.width / box)),
      y: Math.floor(Math.random() * (canvas.height / box))
    };
  } else {
    snake.pop();
  }
}

// Restart button
document.getElementById("restartButton").addEventListener("click", () => {
  resetGame();
});

function resetGame() {
  snake = [{ x: 5, y: 5 }];
  direction = "RIGHT";
  score = 0;
  food = {
    x: Math.floor(Math.random() * (canvas.width / box)),
    y: Math.floor(Math.random() * (canvas.height / box))
  };
}

// Start the game loop
setInterval(draw, 100);
