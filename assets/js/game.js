/* jshint esversion: 8 */

const gameBoard = document.querySelector("#game-board");
const player = document.querySelector("#player");
const scorePoints = document.querySelector("#point-score");
const gameLevel = document.querySelector("#player-level");
const gamePaused = document.getElementById("game-paused");
const storedScore = localStorage.getItem("points");
const storedLevel = localStorage.getItem("level");
const storedLives = localStorage.getItem("lives");

const kill = new Audio("./assets/sounds/kill_enemy.wav");
const damage = new Audio("./assets/sounds/damage.wav");
const throwing = new Audio("./assets/sounds/throw_projectile.wav");
const gameSound = new Audio("./assets/sounds/soundtrack.mp3");
const gameOverSound = new Audio("./assets/sounds/game_over.mp3");
gameSound.loop = true;

let lives;
let points;
let level;
let firstTime = true;
let playing = true;
let gameover = false;
let playerName = "";

let projectileList = [
  { class: "mouse" },
  { class: "keyboard" },
  { class: "computer" },
  { class: "coffee" },
];

let enemyList = [
  { class: "manager", life: 2, points: 2 },
  { class: "hr", life: 3, points: 3 },
  { class: "ceo", life: 5, points: 5 },
];

window.addEventListener("DOMContentLoaded", (e) => {
  if (localStorage.points || localStorage.lives || localStorage.level) {
    // confirmPopup.classList.remove("hidden");
    if (
      confirm("Do you want to want to continue with your last session?") ===
      true
    ) {
      if (localStorage.points) {
        points = parseInt(storedScore);
      }
      if (localStorage.level) {
        level = parseInt(storedLevel);
      }
      if (localStorage.lives) {
        lives = parseInt(storedLives);
      }
      document.getElementById(`player-lives-${lives}`).style.opacity = "0";
    } else {
      level = 1;
      lives = 3;
      points = 0;
    }
  } else {
    level = 1;
    lives = 3;
    points = 0;
  }
  scorePoints.innerHTML = points;
  gameLevel.innerHTML = level;
});

const saveToLocalStorage = () => {
  localStorage.setItem("points", points);
  localStorage.setItem("level", level);
  localStorage.setItem("lives", lives);
};

/**
 * Called after 3/4 second
 * Create a new div element and add class to it randomly selected from enemy list
 * set style and other attributes related to the object
 * Add to gameboard markup
 */
function generateEnemies() {
  const speed = 2000 / level;
  const generate = setTimeout(() => {
    if (!playing) {
      clearTimeout(generate);
    } else {
      const newEnemy = document.createElement("div");
      const enemyType = enemyList[Math.floor(Math.random() * enemyList.length)];

      // set enemy component attributes
      newEnemy.classList.add(enemyType.class, "enemy");
      newEnemy.dataset.life = enemyType.life;
      newEnemy.dataset.points = enemyType.points;
      newEnemy.style.opacity = 1;
      newEnemy.style.gridColumnStart = Math.floor(
        Math.max(1, Math.random() * 13)
      );
      newEnemy.style.gridRowStart = 1;

      // add to board
      gameBoard.appendChild(newEnemy);
      generateEnemies();
    }
  }, speed + 750);
}

/**
 * Loops every 3/4 second
 * Gets all enemy components
 * Gets y position and moves down one
 * Remove component if outside boundaries
 */
function moveEnemies() {
  const move = setTimeout(() => {
    if (!playing) {
      clearTimeout(move);
    } else {
      const enemies = document.getElementsByClassName("enemy");
      if (enemies !== undefined) {
        for (let i = 0; i < enemies.length; i++) {
          const enemy = enemies[i];
          updatePosY(enemy);
        }
      }
      moveEnemies();
    }
  }, 750);
}

function startGame() {
  gameSound.play();
  generateEnemies();
  moveEnemies();
}

const gameOver = () => {
  gameSound.pause();
  gameOverSound.play();
  playing = false;
  gameover = true;
  gameOverHandler();
};

const updateLife = () => {
  if (lives < 1) {
    gameOver();
  } else {
    lives -= 1;
    damage.play();
    saveToLocalStorage();
    document.getElementById(`player-lives-${lives}`).style.opacity = "0";
  }
};

/**
 * @param component (projectiles)
 * get components position on y axis
 * update Y positon moving up 1
 * Remove component if outside boundaries
 */
const updatePosY = (component) => {
  const componentType = component.classList[0];
  const yPos = parseInt(
    window.getComputedStyle(component).getPropertyValue("grid-row-start")
  );
  if (
    componentType === "ceo" ||
    componentType === "manager" ||
    componentType === "hr"
  ) {
    component.style.gridRowStart = yPos + 1;
    if (yPos > 12) {
      updateLife();
      component.remove();
    }
  } else if (
    componentType === "mouse" ||
    componentType === "keyboard" ||
    componentType === "computer" ||
    componentType === "coffee"
  ) {
    component.style.gridRowStart = yPos - 1;
    if (yPos <= 1) {
      component.remove();
    }
  } else return;
};

/**
 * Removes life from enemy component
 * Remove enemy if no more life left
 * Else, decrement opacity of enemy type
 * Remove projectile
 * Update score
 */
const handleCollision = (enemy, projectile) => {
  enemy.dataset.life = enemy.dataset.life - 1;
  if (parseInt(enemy.dataset.life) === 0) {
    kill.play();
    points = points + parseInt(enemy.dataset.points);
    scorePoints.innerHTML = points;
    saveToLocalStorage();
    enemy.remove();
    // Increase game speed when points reach a treshold
    if (points > level * 50) {
      level++;
      saveToLocalStorage();
      gameLevel.innerHTML = level;
    }
  }
  switch (enemy.classList[0]) {
    case "manager":
      enemy.style.opacity -= 0.3;
      break;
    case "hr":
      enemy.style.opacity -= 0.22;
      break;
    case "ceo":
      enemy.style.opacity -= 0.15;
      break;
  }
  projectile.remove();
};

/**
 * Loops every half second
 * Gets all enemy components and projectile components
 * Loops projectiles and updates Y position
 * Check if new position collides with any enemy components
 * Calls handleCollision() if true
 */
const shootEnemies = setInterval(() => {
  const projectiles = document.getElementsByClassName("projectile");
  const enemies = document.getElementsByClassName("enemy");
  if (projectiles !== undefined) {
    for (let i = 0; i < projectiles.length; i++) {
      const projectile = projectiles[i];
      updatePosY(projectile);
      if (enemies != undefined) {
        for (let j = 0; j < enemies.length; j++) {
          const enemy = enemies[j];
          if (
            projectile.style.gridRowStart === enemy.style.gridRowStart &&
            projectile.style.gridColumnStart === enemy.style.gridColumnStart
          ) {
            handleCollision(enemy, projectile);
          }
        }
      }
    }
  }
}, 50);

document.addEventListener("keydown", (e) => {
  if (playing) {
    let yPos = parseInt(
      window.getComputedStyle(player).getPropertyValue("grid-row-start")
    );
    let xPos = parseInt(
      window.getComputedStyle(player).getPropertyValue("grid-column-start")
    );
    switch (e.key) {
      case "Enter":
        if (firstTime) {
          startGame();
          document.querySelector("#game-start").remove();
          firstTime = false;
        }
        break;
      case "ArrowLeft":
        if (xPos > 0) {
          player.style.gridColumnStart = xPos - 1;
        }
        break;
      case "ArrowRight":
        if (xPos < 13) {
          player.style.gridColumnStart = xPos + 1;
        }
        break;
      case "ArrowUp":
        generateProjectile(xPos, yPos);
        player.style.background =
          'url("./assets/images/retro_developer_shooting.png") no-repeat center center/contain';
        setTimeout(() => {
          player.style.background =
            'url("./assets/images/retro_developer.png") no-repeat center center/contain';
        }, 250);
        break;
    }
  }

  if (!gameover && e.key === " ") {
    gamePaused.classList.remove("hidden");
    playing = false;
    gameSound.pause();
  }

  if (!gameover && !playing && e.key === "r") {
    const gamePaused = document.getElementById("game-paused");
    gamePaused.classList.add("hidden");
    playing = true;
    startGame();
    gameSound.play();
  }
});

const generateProjectile = (xPos, yPos) => {
  throwing.play();
  const newProjectile = document.createElement("div");
  const projectileType =
    projectileList[Math.floor(Math.random() * projectileList.length)];
  newProjectile.classList.add(projectileType.class, "projectile");
  newProjectile.style.gridRowStart = yPos;
  newProjectile.style.gridColumnStart = xPos;
  gameBoard.appendChild(newProjectile);
};

// Get data and check which position the player got
// according to the level and points achieved.
// Game over info is updated with the last game played
const gameOverHandler = async () => {
  const table = await fetch(
    `https://office-invaders-default-rtdb.europe-west1.firebasedatabase.app/highscores.json`
  );
  const data = await table.json();
  const scores = Object.values(data);
  const topScores = scores.sort((a, b) => {
    return b.level - a.level || b.points - a.points;
  });
  const levelReached = document.querySelector(".level-reached");
  const totalPoints = document.querySelector(".total-points");
  const finalPosition = document.querySelector(".final-position");
  const topScorerForm = document.getElementById("game-over");

  // Transition
  gameBoard.style.background = "#000";
  // Remove Enemies
  const enemies = document.getElementsByClassName("enemy");
  const enemiesQty = enemies.length;
  if (enemies !== undefined) {
    for (let i = 0; i < enemiesQty; i++) {
      const enemy = enemies[0];
      enemy.remove();
    }
    player.remove();
  }

  let position = 0;
  for (let i = 0; i < topScores.length; i++) {
    if (level >= topScores[i].level && points >= topScores[i].points) {
      position = i + 1;
    }
  }

  if (position === 0) {
    position = topScores.length + 1;
  }

  levelReached.innerHTML = `Level reached: ${level}`;
  totalPoints.innerHTML = `Total points: ${points}`;
  finalPosition.innerHTML = `You got the position: ${position}`;
  topScorerForm.classList.remove("hidden");

  // setTimeout(() => {
  //   levelReached.innerHTML = `Level reached: ${level}`;
  //   totalPoints.innerHTML = `Total points: ${points}`;
  //   finalPosition.innerHTML = `You got the' position: ${position}`;
  //   topScorerForm.classList.remove("hidden");
  // }, 1000);
};

// After submiting the name data is storage in a firabase database
// It calls a function to show high scores

const submitName = async () => {
  const topScorerForm = document.getElementById("game-over");
  const topScorer = document.getElementById("player-name");
  playerName = topScorer.value;

  const newRecord = {
    name: playerName,
    points: points,
    level: level,
  };

  await fetch(
    "https://office-invaders-default-rtdb.europe-west1.firebasedatabase.app/highscores.json",
    {
      method: "POST",
      body: JSON.stringify(newRecord),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  topScorerForm.classList.add("hidden");
  topTen();
};

// Top ten player are shown based on level and after poitns achieved
// Highscores info is updated
// This is the end of the game, the player can restart it again

const topTen = async () => {
  const table = await fetch(
    `https://office-invaders-default-rtdb.europe-west1.firebasedatabase.app/highscores.json`
  );
  const data = await table.json();
  const scores = Object.values(data);
  const leaders = scores.sort((a, b) => {
    return b.level - a.level || b.points - a.points;
  });
  const topTen = document.getElementById("top-ten");
  const highScores = document.getElementById("high-scores");

  for (let i = 0; i < leaders.length; i++) {
    if (i < 10) {
      const player = document.createElement("tr");
      player.innerHTML = `
        <td>${i + 1}.</td>
        <td>${leaders[i].name}</td>
        <td>${leaders[i].level}</td>
        <td>${leaders[i].points}</td>`;
      topTen.appendChild(player);
    }
  }

  highScores.classList.remove("hidden");

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      highScores.classList.add("hidden");
      points = 0;
      level = 1;
      lives = 3;
      gameover = false;
      localStorage.clear();
      location.reload();
    }
  });
};
