const gameBoard = document.querySelector("#game-board");
const player = document.querySelector("#player");
const scorePoints = document.querySelector("#point-score");
const playerLives = document.querySelector("#player-lives");
const gameLevel = document.querySelector("#player-level");
const storedScore = localStorage.getItem("points");
const storedLevel = localStorage.getItem("level");
const storedLives = localStorage.getItem("lives");

const kill = new Audio("./assets/sounds/kill_enemy.wav");
const damage = new Audio("./assets/sounds/damage.wav");
const throwing = new Audio("./assets/sounds/throw_projectile.wav");
const gameSound = new Audio("./assets/sounds/soundtrack.mp3");

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

window.onload = () => {
  if (localStorage.points) {
    points = parseInt(storedScore);
  } else {
    points = 0;
  }
  if (localStorage.level) {
    level = parseInt(storedLevel);
  } else {
    level = 1;
  }
  if (localStorage.lives) {
    lives = parseInt(storedLives);
  } else {
    lives = 3;
  }
  scorePoints.innerHTML = points;
  gameLevel.innerHTML = level;
  document.getElementById('player-lives-' + lives).style.opacity = '0';
}

const saveToLocalStorage = () => {
  localStorage.setItem("points", points);
  localStorage.setItem("level", level);
  localStorage.setItem("lives", lives);
}

function generateEnemies() {
  let speed = 2000 / level;
  const generate = setTimeout(() => {
    if (!playing) {
      clearInterval(generate)
    } else {
      const enemyType = enemyList[Math.floor(Math.random() * enemyList.length)];
      const enemy = document.createElement("div");

      // set enemy component attributes
      enemy.classList.add(enemyType.class, "enemy");
      enemy.style.opacity = 1;
      enemy.dataset.life = enemyType.life;
      enemy.dataset.points = enemyType.points;

      enemy.style.gridColumnStart = Math.floor(Math.max(1, Math.random() * 13));
      enemy.style.gridRowStart = 1;

      // add to board
      gameBoard.appendChild(enemy);
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
      clearInterval(move)
    } else {
      const enemies = document.getElementsByClassName("enemy");
      if (enemies !== undefined) {
        for (let i = 0; i < enemies.length; i++) {
          const enemy = enemies[i];
          const yPos = parseInt(
            window.getComputedStyle(enemy).getPropertyValue("grid-row-start")
          );

          // check if reached bottom
          if (yPos > 12) {
            updateLife();
            enemy.remove();
          }
          enemy.style.gridRowStart = yPos + 1;
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
  playing = false;
  gameover = true;
  gameOverHandler();
  // window.location.href = "index.html";
};

const updateLife = () => {
  if (lives < 1) {
    gameOver();
  } else {
    lives -= 1;
    damage.play();
    saveToLocalStorage();
    document.getElementById('player-lives-' + lives).style.opacity = '0';
  }
};

/**
 * @param component
 * get components position on y axis
 * update Y positon moving up 1
 * Remove component if outside boundaries
 */
const updatePosY = (component) => {
  const yPos = parseInt(
    window.getComputedStyle(component).getPropertyValue("grid-row-start")
  );
  component.style.gridRowStart = yPos - 1;
  if (yPos <= 1) {
    component.remove();
  }
};

/**
 * Removes life from enemy component
 * Remove enemy if no more life left
 * Else, decrement opacity of enemy type
 * Remove projectile
 * Update score
 */
const handleCollision = (enemy, projectile) => {
  enemy.dataset.life = enemy.dataset["life"] - 1;
  if (parseInt(enemy.dataset["life"]) === 0) {
    kill.play();
    points = points + parseInt(enemy.dataset["points"]);
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
  switch (enemy.className.split(" ")[0]) {
    case "manager":
      enemy.style.opacity -= 0.3;
    case "hr":
      enemy.style.opacity -= 0.22;
    case "ceo":
      enemy.style.opacity -= 0.15;
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
      case 'Enter':
        if (firstTime) {
          startGame();
          document.querySelector('.start-message').remove();
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
    const gamePaused = document.getElementById('game-paused');
    gamePaused.classList.remove('hidden');
    playing = false;
    gameSound.pause();
  }

  if (!gameover && !playing && e.key === "r") {
    const gamePaused = document.getElementById('game-paused');
    gamePaused.classList.add('hidden');
    playing = true;
    startGame();
    gameSound.play();
  }
});


generateProjectile = (xPos, yPos) => {
  throwing.play();
  const projectile = document.createElement("div");
  currentProjectile = projectileList[Math.floor(Math.random() * projectileList.length)];
  projectile.classList.add(currentProjectile.class, "projectile");
  projectile.style.gridRowStart = yPos;
  projectile.style.gridColumnStart = xPos;
  gameBoard.appendChild(projectile);
};


// Get data and check which position the player got
// according to the level and points achieved.
// Game over info is updated with the last game played
const gameOverHandler = async () => {
  const table = await fetch(`https://office-invaders-default-rtdb.europe-west1.firebasedatabase.app/highscores.json`);
  const data = await table.json();
  const scores = Object.values(data)
  const topScores = scores.sort((a, b) => { return b.level - a.level || b.points - a.points })
  const levelReached = document.querySelector(".level-reached");
  const totalPoints = document.querySelector(".total-points");
  const finalPosition = document.querySelector(".final-position");
  const topScorerForm = document.getElementById('game-over');
  var position = 0;
  
  for (i = 0; i < topScores.length; i++) {
    if (level >= topScores[i].level && points >= topScores[i].points) {
      position = i + 1;
    }
  }
 
  levelReached.innerHTML = `Level reached: ${level}`;
  totalPoints.innerHTML = `Total points: ${points}`;
  finalPosition.innerHTML = `You got the position: ${position}`;
  topScorerForm.classList.remove('hidden');
}

// After submiting the name data is storage in a firabase database
// It calls a function to show high scores

const submitName = async () => {
  const topScorerForm = document.getElementById('game-over');
  const topScorer = document.getElementById('player-name');
  playerName = topScorer.value;

  const newRecord = {
    name: playerName,
    points: points,
    level: level
  };

  const response = await fetch('https://office-invaders-default-rtdb.europe-west1.firebasedatabase.app/highscores.json', {
    method: 'POST',
    body: JSON.stringify(newRecord),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  topScorerForm.classList.add('hidden');
  topTen();
}


// Top ten player are shown based on level and after poitns achieved
// Highscores info is updated
// This is the end of the game, the player can restart it again

const topTen = async () => {
  const table = await fetch(`https://office-invaders-default-rtdb.europe-west1.firebasedatabase.app/highscores.json`);
  const data = await table.json();
  const scores = Object.values(data)
  const leaders = scores.sort((a, b) => { return b.level - a.level || b.points - a.points })
  const topTen = document.getElementById('top-ten');
  const highScores = document.getElementById('high-scores');

  for (i = 0; i < leaders.length; i++) {
    if (i < 10) {
      const player = document.createElement('tr')
      player.innerHTML = `
        <td>${i + 1}.</td>
        <td>${leaders[i].name}</td>
        <td>${leaders[i].level}</td>
        <td>${leaders[i].points}</td>`
      topTen.appendChild(player)
    }
  }

  highScores.classList.remove('hidden')

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      highScores.classList.add('hidden')
      points = 0;
      level = 0;
      lives = 3;
      gameover = false;
      saveToLocalStorage();
      location.reload();
    }
  })
}
