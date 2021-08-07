const gameBoard = document.querySelector("#game-board");
const player = document.querySelector("#player");
let lives = 3;
let points = 0;

document.addEventListener("keydown", (e) => {
  let yPos = parseInt(
    window.getComputedStyle(player).getPropertyValue("grid-row-start")
  );
  let xPos = parseInt(
    window.getComputedStyle(player).getPropertyValue("grid-column-start")
  );
  switch (e.key) {
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
      let projectile = document.createElement("div");
      let projectileList = [
        {
          class: "mouse"
        },
        {
          class: "keyboard"
        },
        {
          class: "computer"
        },
        {
          class: "coffee"
        }
      ]
      currentProjectile = projectileList[Math.floor(Math.random() * (projectileList.length))];
      projectile.classList.add(currentProjectile.class);
      projectile.style.gridRowStart = yPos;
      projectile.style.gridColumnStart = xPos;
      gameBoard.appendChild(projectile);

      let moveProjectile = setInterval(() => {
        let projectiles = document.getElementsByClassName(currentProjectile.class);
        if (projectiles !== undefined) {
          for (let i = 0; i < projectiles.length; i++) {
            let projectile = projectiles[i];
            let yPos = parseInt(
              window
                .getComputedStyle(projectile)
                .getPropertyValue("grid-row-start")
            );
            projectile.style.gridRowStart = yPos - 1;
            if (yPos <= 1) {
              projectile.remove();
              clearInterval(moveProjectile);
            }
            let enemies = document.getElementsByClassName("enemy");
            for (let j = 0; j < enemies.length; j++) {
              let enemy = enemies[j];
              if (enemy != undefined) {
                //Condition to check whether the enemy and the projectile are at the same position..!
                //If so,then we have to destroy that enemy
                if (projectile.style.gridRowStart === enemy.style.gridRowStart 
                  && projectile.style.gridColumnStart === enemy.style.gridColumnStart ) {
                  // remove on life of the enemy and remove projectile
                  enemy.dataset.life = enemy.dataset["life"] - 1;
                  projectile.parentElement.removeChild(projectile);
                  // check if enemy has any life left, if zero remove enemy
                  if(enemy.dataset["life"] == 0){
                      enemy.parentElement.removeChild(enemy); 
                  }
                  points += 1;
                  console.log(points);
                  //Scoreboard
                  // document.getElementById("points").innerHTML =
                  //   parseInt(document.getElementById("points").innerHTML) + 1;
                }
              }
            }
          }
        }
      }, 450);
      break;
  }
});

let generateEnemies = setInterval(() => {
  let enemy = document.createElement("div");
  let enemyList = [
    {
      class: "manager",
      defense: 5
    },
    {
      class: "enemy",
      defense: 3
    },
    {
      class: "hr",
      defense: 10
    }
  ]
  currentEnemy = enemyList[Math.floor(Math.random() * (enemyList.length))];
  enemy.classList.add(currentEnemy.class);
  //defining the life of the enemy
  enemy.dataset.life = 2;
  let xPos = parseInt(
    window.getComputedStyle(enemy).getPropertyValue("grid-column-start")
  );
  let yPos = parseInt(
    window.getComputedStyle(enemy).getPropertyValue("grid-row-start")
  );
  // enemy.style.gridColumnStart = Math.floor(Math.random() * 12);  
  enemy.style.gridColumnStart = Math.max(1, Math.floor(Math.random() * 12));
  enemy.style.gridRowStart = 1;
  gameBoard.appendChild(enemy);
}, 2500);

let moveEnemies = setInterval(() => {
  let enemies = document.getElementsByClassName("enemy");
  if (enemies !== undefined) {
    for (let i = 0; i < enemies.length; i++) {
      let enemy = enemies[i];
      let yPos = parseInt(
        window.getComputedStyle(enemy).getPropertyValue("grid-row-start")
      );
      if (yPos >= 13) {
        if (lives < 1) {
          alert("Game Over");
          clearInterval(moveEnemies);
        } else {
          lives -= 1;
          enemy.remove();
          alert('lives left: ' + lives);
        }
      }
      enemy.style.gridRowStart = yPos + 1;
    }
  }
}, 1000);
