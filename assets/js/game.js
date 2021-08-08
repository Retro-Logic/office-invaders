const gameBoard = document.querySelector("#game-board");
const player = document.querySelector("#player");
const scorePoints = document.querySelector("#point-score");
const playerLives = document.querySelector("#player-lives");
const gameLevel = document.querySelector("#player-level");

const kill = new Audio("./assets/sounds/kill_enemy.wav");
const throwing = new Audio("./assets/sounds/throw_projectile.wav");
const gameSound = new Audio("./assets/sounds/soundtrack.mp3");

let lives = 3;
let points = 0;
let level = 1;
let firstTime = true;
let playing = true;

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

const calculateLives = () => {
  const html = "♥ ";
  return html.repeat(lives);
};


scorePoints.innerHTML = points;
playerLives.innerHTML = calculateLives();
gameLevel.innerHTML = level;


function generateEnemies() {
  if (playing) {
    var speed = 2000 / level;
    setTimeout(() => {
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
    }, speed + 750);
  }
}

/**
 * Loops every 3/4 second
 * Gets all enemy components
 * Gets y position and moves down one
 * Remove component if outside boundaries
 */

function moveEnemies() {
  if (playing) {
    setTimeout(() => {
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
    },750);
  }
}

function startGame() {
  gameSound.play();
  generateEnemies();
  moveEnemies();
}

const gameOver = () => {
  alert("Game Over 👎");
  playing = false;
  topScores();
};

const updateLife = () => {
  if (lives < 1) {
    gameOver();
  } else {
    lives -= 1;
    playerLives.innerHTML = calculateLives();
    console.log(`lives left: ${lives}`);
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
    points += +enemy.dataset["points"];
    scorePoints.innerHTML = points;
    enemy.remove();

    // Increase game speed when points reach a treshold
    if (points > level * 50) {
      level++;
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
  if (e.key === " ") {
    playing = !playing;
    if (playing) {
      gameSound.play();
      generateEnemies();
      moveEnemies();
    } else {
      gameSound.pause();
    }
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


const topScores = async () => {
  const table = await fetch(`https://office-invaders-default-rtdb.europe-west1.firebasedatabase.app/highscores.json`);
  const data = await table.json();

  const scores = Object.values(data)
  const topScores = scores.sort((a, b) => { return b.points - a.points })
  console.log(topScores)
  console.log(`Player points: ${points}. Press enter to reload`)

  const newRecord = {
    name: "New Player",
    points: points,
  };

  const response = await fetch('https://office-invaders-default-rtdb.europe-west1.firebasedatabase.app/highscores.json', {
    method: 'POST',
    body: JSON.stringify(newRecord),
    headers: {
      'Content-Type': 'application/json',
    },
  }
  )

  document.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      location.reload();
    }
  })

}