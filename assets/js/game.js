// class Game {
//     constructor() {
//         this.currentTime = 0;
//         this.previousTime = 0;
//         this.player = new Player("player", 2, 2, 6, 11, 25);
//         this.gameBoard = document.querySelector('#game-board');
//         window.requestAnimationFrame((time)=>this.gameLoop(time));
//     }

//     gameLoop(time) {
//         window.requestAnimationFrame((time)=>this.gameLoop(time));
//         let timeDelta = this.startFrame(time) / 1000;
//         if (timeDelta < 1 / this.player.speed) return;
//         this.previousTime = this.currentTime;
//         this.draw();
//     }

//     startFrame(time) {
//         this.currentTime = time - this.previousTime;
//         return this.currentTime;
//     }

//     draw() {
//         this.gameBoard.innerHTML = '';
//         this.player.draw(this.gameBoard);
//     }

//     movePlayer(event) {
//         switch(event.key) {
//             case 'ArrowLeft':
//                 this.player.moveLeft();
//                 break;
//             case 'ArrowRight':
//                 this.player.moveRight();
//                 break;
//         }
//     }
// }

const gameBoard = document.querySelector('#game-board');
const player = new Player("player", 2, 2, 6, 11, 6, 3);
const enemy = new Enemy("player", 1, 1, 0, 0, 6, 3);
const mouse = new Projectile("mouse", 1, 1, player.xPos, player.yPos, 3, 50);
let previousTime = 0;
let currentTime = 0;
let newShoot = false;

function gameLoop(currentTime) {
    window.requestAnimationFrame(gameLoop);
    const timeDelta = (currentTime - previousTime) / 1000;
    if (timeDelta < 1 / player.speed) return;
    previousTime = currentTime;
    draw();
}

window.requestAnimationFrame(gameLoop);
document.addEventListener('keydown', movePlayer, true);
// document.addEventListener('keydown', shootProjectile, true);

function draw() {
    gameBoard.innerHTML = '';
    player.draw(gameBoard);
    enemy.draw(gameBoard);
    enemy.fall();
    if (newShoot) {
        mouse.draw(gameBoard);
        mouse.shoot();
    }
}

function movePlayer(event) {
    switch(event.key) {
        case 'ArrowLeft':
            player.moveLeft();
            break;
        case 'ArrowRight':
            player.moveRight();
            break;
        case 'ArrowUp':
            player.moveUp();
            break;
        case 'ArrowDown':
            player.moveDown();
            break;
        case ' ':
            player.shootMovement();
            newShoot = true;
            break;
    }
}

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
