const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Retrieves the high score from storage and sets initial value to 0
let highScorePingPong = localStorage.getItem('highScorePingPong') ?? 0;
let highScore = 0;

let muteButton;

function startGame() {
    // Hide the start & restart button and show the game canvas
    document.getElementById('start').style.display = "none"; 
    document.getElementById('myCanvas').style.display = "block"; 

    // Remove the start game event listener to avoid multiple event bindings
    if (muteButton) muteButton.removeEventListener("click", startGame);

    // Revert muteButton back to it's original mute/unmute state
    muteButton = document.getElementById('muteButton');
    muteButton.textContent = "mute";
    // Add onclick function to muteButton to toggle sfx on/off
    muteButton.addEventListener("click", toggleMute);    

    // Global variables
    let timer = 0;
    let score = 0;

    let [upPressed, downPressed, upPressed2, downPressed2] = [false, false, false, false];

    const playerX = 5;
    let playerY = 275;
    const playerWidth = 10;
    const playerHeight = 80;

    const opponentX = canvas.width - 15;
    let opponentY = 275;
    const opponentWidth = 10;
    const opponentHeight = 80;

    let ballX = Math.floor(Math.random() * (550 - 50 + 1) + 50);
    let ballY = Math.floor(Math.random() * (550 - 50 + 1) + 50);
    const ballRadius = 8;
    let dx = Math.round(Math.random()) * 6 - 3;
    let dy = Math.round(Math.random()) * 6 - 3;

    const originalColour = canvas.style.backgroundColor;

    let gameRunning = true;

    // Sound effects
    const soundEffects = {
        music: new Audio("./sfx/music.mp3"),
        goal: new Audio("./sfx/goal.mp3"),
        paddleHit: new Audio("./sfx/paddle-hit.mp3"),
        sideBounce: new Audio("./sfx/side-bounce.mp3")
    };

    // Function to create the player
    function drawPlayer() {
        ctx.beginPath();
        ctx.rect(playerX, playerY, playerWidth, playerHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    // Function to create the opponent
    function drawOpponent() {
        ctx.beginPath();
        ctx.rect(opponentX, opponentY, opponentWidth, opponentHeight);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }

    // Function to create the ball
    function drawBall() {
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "purple";
        ctx.fill();
        ctx.closePath();
    }

    // Event listeners for arrow key presses
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
        if (e.key == "Up" || e.key == "ArrowUp") upPressed = true;
        else if (e.key == "w") upPressed2 = true;
        else if (e.key == "Down" || e.key == "ArrowDown") downPressed = true;
        else if (e.key == "s") downPressed2 = true;
    }

    function keyUpHandler(e) {
        if(e.key == "Up" || e.key == "ArrowUp") upPressed = false;
        else if(e.key == "w") upPressed2 = false;
        else if(e.key == "Down" || e.key == "ArrowDown") downPressed = false;
        else if(e.key == "s") downPressed2 = false;
    }

    // Function to draw the game onto the canvas
    function draw() {
        if (!gameRunning) return; // Game over, stop the animation

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayer();
        drawBall();
        drawOpponent();

        // Move the player
        if (upPressed2) playerY -=10;       
        else if (downPressed2) playerY += 10;

        // Stop player from going through the top and bottom walls
        if (playerY < 0) playerY = 0;
        if (playerY > canvas.height - playerHeight) playerY = canvas.height - playerHeight;

        // Move the opponent
        if (upPressed) opponentY -=10;     
        else if (downPressed) opponentY += 10;

        // Stop opponent going through the top and bottom walls
        if(opponentY < 0) opponentY = 0;
        if(opponentY > canvas.height - opponentHeight) opponentY = canvas.height - opponentHeight;

        // Move the ball and handle collisions with top and bottom wall
        if (ballY + dy > canvas.width - ballRadius || ballY + dy < ballRadius) {
            soundEffects.sideBounce.play();
            dy = -dy;       
        // Move the ball and handle collisions with left wall
        } else if (ballX + dx < 15 + ballRadius) {
            if (ballY > playerY && ballY < playerY + playerHeight) {
                score++;                
                soundEffects.paddleHit.play();
                dx = -dx;           
            } else {
                soundEffects.goal.play();
                // Reduce score by 1 if above 0
                if (score >=1) score--;            
                dx = -dx;
                // Change background to red
                canvas.style.backgroundColor = "lightcoral";
                // Change the background back to grey after 1 second
                setTimeout(function() {
                    canvas.style.backgroundColor = originalColour;
                }, 500);
            }
        // Move the ball and handle collisions with right wall
        } else if (ballX + dx > opponentX) {
            if (ballY > opponentY && ballY < opponentY + opponentHeight) {
                score++;            
                soundEffects.paddleHit.play();
                dx = -dx;            
            } else {
                soundEffects.goal.play();
                // Reduce score by 1 if above 0
                if (score >=1) score--;            
                dx = -dx;
                // Change background to red
                canvas.style.backgroundColor = "lightcoral";
                // Change the background back to grey after 1 second
                setTimeout(function() {
                    canvas.style.backgroundColor = originalColour;
                }, 500);
            }
        }

        ballX += dx;
        ballY += dy;

        // Update highscores each time the game ends                
        if (timer > highScorePingPong) {
            localStorage.setItem('highScorePingPong', timer);
            highScorePingPong = timer;
        }                                                       
        if (timer > highScore) highScore = timer;

        // End the game when score reaches 10 and display 'YOU WIN'
        if (score === 10) {                
            soundEffects.music.pause();
            gameRunning = false;
            ctx.font = "44px valorax";
            ctx.fillStyle = "lightcoral";
            ctx.fillText("You win! ", 160, 300);  

            // Transform the mute button into a restart button that restarts the game onclick
            let restartButton = document.getElementById('muteButton');
            restartButton.textContent = "Restart game?";
            restartButton.addEventListener("click", startGame); 
        }

        // Add score and timer to canvas
        ctx.font = "14px valorax";
        ctx.fillStyle = "black";
        ctx.fillText("Score: " + score, 10, 30);
        ctx.fillText("Time: " + formatTime(timer), 10, 50);
        ctx.fillText("High score: " + formatTime(highScore), 10, 70);
        ctx.fillText("High score all-time: " + formatTime(highScorePingPong), 10, 90);
    }

    const interval = setInterval(draw, 10);    
    soundEffects.music.play();

    // Formatting timer function
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        // Format the time with leading zeros if necessary
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
          
        return `${formattedMinutes}:${formattedSeconds}`;
    }

     // Increment timer in seconds
    setInterval(() => {
        timer++;
    }, 1000);

    // Toggle function for mute on/off
    function toggleMute() {
        // Iterate over the properties of the soundEffects object
        for (let key in soundEffects) {
            // Check if the property belongs to the soundEffects object itself and toggle the muted state of each audio element
            if (soundEffects.hasOwnProperty(key)) soundEffects[key].muted = !soundEffects[key].muted;
        }

        if (soundEffects.music.muted) muteButton.textContent = "Unmute";
        else muteButton.textContent = "Mute";
    }
}