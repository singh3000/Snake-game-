const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
let score = 0;
let snake = [{ x: 5, y: 5 }];
let direction = "RIGHT";
let gameInterval;
let food = randomFood();

window.addEventListener("keydown", e => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) e.preventDefault();
});

document.getElementById("startButton").addEventListener("click", () => {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameContent").style.display = "block";
  startGame();
});

document.getElementById("playAgainButton").addEventListener("click", () => {
  document.getElementById("gameOverScreen").style.display = "none";
  resetGame();
});

document.getElementById("restartButton").addEventListener("click", resetGame);

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// Touch buttons
document.getElementById("upBtn").addEventListener("click", () => {
  if (direction !== "DOWN") direction = "UP";
});
document.getElementById("downBtn").addEventListener("click", () => {
  if (direction !== "UP") direction = "DOWN";
});
document.getElementById("leftBtn").addEventListener("click", () => {
  if (direction !== "RIGHT") direction = "LEFT";
});
document.getElementById("rightBtn").addEventListener("click", () => {
  if (direction !== "LEFT") direction = "RIGHT";
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Food
  ctx.shadowColor = "red";
  ctx.shadowBlur = 10;
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * box, food.y * box, box, box);
  ctx.shadowBlur = 0;

  // Snake + face
  snake.forEach((segment, index) => {
    ctx.fillStyle = "lime";
    ctx.fillRect(segment.x * box, segment.y * box, box, box);
    if (index === 0) {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(segment.x * box + 5, segment.y * box + 5, 2, 0, Math.PI * 2);
      ctx.arc(segment.x * box + 15, segment.y * box + 5, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1.5;
      ctx.arc(segment.x * box + 10, segment.y * box + 14, 3, 0, Math.PI);
      ctx.stroke();
    }
  });

  // Movement
  let head = { ...snake[0] };
  if (direction === "UP") head.y--;
  if (direction === "DOWN") head.y++;
  if (direction === "LEFT") head.x--;
  if (direction === "RIGHT") head.x++;

  if (
    head.x < 0 || head.x >= canvas.width / box ||
    head.y < 0 || head.y >= canvas.height / box ||
    snake.some((seg, i) => i !== 0 && seg.x === head.x && seg.y === head.y)
 
