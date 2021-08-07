// const player = new Player("player", 2, 2, 6, 11, 6, 25);
// const enemy = new Enemy("enemy", 1, 1, 0, 0, 6, 3);
// const mouse = new Projectile("mouse", 1, 3, player.xPos + 1, player.yPos, 5, 50);
// let previousTime = 0;
// let currentTime = 0;
// let newShoot = false;

// function gameLoop(currentTime) {
//     window.requestAnimationFrame(gameLoop);
//     const timeDelta = (currentTime - previousTime) / 1000;
//     if (timeDelta < 1 / player.speed) return;
//     previousTime = currentTime;
//     let playerDiv = document.querySelector('.player');
//     let mouseDiv = document.querySelector('.mouse');
//     draw();
//     playerDiv.remove();
//     mouseDiv.remove();
// }

// window.requestAnimationFrame(gameLoop);

const gameBoard = document.querySelector("#game-board");
const player = document.querySelector("#player");

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
      if (xPos < 11) {
        player.style.gridColumnStart = xPos + 1;
      }
      break;
    case "ArrowUp":
      let projectile = document.createElement("div");
      projectile.classList.add("mouse");
      projectile.style.gridRowStart = yPos;
      // projectile.style.gridColumnStart = xPos + 1;
      projectile.style.gridColumnStart = xPos;
      gameBoard.appendChild(projectile);

      let movebullet = setInterval(() => {
        let projectiles = document.getElementsByClassName("mouse");
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
              clearInterval(movebullet);
            }
            let enemies = document.getElementsByClassName("enemy");
            for (let j = 0; j < enemies.length; j++) {
              let enemy = enemies[j];
              if (enemy != undefined) {
                // var enemybound = enemy.getBoundingClientRect();
                // var projectilebound = projectile.getBoundingClientRect();

                //Condition to check whether the enemy and the projectile are at the same position..!
                //If so,then we have to destroy that enemy

                if (
                  projectile.style.gridRowStart === enemy.style.gridRowStart &&
                  projectile.style.gridColumnStart ===
                    enemy.style.gridColumnStart
                ) {
                  // remove on life of the enemy and remove projectile
                  enemy.dataset.life = enemy.dataset["life"] - 1;
                  projectile.parentElement.removeChild(projectile);

                  // check if enemy has any life left, if zero remove enemy
                  if (enemy.dataset["life"] == 0) {
                    enemy.parentElement.removeChild(enemy);
                  }
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
  enemy.classList.add("enemy");

  //defining the life of the enemy
  enemy.dataset.life = 2;

  let xPos = parseInt(
    window.getComputedStyle(enemy).getPropertyValue("grid-column-start")
  );
  let yPos = parseInt(
    window.getComputedStyle(enemy).getPropertyValue("grid-row-start")
  );
  enemy.style.gridColumnStart = Math.floor(Math.random() * 13);
  enemy.style.gridRowStart = 1;
  gameBoard.appendChild(enemy);
}, 2000);

let moveEnemies = setInterval(() => {
  let enemies = document.getElementsByClassName("enemy");
  if (enemies !== undefined) {
    for (let i = 0; i < enemies.length; i++) {
      let enemy = enemies[i];
      let yPos = parseInt(
        window.getComputedStyle(enemy).getPropertyValue("grid-row-start")
      );
      if (yPos >= 12) {
        alert("Game Over");
        clearInterval(moveEnemies);
      }
      enemy.style.gridRowStart = yPos + 1;
    }
  }
}, 1500);

// document.addEventListener('keydown', shootProjectile, true);

// function draw() {
//     // gameBoard.innerHTML = '';
//     player.draw(gameBoard);
//     // enemy.draw(gameBoard);
//     // enemy.fall();
//     // mouse.draw(gameBoard);
//     // mouse.shoot();
// }

// function shootProjectile(event) {
//     let yPos = player.yPos;
//     let xPos = player.xPos;
//     function moveProjectile() {
//         const div = document.createElement('div');
//         div.setAttribute('class', 'mouse');
//         div.style.gridRowStart = yPos;
//         div.style.gridColumnStart = xPos + 1;
//         gameBoard.appendChild(div);
//         if (yPos > 1) {
//             yPos--;
//         } else {
//             clearInterval(moveProjectile);
//             div.remove();
//         }
//     }
//     if (event.key === ' ') {
//         setInterval(moveProjectile, 1000 / player.speed);
//     }
// }

// function dropEnemies() {
//     let yPos = 0;
//     let xPos = Math.floor(Math.random() * 12);
//     function moveEnemies() {
//         const div = document.createElement('div');
//         div.setAttribute('class', 'player');
//         div.style.gridRowStart = yPos;
//         div.style.gridColumnStart = xPos;
//         gameBoard.appendChild(div);
//         if (yPos < 12) {
//             yPos++;
//         } else {
//             clearInterval(moveProjectile);
//             div.remove();
//         }
//     }
//     setInterval(moveEnemies, 500);
// }
