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

const player = new Player("player", 2, 2, 6, 11, 25, 3);
const gameBoard = document.querySelector('#game-board');
let previousTime = 0;
let currentTime = 0;

function gameLoop(currentTime) {
    window.requestAnimationFrame(gameLoop);
    const timeDelta = (currentTime - previousTime) / 1000;
    if (timeDelta < 1 / player.speed) return;
    previousTime = currentTime;
    draw();
}

window.requestAnimationFrame(gameLoop);
document.addEventListener('keydown', movePlayer);

function draw() {
    gameBoard.innerHTML = '';
    player.draw(gameBoard);
}

function movePlayer(event) {
    switch(event.key) {
        case 'ArrowLeft':
            player.moveLeft();
            break;
        case 'ArrowRight':
            player.moveRight();
            break;
    }
}
