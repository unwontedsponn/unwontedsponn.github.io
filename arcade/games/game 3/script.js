const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function startGame() {
    document.getElementById('start').style.display = "none"; 
    document.getElementById('myCanvas').style.display = "block";
    // document.getElementById('end-restart').style.display = "none";    
}

function endGame() {
    document.getElementById('start').style.display = "none"; 
    document.getElementById('myCanvas').style.display = "none";
    document.getElementById('end-restart').style.display = "block";    
}

// global variables--------------------------------------------------------------------------------
let timer = 0;

let leftPressed = false;
let rightPressed = false;
let spacePressed = false;

let playerTopX = canvas.width / 2;
let playerTopY = canvas.height - 30;
let playerLeftX = playerTopX - 25;
let playerLeftY = playerTopY + 25;
let playerRightX = playerTopX + 25;
let playerRightY = playerTopY + 25;

let bulletX = playerTopX;
let bulletY = playerTopY - 5;
const bulletRadius = 3;
let dy = 5;
let bullets = [];

// let dx = Math.round(Math.random()) * 6 - 3;

const opponentX = canvas.width - 15;
let opponentY = 275;
const opponentWidth = 10;
const opponentHeight = 60;

// SFX--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// const music = new Audio("./sfx/music.mp3");
// const goal = new Audio("./sfx/goal.mp3");
// const paddleHit = new Audio("./sfx/paddle-hit.mp3");
// const sideBounce = new Audio("./sfx/side-bounce.mp3");
// jumpSFX.volume = 0.1;        

// create player--------------------------------------------------------------------------------------------------
function drawPlayer() {
ctx.beginPath();
ctx.moveTo(playerTopX, playerTopY);
ctx.lineTo(playerLeftX, playerLeftY);
ctx.lineTo(playerRightX, playerRightY);
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath();
}

// create opponent--------------------------------------------------------------------------------------------------
// function drawOpponent() {
//  ctx.beginPath();
//     ctx.rect(opponentX, opponentY, opponentWidth, opponentHeight);
//     ctx.fillStyle = "black";
//     ctx.fill();
//     ctx.closePath();
// }

// Create bullet------------------------------------------------------------------------------------------------        
class Bullet {
constructor() {
    this.x = bulletX;
    this.y = bulletY;
    this.radius = bulletRadius;
}

draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = "purple";
    ctx.fill();
    ctx.closePath();
}
};

// function drawBullet() {
//     ctx.beginPath();
//     ctx.arc(bulletX, bulletY, bulletRadius, 0, Math.PI*2);
//     ctx.fillStyle = "purple";
//     ctx.fill();
//     ctx.closePath();
// }

function shootBullet() {
for (let i = 0; i < bullets.length; i++) {
    bullets[i].draw();
}
if (bullets.length == 0) {
    bullets.push(new Bullet());
}
if (spacePressed) {        
    bullets[0].bulletY -= dy;
}
}

// setInterval(timeCycle, 50);
// rateOfFire = 5;
// shootCoolDown = 0;
// function timeCycle() {
//     if (shootPressed === true) {
//         if(shootCoolDown === 0){
//             shootCoolDown = rateOfFire;
//             shoot();
//         } 
//     }
//     if (shootCoolDown > 0){
//         shootCoolDown --;
//     }
// }

// collission detection function NOT USED ATM----------------------------------------------------------------------------------------
function collisionDetectionRects(rect1, rect2) {
if ( !(rect1.x > rect2.x + rect2.width || rect1.x + rect1.width < rect2.x || rect1.y > rect2.y + rect2.height || rect1.y + rect1.height < rect2.y) ) {
    return true;
}
}

// Make player move with the arrow keys-----------------------------------------------------------------------------------
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
}    
else if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
}
else if(e.key == " ") {
    spacePressed = true;
}
}

function keyUpHandler(e) {
if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
}
else if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
}
else if(e.key == " ") {
    spacePressed = false;
}
}

// Draw the game onto the canvas------------------------------------------------------------------------------------------------------------------------------------------------
function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
drawPlayer();
// drawBullet();
shootBullet();
// drawOpponent();

// Player movement
if(leftPressed) {
    playerTopX -= 10;
    playerLeftX -= 10;
    playerRightX -= 10;
} else if(rightPressed) {
    playerTopX += 10; 
    playerLeftX += 10;
    playerRightX += 10;       
}

// Allow player to go through the east and west walls
if(playerTopX < 0 && playerLeftX < 0 && playerRightX < 0) {
    playerTopX = canvas.width - 25;
    playerLeftX = canvas.width - 50;
    playerRightX = canvas.width;
} else if(playerTopX > canvas.width && playerLeftX > canvas.width && playerRightX > canvas.width) {
    playerTopX = 25;
    playerLeftX = 0;
    playerRightX = 50;
}

// // Move the opponent
// if(upPressed) {
//  opponentY -=10;     
// } else if(downPressed) {
//  opponentY += 10;
// }

// // Stop opponent going through the north and south walls
// if(opponentY < 0) {
//     opponentY = 0;
// }
// if(opponentY > canvas.height - opponentHeight) {
//     opponentY = canvas.height - opponentHeight;
// }

// // Make player go through the north and south walls
// if(playerY < 0) {
//     playerY = canvas.height;
// }
// if(playerY > canvas.height) {
//     playerY = 0;
// }

// Move the ball
// if(bulletY + dy > canvas.width - bulletRadius || bulletY + dy < bulletRadius) {
//  sideBounce.play();
//  dy = -dy;       
// }    
// else if(bulletX + dx < 15 + bulletRadius) {
//     if(bulletY > playerY && bulletY < playerY + playerHeight) {
//         paddleHit.play();
//         dx = -dx;           
//     } else {
//         goal.play();
//         music.pause();
//         alert("GAME OVER");
//         document.location.reload();
//         clearInterval(interval); // Needed for Chrome to end game
//     }
// } else if(bulletX + dx > opponentX) {
//     if(bulletY > opponentY && bulletY < opponentY + opponentHeight) {
//         paddleHit.play();
//         dx = -dx;            
//     } else {
//      goal.play();
//      music.pause();
//      alert("GAME OVER");
//         document.location.reload();
//         clearInterval(interval); // Needed for Chrome to end game
//     }
// }

// document.getElementById('count').innerHTML = Math.floor(timer++ / 50);
}

var interval = setInterval(draw, 10);    

// music.play();