const gameBoard = document.querySelector("#game-board");
const player = document.querySelector("#player");
let lives = 3;
let points = 0;
let level = 1;
let projectileList = [
  { class: "mouse" }, 
  { class: "keyboard" }, 
  { class: "computer" }, 
  { class: "coffee" }
]
let enemyList = [
  { class: "manager", life: 2 },
  { class: "hr", life: 3 },
  { class: "ceo", life: 5 }
]


let generateEnemies = setInterval(() => {
  let enemy = document.createElement("div");
  currentEnemy = enemyList[Math.floor(Math.random() * enemyList.length)];
  enemy.classList.add(currentEnemy.class);
  enemy.classList.add("enemy");
  //defining the life of the enemy
  enemy.dataset.life = currentEnemy.life;
  let xPos = parseInt(
    window.getComputedStyle(enemy).getPropertyValue("grid-column-start")
  );
  let yPos = parseInt(
    window.getComputedStyle(enemy).getPropertyValue("grid-row-start")
  );
  enemy.style.gridColumnStart = Math.floor(Math.max(1,Math.random() * 13));
  enemy.style.gridRowStart = 1;
  gameBoard.appendChild(enemy);
}, 2000/level);


let moveEnemies = setInterval(() => {
  let enemies = document.getElementsByClassName("enemy");
  if (enemies !== undefined) {
    for (let i = 0; i < enemies.length; i++) {
      let enemy = enemies[i];
      let yPos = parseInt(
        window.getComputedStyle(enemy).getPropertyValue("grid-row-start")
      );
      if (yPos > 12) {
        // if (lives < 1) {
        //   // alert("Game Over");
        //   // clearInterval(moveEnemies);
        // } else {
        //   lives -= 1;
        enemy.remove();
        // alert("lives left: " + lives);
        // }
      }
      enemy.style.gridRowStart = yPos + 1;
    }
  }
}, 1000);


let moveProjectiles = setInterval(() => {
  let projectiles = document.getElementsByClassName("projectile");
  if (projectiles !== undefined) {
    for (let i = 0; i < projectiles.length; i++) {
      let projectile = projectiles[i];
      let yPos = parseInt(
        window.getComputedStyle(projectile).getPropertyValue("grid-row-start")
      );
      console.log(projectile.style.gridColumnStart)
      projectile.style.gridRowStart = yPos - 1;
      if (yPos <= 1) {
        projectile.remove();
      }
      let enemies = document.getElementsByClassName("enemy");
      for (let j = 0; j < enemies.length; j++) {
        let enemy = enemies[j];
        if (enemy != undefined) {
          //Condition to check whether the enemy and the projectile are at the same position..!
          //If so,then we have to destroy that enemy
          if (
            projectile.style.gridRowStart === enemy.style.gridRowStart &&
            projectile.style.gridColumnStart === enemy.style.gridColumnStart
          ) {
            // remove on life of the enemy and remove projectile
            enemy.dataset.life = enemy.dataset["life"] - 1;
            projectile.parentElement.removeChild(projectile);
            // check if enemy has any life left, if zero remove enemy
            if (enemy.dataset["life"] == 0) {
              enemy.parentElement.removeChild(enemy);
            }
            points += 1;
            //Scoreboard
            // document.getElementById("points").innerHTML =
            //   parseInt(document.getElementById("points").innerHTML) + 1;
          }
        }
      }
    }
  }
}, 50);


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
      generateProjectile(xPos, yPos);
      break;
  }
});


generateProjectile = (xPos, yPos) => {
  let projectile = document.createElement("div");
  currentProjectile = projectileList[Math.floor(Math.random() * projectileList.length)];
  projectile.classList.add(currentProjectile.class);
  projectile.classList.add("projectile");
  projectile.style.gridRowStart = yPos;
  projectile.style.gridColumnStart = xPos;
  gameBoard.appendChild(projectile);
}
