const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function startGame() {
    document.getElementById('start').style.display = "none"; 
    document.getElementById('myCanvas').style.display = "block"; 

    // global variables--------------------------------------------------------------------------------
    let timer = 0;

    let upPressed = false;
    let upPressed2 = false;
    let downPressed = false;
    let downPressed2 = false;

    const playerX = 5;
    let playerY = 275;
    const playerWidth = 10;
    const playerHeight = 60;

    const opponentX = canvas.width - 15;
    let opponentY = 275;
    const opponentWidth = 10;
    const opponentHeight = 60;

    let ballX = Math.floor(Math.random() * (550 - 50 + 1) + 50);
    let ballY = Math.floor(Math.random() * (550 - 50 + 1) + 50);
    const ballRadius = 8;
    let dx = Math.round(Math.random()) * 6 - 3;
    let dy = Math.round(Math.random()) * 6 - 3;

    // SFX--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    const music = new Audio("./sfx/music.mp3");
    const goal = new Audio("./sfx/goal.mp3");
    const paddleHit = new Audio("./sfx/paddle-hit.mp3");
    const sideBounce = new Audio("./sfx/side-bounce.mp3");

    // create player--------------------------------------------------------------------------------------------------
    function drawPlayer() {
        ctx.beginPath();
        ctx.rect(playerX, playerY, playerWidth, playerHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    // create opponent--------------------------------------------------------------------------------------------------
    function drawOpponent() {
        ctx.beginPath();
        ctx.rect(opponentX, opponentY, opponentWidth, opponentHeight);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }

    // Create ball------------------------------------------------------------------------------------------------        
    function drawBall() {
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "purple";
        ctx.fill();
        ctx.closePath();
    }

    // Make player move with the arrow keys-----------------------------------------------------------------------------------
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
        if(e.key == "Up" || e.key == "ArrowUp") {
            upPressed = true;
        }
        else if(e.key == "w") {
            upPressed2 = true;
        }
        else if(e.key == "Down" || e.key == "ArrowDown") {
            downPressed = true;
        }
        else if(e.key == "s") {
            downPressed2 = true;
        }
    }

    function keyUpHandler(e) {
        if(e.key == "Up" || e.key == "ArrowUp") {
            upPressed = false;
        }
        else if(e.key == "w") {
            upPressed2 = false;
        }
        else if(e.key == "Down" || e.key == "ArrowDown") {
            downPressed = false;
        }
        else if(e.key == "s") {
            downPressed2 = false;
        }
    }

    // Draw the game onto the canvas------------------------------------------------------------------------------------------------------------------------------------------------
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayer();
        drawBall();
        drawOpponent();

        // Move the player
        if (upPressed2) {
            playerY -=10;       
        } else if (downPressed2) {
            playerY += 10;
        }

        // Stop player going through the north and south walls
        if (playerY < 0) {
            playerY = 0;
        }
        if(playerY > canvas.height - playerHeight) {
            playerY = canvas.height - playerHeight;
        }

        // Move the opponent
        if (upPressed) {
            opponentY -=10;     
        } else if (downPressed) {
            opponentY += 10;
        }

        // Stop opponent going through the north and south walls
        if(opponentY < 0) {
            opponentY = 0;
        }
        if(opponentY > canvas.height - opponentHeight) {
            opponentY = canvas.height - opponentHeight;
        }

        // Move the ball
        if (ballY + dy > canvas.width - ballRadius || ballY + dy < ballRadius) {
            sideBounce.play();
            dy = -dy;       
        } else if (ballX + dx < 15 + ballRadius) {
            if (ballY > playerY && ballY < playerY + playerHeight) {
                paddleHit.play();
                dx = -dx;           
            } else {
                goal.play();
                music.pause();
                alert("GAME OVER");
                document.location.reload();
                clearInterval(interval); // Needed for Chrome to end game
            }
        } else if (ballX + dx > opponentX) {
            if (ballY > opponentY && ballY < opponentY + opponentHeight) {
                paddleHit.play();
                dx = -dx;            
            } else {
                goal.play();
                music.pause();
                alert("GAME OVER");
                document.location.reload();
                clearInterval(interval); // Needed for Chrome to end game
            }
        }

        ballX += dx;
        ballY += dy;

        document.getElementById('count').innerHTML = Math.floor(timer++ / 50);
    }

    const interval = setInterval(draw, 10);    
    music.play();
}