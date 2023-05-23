const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Retrieves the high score from storage and sets initial value to 0
let highScoreSpaceRace = localStorage.getItem('highScoreSpaceRace') ?? 0;
let highScore = 0;

let muteButton;

function startGame() {
    // Hide the start button and show the game canvas
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
    let timer = 30;
    let score = 0;

    let [upPressed, downPressed, upPressed2, downPressed2] = [false, false, false, false];

    let x = 150; // Initial x-coordinate of the player
    let y = 570; // Initial y-coordinate of the player
    const playerSpeed = 3;
    const playerHeight = 60;

    const dx = Math.floor(Math.random() * 6) + 3; 
    const dx2 = Math.floor(Math.random() * 6) + 3; 
    const dx3 = Math.floor(Math.random() * 6) + 3; 
    const dx4 = Math.floor(Math.random() * 10) + 3; 

    const cellSize = 20;

    const enemies = [];
    const enemies2 = [];
    const enemies3 = [];
    const enemies4 = [];

    let frame = 0;
    const frameInterval = Math.random() < 0.5 ? 30 : 35; // Random frame interval for creating enemies (is either 30 or 35)
    const frameInterval2 = Math.random() < 0.5 ? 40 : 45; 
    const frameInterval3 = Math.random() < 0.5 ? 50 : 55; 
    const frameInterval4 = Math.random() < 0.5 ? 60 : 65; 

    const originalColour = canvas.style.backgroundColor;

    let gameRunning = true;

    // Sound effects
    const soundEffects = {
        hit: new Audio("./sfx/hit.mp3"),
        music: new Audio("./sfx/music.mp3"),
        throughWalls: new Audio("./sfx/through-walls.mp3")
    };
    soundEffects.music.volume = 0.1;  

    // Player class
    class Player {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.width = cellSize;
            this.height = cellSize;
            this.color = "#0095DD";
        }
        draw() {
            // Draw the player
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);  

            // Move the player up and down based on key presses
            if (upPressed2) player.y -= playerSpeed;
            else if (downPressed2) player.y += playerSpeed;

            // Move the player2 up and down based on key presses
            if (upPressed) player2.y -= playerSpeed;
            else if (downPressed) player2.y += playerSpeed;

            // If players reaches the top, they reappear at the bottom, & score increases by 1
            if (player.y < 0 || player2.y < 0) {
                score++;                
                soundEffects.throughWalls.play();
                if (player.y < 0) player.y = canvas.height - playerHeight;
                if (player2.y < 0) player2.y = canvas.height - playerHeight;
            }
            // Players can't go below the starting line
            if (this.y > canvas.height - playerHeight) {
                player.y = canvas.height - playerHeight;
                player2.y = canvas.height - playerHeight;
            }
            // Update highscores each time the game ends                
            if (score > highScoreSpaceRace) {
                localStorage.setItem('highScoreSpaceRace', score);
                highScoreSpaceRace = score;
            }                                                       
            if (score > highScore) highScore = score;

            // End the game when timer reaches 0 and display 'TIME OUT'
            if (timer === 0) {                                
                soundEffects.music.pause();

                gameRunning = false;
                ctx.font = "44px valorax";
                ctx.fillStyle = "lightcoral";
                ctx.fillText("Time out! ", 160, 300);

                // Transform the mute button into a restart button that restarts the game onclick
                let restartButton = document.getElementById('muteButton');
                restartButton.textContent = "Restart game?";
                restartButton.addEventListener("click", startGame);
            }   
        }       
    }

    // Create player objects
    let player = new Player(x, y);
    let player2 = new Player(x + 250, y - 30);

    // Enemy class
    class Enemy {
        constructor(y, speed, isMovingRight) {
            this.x = isMovingRight ? -15 : 605; // Randomly creates an enemy offscreen, with a 50% chance of appearing either on the left or the right side
            this.y = y;
            this.width = cellSize;
            this.height = cellSize;
            this.color = "black";
            this.speed = speed;
            this.isMovingRight = isMovingRight;
        }
        update() {
            // Update enemy position based on speed and direction
            this.x += (this.isMovingRight ? 1 : -1) * this.speed;
        }
        draw() {
            // Check for enemy collision with players
            if (collisionDetection(player, this) || collisionDetection(player2, this)) {         
                soundEffects.hit.play();
                // Reduce score by 1 if above 0
                if (score >= 1) score--;                
                // Change background to red
                canvas.style.backgroundColor = "lightcoral";
                // Change the background back to grey after 1 second
                setTimeout(function() {
                    canvas.style.backgroundColor = originalColour;
                }, 500);
                // Reset players y position back to the bottom
                if (collisionDetection(player, this)) player.y = canvas.height - playerHeight;
                if (collisionDetection(player2, this)) player2.y = canvas.height - playerHeight;
            } else {
                // Draw the enemy
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);              
            }
        }                               
    }

    // Function to create enemies and update their positions
    function createEnemies(enemiesArray, frameInterval, speed, isMovingRight) {
        enemiesArray.forEach(enemy => {
            enemy.update();
            enemy.draw();
        });
        if (frame % frameInterval === 0) {
            enemiesArray.push(new Enemy(Math.floor(Math.random() * 501), speed, isMovingRight));
        }   
    }

    // Function for collision detection
    function collisionDetection(player, enemy) {
        return !(
            player.x > enemy.x + enemy.width ||
            player.x + player.width < enemy.x || 
            player.y > enemy.y + enemy.height ||  
            player.y + player.height < enemy.y
        )
    }

    // Event listeners for key presses
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    // Function to handle key down events
    function keyDownHandler(e) {
        if (e.key == "Up" || e.key == "ArrowUp") upPressed = true;
        else if (e.key == "w") upPressed2 = true;
        else if (e.key == "Down" || e.key == "ArrowDown") downPressed = true;
        else if (e.key == "s") downPressed2 = true;
    }

    // Function to handle key up events
    function keyUpHandler(e) {
        if (e.key == "Up" || e.key == "ArrowUp") upPressed = false;
        else if (e.key == "w") upPressed2 = false;
        else if (e.key == "Down" || e.key == "ArrowDown") downPressed = false;
        else if (e.key == "s") downPressed2 = false;
    }

    // Animation function
    function animate() {
        // Check if the game is still running
        if (!gameRunning) return; // Game over, stop the animation

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        frame++;
        // Create and update enemies
        createEnemies(enemies, frameInterval, dx, true);
        createEnemies(enemies2, frameInterval2, dx2, false);
        createEnemies(enemies3, frameInterval3, dx3, true);
        createEnemies(enemies4, frameInterval4, dx4, false);
        // Draw players
        player.draw();
        player2.draw();
        requestAnimationFrame(animate);

        // Add score, timer & highscore to canvas
        ctx.font = "14px valorax";
        ctx.fillStyle = "black";
        ctx.fillText("Score: " + score, 10, 30);
        ctx.fillText("Time: " + formatTime(timer), 10, 50);
        ctx.fillText("High score: " + highScore, 10, 70);
        ctx.fillText("High score all-time: " + highScoreSpaceRace, 10, 90);
    }

    animate(); // Start the animation loop
    soundEffects.music.play(); // Play the game music

    // Formatting timer function
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        // Format the time with leading zeros if necessary
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
          
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    // Decrement timer in seconds
    setInterval(() => {
        timer--;    
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