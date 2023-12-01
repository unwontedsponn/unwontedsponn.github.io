/**
 * Imports
 */
/*--------------------------------------------------------------------------------------------------------------------*/    
import { Player } from './player.js';
import { updateAndDrawParticles } from './particle.js';
import { 
    ctx, canvas, gameState, gameSettings, setGameSettings, 
    gameAttributes, particles, powerUp,
    resetEdibles
} from './gameConfig.js';
import { levelZero } from './levels/0.js';
import { levelOne } from './levels/1.js';
import { bottomLine, topLine, leftLine, rightLine } from './gameSetup.js';
import { createPowerUps } from './powerUp.js';
import { setupInputListeners } from './inputHandler.js';

/**
 * Global Variables
 */
/*--------------------------------------------------------------------------------------------------------------------*/    
let lastTimestamp = 0; // Initialize the last timestamp
let animationFrameId = null;

/**
 * Instantiation
 */
/*--------------------------------------------------------------------------------------------------------------------*/    
// Create a new player object using the x and y coordinates from gameSettings.
const buffer = 10;

const minX = gameAttributes.cellSize + buffer;
const maxX = canvas.width - gameAttributes.cellSize - buffer;
const minY = canvas.height / 2 + buffer;
const maxY = canvas.height - gameAttributes.cellSize - buffer;

export const player = new Player(
    Math.floor(Math.random() * (maxX - minX + 1)) + minX,
    Math.floor(Math.random() * (maxY - minY + 1)) + minY
);

// Set up input event listeners for controlling the player.
setupInputListeners();

/**
 * Functions
 */
/*--------------------------------------------------------------------------------------------------------------------*/  
// Function to clear canvas
export function clearCanvas() {ctx.clearRect(0, 0, canvas.width, canvas.height);}

/**
 * Main Game Loop
 */
/*--------------------------------------------------------------------------------------------------------------------*/    
export function animate(timestamp) { // The main loop that drives the game

    // Calculate the time elapsed since the last frame in seconds.
    const deltaTime = (timestamp - lastTimestamp) / 1000;

    // Clear the canvas
    clearCanvas();

    // Play the game...
    if (gameState.gameRunning) {

        // Draw the player and run the game
        player.draw();
        player.handleMovement();
        setGameSettings('frame', gameSettings.frame + 1); // Increment frame by 1

        // Tutorial - Render player and edible with instructions
        if (gameSettings.level === 0) levelZero();
        
        // Game starts with level 1 - Rendering the player, edibles, enemies, and extra game-related information.
        if (gameSettings.level >= 1) levelOne();
    
        // Levels complete when the line exceeds the canvas width - powerUp is created to advance to each next level
        if (bottomLine.length >= canvas.width) {
            resetEdibles();
            createPowerUps(powerUp);
        }

        // Update and draw particles
        updateAndDrawParticles(ctx, particles);

        // Draw the line
        topLine.draw();
        bottomLine.draw();
        leftLine.draw();
        rightLine.draw();

        // Request the next animation frame to continue the game
        animationFrameId = requestAnimationFrame(animate);
    }

    // Schedule the next frame and update the last timestamp.
    lastTimestamp = timestamp;
}

// Start the game loop by requesting the first animation frame.
animationFrameId = requestAnimationFrame(animate);