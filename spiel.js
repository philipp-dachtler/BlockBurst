const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GRID_SIZE = 10;
const CELL_SIZE = 30;

canvas.width = GRID_SIZE * CELL_SIZE;
canvas.height = GRID_SIZE * CELL_SIZE;

let grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));

// Verfügbare Steine
const shapes = [
  [[1]],           // Single
  [[1,1]],        // Linie 2
  [[1,1],[1,0]]    // L-Block
];
let selectedShapeIndex = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gitter
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      ctx.fillStyle = grid[y][x] ? "#ff8c00" : "#555";
      ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
    }
  }
}

function canPlace(x, y, shape) {
  for (let dy = 0; dy < shape.length; dy++) {
    for (let dx = 0; dx < shape[dy].length; dx++) {
      if (shape[dy][dx] && (
        y + dy >= GRID_SIZE || 
        x + dx >= GRID_SIZE || 
        grid[y + dy][x + dx])) {
        return false;
      }
    }
  }
  return true;
}

function placeShape(x, y, shape) {
  for (let dy = 0; dy < shape.length; dy++) {
    for (let dx = 0; dx < shape[dy].length; dx++) {
      if (shape[dy][dx]) {
        grid[y + dy][x + dx] = 1;
      }
    }
  }
  clearLines();
}

function clearLines() {
  // Vollständige Reihen
  for (let y = 0; y < GRID_SIZE; y++) {
    if (grid[y].every((v) => v === 1)) {
      grid[y] = Array(GRID_SIZE).fill(0);
    }
  }
  // Vollständige Spalten
  for (let x = 0; x < GRID_SIZE; x++) {
    if (grid.every((row) => row[x] === 1)) {
      for (let y = 0; y < GRID_SIZE; y++) {
        grid[y][x] = 0;
      }
    }
  }
}

function handleClick(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((clientX - rect.left) / CELL_SIZE);
  const y = Math.floor((clientY - rect.top) / CELL_SIZE);

  const shape = shapes[selectedShapeIndex];
  if (canPlace(x, y, shape)) {
    placeShape(x, y, shape);
    draw();
  }
}

// Event-Handler
canvas.addEventListener("click", (e) => {
  handleClick(e.clientX, e.clientY);
});

// Touch-Steuerung
canvas.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  handleClick(touch.clientX, touch.clientY);
});

// Keyboard-Steuerung für Shape-Wechsel (oder Buttons später implementieren!)
window.addEventListener("keydown", (e) => {
  if (e.key === "1") selectedShapeIndex = 0;
  if (e.key === "2") selectedShapeIndex = 1;
  if (e.key === "3") selectedShapeIndex = 2;
});

// Initiales Zeichnen
draw();

// Tipp für später: Buttons im HTML ergänzen, um shapes mobil zu wechseln.
