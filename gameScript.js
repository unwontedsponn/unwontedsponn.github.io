/**
 * Global Settings
 */
/*--------------------------------------------------------------------------------------------------------------------*/     
// Game settings
let level = 1   
let score = 0
let canvasWidth = canvas.width
let canvasHeight = canvas.height
let [upPressed, rightPressed, downPressed, leftPressed] = [false, false, false, false]
let startScreen = true
let gameRunning = true
let nextLevelScreen = false
let gameWon = false
let pauseTimer = 0       
let countdown = 5
let isMouseOverCanvas = false

// Colours
const playerColour = "#407dbf"
const titleColour = "#acddfb"
const playerColourPowerUp = "gold"
const edibleColour = "#c15564"
const enemyColour = "#3f423e"
const powerUpColour = "#4a713f"
const levelCompleteColour = "#334862"
const obstacleColour = "#334862"

// Characters
let x = Math.floor(Math.random() * (canvasWidth - 20 + 1) + 10)
let y = Math.floor(Math.random() * (canvasHeight - 20 + 1) + 10)
let [dy, dy2, dy3] = [3, 5, 9]
const cellSize = 20
const edibles = []
const enemies = []
const powerUp = []
const obstacles = []
let frame = 0
let fInterval = 60
let fIntervalObstacles = 180
let powerUpCollected = false

/**
 * Game Elements
 */
/*--------------------------------------------------------------------------------------------------------------------*/    
// Create player
class Player {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = cellSize
        this.height = cellSize
        this.color = playerColour
        this.colorPowerUp = playerColourPowerUp
    }
    draw() {
        let newX = this.x
        let newY = this.y

        // Calculate the new position based on key presses
        if (upPressed) newY -= 10
        else if (rightPressed) newX += 10
        else if (downPressed) newY += 10
        else if (leftPressed) newX -= 10

        // Check for collisions with obstacles before moving
        let canMove = true
        for (let i = 0; i < obstacles.length; i++) {
            if (collisionDetection({ x: newX, y: newY, width: this.width, height: this.height }, obstacles[i])) {
                // Player can't move through obstacles
                canMove = false
                break // Exit the loop since we don't need to check further obstacles
            }
        }

        if (canMove) {
            // Update the player's position if there are no collisions
            this.x = newX
            this.y = newY
        }

        if (powerUpCollected) ctx.fillStyle = this.colorPowerUp
        else ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)

        // Allow player to wrap around the screen
        if (this.x > canvas.width - 5 || this.x < 0 || this.y > canvas.height - 5 || this.y < 0) {
            if(this.x > canvas.width - 5) player.x = 0
            if(this.x < 0) player.x = canvas.width
            if(this.y > canvas.height - 5) player.y = 1
            if(this.y < 0) player.y = canvas.height;          
        }                                      
    }       
}
let player = new Player(x, y)

// Create edible
class Edible {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
        this.color = edibleColour;
    }
    draw() {
        if (collisionDetection(player, this)) {
            // If player collides with an edible, update its position and increment the score
            this.x = Math.floor(Math.random() * (canvasWidth - this.width) + this.width);
            this.y = Math.floor(Math.random() * (canvasHeight - this.height) + this.height);
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            score++;
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }                               
}

function createEdibles(ediblesArray) {
    // Draw existing edible
    for (let i = 0; i < ediblesArray.length; i++) {
        ediblesArray[i].draw();
    }
    // If no edible exists, create a new one at a random position
    if (ediblesArray.length === 0) {
        ediblesArray.push(new Edible(
            Math.floor(Math.random() * (canvasWidth - cellSize) + cellSize),
            Math.floor(Math.random() * (canvasHeight - cellSize) + cellSize)
        ));
    }
}

class Enemy {
    constructor(x, speed) {
        this.x = x;
        this.y = 0;
        this.width = cellSize;
        this.height = cellSize;
        this.color = enemyColour
        this.speed = speed;
    }
    update() {
        this.y += this.speed;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        if (!powerUpCollected && collisionDetection(player, this)) {
            // End the game and display 'YOU LOSE'
            gameRunning = false;
        }
    }                               
}

function createEnemies(enemiesArray, frameInterval) {
    // Update and draw existing enemies
    for (let i = 0; i < enemiesArray.length; i++) {
        enemiesArray[i].update();
        enemiesArray[i].draw();
    }

    // In your game loop, after updating and drawing enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];

        // Check if the enemy has fallen off the screen
        if (enemy.y > canvasHeight) {
            // Remove the enemy from the array
            enemies.splice(i, 1);
        }
    }

    // Create a new enemy at a random position with a random speed at a specified frame interval
    if (frame % frameInterval === 0) {
        const randomX = Math.floor(Math.random() * (canvasWidth - 10 + 1) + 0);
        const randomSpeed = Math.floor(Math.random() * (dy3 - dy + 1) + dy); // Adjust speed range as needed
        enemiesArray.push(new Enemy(randomX, randomSpeed));
    }      
}

// Create PowerUp
class PowerUp {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
        this.color = powerUpColour;
        this.respawning = false;
    }

    draw() {
        if (!this.respawning) {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    respawn() {
        // Randomly respawn the power-up after 5 seconds (5000 milliseconds)
        this.x = Math.floor(Math.random() * (canvasWidth - 10 + 1) + 10);
        this.y = Math.floor(Math.random() * (canvasHeight - 10 + 1) + 10);
        this.respawning = false;
    }

    handleCollision() {
        if (!this.respawning && collisionDetection(player, this)) {
            // If player collides with a power-up, set it to respawn
            this.respawning = true;
            this.x = -cellSize; // Move it off-screen
            this.y = -cellSize;
            powerUpCollected = true; // Set powerUpCollected to true            
            setTimeout(() => {            
                this.respawn();
                powerUpCollected = false; // Reset powerUpCollected to false
            }, 5000); // Respawn after 5 seconds
        }
    }
}

function createPowerUps(powerUpArray) {
    // Draw and handle collisions for existing power-ups
    for (let i = 0; i < powerUpArray.length; i++) {
        powerUpArray[i].draw();
        powerUpArray[i].handleCollision();
    }

    // If no power-up exists or if it's respawning and no power-up is collected, create a new one at a random position
    if (!powerUpCollected && powerUpArray.length === 0) {
        powerUpArray.push(new PowerUp(
            Math.floor(Math.random() * (canvasWidth - 10 + 1) + 10),
            Math.floor(Math.random() * (canvasHeight - 10 + 1) + 10)
        ));
    }
}

// Create Obstacle
class Obstacle {
    constructor(y, widthFactor, speed) {
        this.x = 0;
        this.y = y;
        this.width = cellSize * widthFactor;
        this.height = cellSize;
        this.color = obstacleColour;
        this.speed = speed;
    }
    update() {
        this.x += this.speed;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }                               
}

function createObstacles(obstaclesArray, frameInterval) {
    // Function to check if a given position is valid for a new obstacle
    function isValidPosition(x, y, widthFactor) {
        // Check if it overlaps with the player
        if (collisionDetection({ x, y, width: cellSize * widthFactor, height: cellSize }, player)) return false;

        // Check if it overlaps with any existing obstacles
        for (let i = 0; i < obstaclesArray.length; i++) {
            if (collisionDetection({ x, y, width: cellSize * widthFactor, height: cellSize }, obstaclesArray[i])) return false;
        }

        // Check if it overlaps with any power-ups
        for (let i = 0; i < powerUp.length; i++) {
            if (collisionDetection({ x, y, width: cellSize * widthFactor, height: cellSize }, powerUp[i])) return false;
        }
        return true;
    }

    // Draw existing obstacles
    for (let i = 0; i < obstaclesArray.length; i++) {
        obstaclesArray[i].update();
        obstaclesArray[i].draw();
    }

    // In your game loop, after updating and drawing obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obstacle = obstacles[i];

        // Check if the obstacle has moved off the screen
        if (obstacle.x > canvasWidth) {
            // Remove the enemy from the array
            obstacles.splice(i, 1);
        }
    }

    // Create a new obstacle at a random position at a specified frame interval
    if (frame % frameInterval === 0) {
        let widthFactor = Math.floor(Math.random() * 4) + 2;
        let randomY;

        // Generate a valid position for the obstacle
        do {
            randomY = Math.floor(Math.random() * (canvasHeight - cellSize));
        } while (!isValidPosition(randomY, widthFactor));
        const randomSpeed = Math.floor(Math.random() * (dy - 1 + 1) + 1); // Adjust speed range as needed
        obstaclesArray.push(new Obstacle(randomY, widthFactor, randomSpeed));
    }
}

/**
 * Collision detection
 */
/*--------------------------------------------------------------------------------------------------------------------*/    
function collisionDetection(rect1, rect2) {
    return !(rect1.x > rect2.x + rect2.width || rect1.x + rect1.width < rect2.x || rect1.y > rect2.y + rect2.height || rect1.y + rect1.height < rect2.y);
}

/**
 * Input Handling
 */
/*--------------------------------------------------------------------------------------------------------------------*/    
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        e.preventDefault(); // Prevent the default scrolling behavior
        upPressed = true;
    }
    else if (e.key == "Right" || e.key == "ArrowRight") rightPressed = true;
    else if (e.key == "Down" || e.key == "ArrowDown") downPressed = true;
    else if (e.key == "Left" || e.key == "ArrowLeft") leftPressed = true;
}

function keyUpHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") upPressed = false;
    else if (e.key == "Right" || e.key == "ArrowRight") rightPressed = false;
    else if (e.key == "Down" || e.key == "ArrowDown") downPressed = false;
    else if (e.key == "Left" || e.key == "ArrowLeft") leftPressed = false;
}

// Event listener for canvas click
canvas.addEventListener('click', onClick);

/**
 * Game State Management and UI
 */
/*--------------------------------------------------------------------------------------------------------------------*/    
function displayStartGame() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Display a message to indicate the pause
    ctx.font = "132px Gopher Mono";
    ctx.fillStyle = titleColour;
    ctx.globalAlpha = 0.5;
    ctx.fillText("myGame", canvas.width / 2 - 410, canvas.height / 2 - 60);
    ctx.font = "24px Gopher Mono";
    ctx.fillStyle = playerColour;
    ctx.globalAlpha = 1;
    ctx.fillText("You are the blue square and you can move through walls.", canvas.width / 2 - 510, canvas.height / 2 - 10);
    ctx.fillStyle = edibleColour;
    ctx.fillText("Your aim is to eat as many red edibles as you can.", canvas.width / 2 - 380, canvas.height / 2 + 15);
    ctx.fillStyle = enemyColour;
    ctx.fillText("But if you hit a falling enemy... you die!", canvas.width / 2 - 310, canvas.height / 2 + 45);
    ctx.font = "16px Gopher Mono";
    ctx.fillText("You level up every 10 points...", canvas.width / 2 - 210, canvas.height / 2 + 75);
    ctx.fillText("...but so do the enemies.", canvas.width / 2 - 130, canvas.height / 2 + 95);
    ctx.fillText("CONTROLS: Up | Left | Down | Right", canvas.width / 2 - 180, canvas.height / 2 + 150);
    ctx.font = "24px Gopher Mono";
    ctx.fillText("Click to begin", canvas.width / 2 - 110, canvas.height / 2 + 200);
}

function onClick() {
    // Start the game when the user clicks on the canvas during the start screen, the game lost screen or the game won screen
    if (startScreen || !gameRunning || gameWon) {
        startScreen = false;
        gameWon = false
        resetGame();
        nextLevelScreen = false;
        gameRunning = true;
        canvas.style.cursor = "auto";
    }
}

function resetGame() {
  // Reset game variables to their initial state
    dy = 3;
    dy2 = 5;
    dy3 = 9;
    fInterval = 60;
    level = 1;
    score = 0;
    x = Math.floor(Math.random() * (canvasWidth - 20 + 1) + 10);
    y = Math.floor(Math.random() * (canvasHeight - 20 + 1) + 10);
    player = new Player(x, y);  
    edibles.length = 0; // Clear the edibles array
    enemies.length = 0; 
    powerUp.length = 0; 
    obstacles.length = 0; 
}

function nextLevel() {
    nextLevelScreen = true;
    pauseTimer = 0;
    score = 0;

    // Increase enemies speeds and game level by 1
    dy += 2;
    dy2 += 2;
    dy3 += 2;
    fInterval -= 5;
    obstacles.length = 0; 
    level++;
}

function displayLevelComplete() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Display a message to indicate the pause
    ctx.font = "24px Gopher Mono";
    ctx.fillStyle = "#407dbf";
    ctx.fillText("Level " + (level - 1) + " completed!", canvas.width / 2 - 110, canvas.height / 2 - 10);

    if (level === 2) {
        ctx.font = "14px Gopher Mono";
        ctx.fillStyle = powerUpColour;
        ctx.fillText("Eat green powerups to be...", canvas.width / 2 - 250, canvas.height / 2 + 20);
        ctx.fillStyle = playerColourPowerUp;
        ctx.fillText("invincible for 5 seconds...", canvas.width / 2 - 20, canvas.height / 2 + 20);
    }

    if (level === 3) {
        ctx.font = "14px Gopher Mono";
        ctx.fillStyle = obstacleColour;
        ctx.fillText("But even this powerup can't let you pass through obstacles...", canvas.width / 2 - 260, canvas.height / 2 + 20);
    }

    // Display the countdown
    ctx.font = "24px Gopher Mono";
    ctx.fillStyle = "#407dbf";
    ctx.fillText(countdown, canvas.width / 2 - 10, canvas.height / 2 + 70);

    countdown--;

    if (countdown >= 0) setTimeout(displayLevelComplete, 1000);
    else {
        nextLevelScreen = false;
        requestAnimationFrame(animate); // Continue the game
    }
}

function displayGameOver() {
    ctx.font = "24px Gopher Mono";
    ctx.fillStyle = "#c15564";
    ctx.fillText("You lose!", canvas.width / 2 - 110, canvas.height / 2 - 10);
    ctx.fillStyle = "#407dbf";
    ctx.fillText("Play again?", canvas.width / 2 - 10, canvas.height / 2 + 70);
}

function displayGameWon() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "52px Gopher Mono";
    ctx.fillStyle = playerColour;
    ctx.fillText("YOU WIN!!!", canvas.width / 2 - 410, canvas.height / 2 - 50);
    ctx.font = "24px Gopher Mono";
    ctx.fillStyle = "#c15564";
    ctx.fillText("Demo completed...", canvas.width / 2 - 110, canvas.height / 2 - 10);
    ctx.fillStyle = "#407dbf";
    ctx.fillText("Play again?", canvas.width / 2 - 10, canvas.height / 2 + 70);
}

/**
 * Main Game Loop
 */
/*--------------------------------------------------------------------------------------------------------------------*/    
let lastTimestamp = 0;
const targetFPS = 60; // Target frame rate (e.g. 60 frames per second)

function animate(timestamp) {
    // Calculate the time since the last frame
    const deltaTime = (timestamp - lastTimestamp) / 1000; // Convert to seconds

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Display start screen before the game begins
    if (startScreen) {
        displayStartGame();
        canvas.style.cursor = "pointer"; // Change cursor to pointer on start screen
        requestAnimationFrame(animate);
    }

    // When player completes level, display level complete message and countdown
    else if (nextLevelScreen) {
        countdown = 5;
        displayLevelComplete();
    }

    // When player hits enemy, display game over message and option to play again
    else if (!gameRunning) {
        displayGameOver();
        canvas.style.cursor = "pointer"; // Change cursor to pointer on start screen
        requestAnimationFrame(animate);
    }

    // Play the game...
    else {
        if (level >= 1) {
            player.draw();
            createEdibles(edibles);
            frame++;
            createEnemies(enemies, fInterval);

            // Add level & score to canvas
            ctx.font = "14px Gopher Mono";
            ctx.fillStyle = "#407dbf";
            ctx.fillText("Level: " + level, 10, 20);
            ctx.fillText("Score: " + score, 10, 40);
        }
        if (level >= 2) createPowerUps(powerUp);
        if (level >= 3) createObstacles(obstacles, fIntervalObstacles);   

        if (level === 3 && score === 10) {
            nextLevelScreen = false
            gameWon = true
            canvas.style.cursor = "pointer"; // Change cursor to pointer on the game won screen
            displayGameWon();
        }

        // Level completes and enters the next level
        else if (score === 10) nextLevel();

        // Make sure cursor isn't a pointer
        if (isMouseOverCanvas) canvas.style.cursor = "auto";

        // Request animation frame to continue the game
        requestAnimationFrame(animate);
    }

    // Schedule the next frame
    lastTimestamp = timestamp;
}

// Start the game loop
requestAnimationFrame(animate);






/**
 * Things to fix/implement
 */
/*--------------------------------------------------------------------------------------------------------------------*/   

// Make enemies2 be spawned at random times, not the same time as enemies1

// Incorporate a training into the game > 
//      "move through walls", player moves through a wall
//      "eat as many red edibles", player eats an edible
//      "hit by an enemy...", player starts level 1...
// The PowerUp to spawn every 5 seconds, instead of constantly when not collided with
// 'Collectibles' - perhaps items that give more points - like a 5 pointer...
// Timer?
// High Score
// Checkpoints- like, when you reach level 5, if you die you restart from there...
// Upgrade
// Puzzles
// Boss Battle
// Acheivements - quickest level completeion... etc
// Narrative



// Frame Rate: Your game loop is running constantly at the maximum frame rate, which can put a heavy load on the browser. Consider using requestAnimationFrame to control the frame rate and ensure that your game loop is not running faster than the screen can refresh.

// Memory Management: Creating and destroying objects like enemies, power-ups, and obstacles dynamically can cause memory leaks over time. Make sure to properly clean up and remove objects that are no longer in use to free up memory.

// Collision Detection: Repeatedly checking for collisions with all game objects in each frame can be computationally expensive. Optimize collision detection by using spatial partitioning techniques like quadtrees or a grid system to reduce the number of collision checks.

// Audio: You've commented out the import of the Tone library, but if you later decide to use it for audio, be cautious about its impact on performance. Loading and playing audio can be resource-intensive.

// Power-Up Respawn: The power-up respawn logic may need optimization. Instead of constantly checking for collisions with the player, you can use a timer to respawn the power-up after a fixed interval.

// Obstacle Generation: Generating obstacles at every frame may be excessive. Consider generating obstacles less frequently or at specific intervals to reduce the load on the CPU.

// Global Variables: Using global variables for game state can lead to unexpected behavior and make debugging difficult. Try encapsulating your game state and logic in an object-oriented or functional programming approach to improve code organization.

// Mouse Over Canvas: The isMouseOverCanvas variable doesn't appear to be used in the provided code snippet. Ensure it serves a purpose, or remove it if it's unnecessary.

// Optimize Drawing: Drawing operations in Canvas can also be resource-intensive. Optimize drawing by only updating and rendering objects that are visible on the screen, and avoid redrawing static elements.

// Error Handling: Ensure that your code has proper error handling in case of unexpected events or exceptions that could lead to freezing.

// Browser Dev Tools: Use browser developer tools to profile your game's performance. Check for CPU and memory usage, and look for bottlenecks in your code.

// Testing: Test your game on different browsers and devices to ensure it performs well across various environments.