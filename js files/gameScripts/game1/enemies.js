/**
 * Imports
 */
/*--------------------------------------------------------------------------------------------------------------------*/
import { ctx, powerUpCollected, enemies, setGameSettings, gameSettings, colours, gameAttributes } from './gameConfig.js';
import { player } from './mainGame.js';
import { flashOverlay } from './uiAnimation.js';
import { newGame } from './gameSetup.js';
import { collisionDetection } from './collisionDetection.js';

/**
 * Exports
 */
/*--------------------------------------------------------------------------------------------------------------------*/
// Define the Enemy class
export class Enemy {
    constructor(x, speed) {
        this.x = x;
        this.y = 0;
        this.width = Math.floor(Math.random() * gameAttributes.cellSize) + gameAttributes.cellSize; // Random width between cellSize and cellSize * 2
        this.height = Math.floor(Math.random() * gameAttributes.cellSize) + gameAttributes.cellSize;
        this.color = colours.enemyColour;
        this.speed = speed;
        this.rotation = 0;
        this.isFlyingOffScreen = false;
        this.flyOffSpeed = 20; // Adjust the speed at which enemies fly off screen
        this.flyOffDirection = Math.random() * (Math.PI * 2); // Random angle in radians
    }

    update() {
        // If flying off screen, move the enemy up and in a random direction
        if (this.isFlyingOffScreen) {
            const dx = Math.cos(this.flyOffDirection) * this.flyOffSpeed;
            const dy = Math.sin(this.flyOffDirection) * this.flyOffSpeed;

            this.x += dx;
            this.y += dy;
            this.rotation += 0.4; // Adjust the rotation speed as needed
        } else {
            // Normal update behavior
            this.y += this.speed;
            this.rotation += 0.1; // Adjust the rotation speed as needed
        }
    }

    draw() {
        ctx.save(); // Save the current transformation matrix
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2); // Translate to the center of the enemy
        ctx.rotate(this.rotation); // Rotate the enemy

        // Change color to indicate flying off screen
        ctx.fillStyle = this.isFlyingOffScreen ? 'gray' : this.color;

        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height); // Draw the enemy
        ctx.restore(); // Restore the saved transformation matrix

        // Check collision with the player
        if (collisionDetection(player, this)) {
            // Calculate points based on the size of the enemy
            const points = Math.floor((this.width + this.height) / gameAttributes.cellSize);

            // If powerUpCollected is true, start flying off screen
            if (powerUpCollected && !this.isFlyingOffScreen) {
                this.isFlyingOffScreen = true;
                setGameSettings('enemiesDefeated', gameSettings.enemiesDefeated + points); // Increment score by size of enemies
            }

            // If powerUpCollected is false, restart the game
            if (!powerUpCollected && !this.isFlyingOffScreen) {
                if (gameSettings.enemiesDefeated > gameSettings.highScore) setGameSettings('highScore', gameSettings.enemiesDefeated); 
                newGame(); // Restart the game
                flashOverlay('died-flash-overlay', 193, 85, 100, 300, false);
            }
        }
    }
}

export function createEnemies(enemiesArray, frameInterval) {
    // Update and draw existing enemies
    for (let i = 0; i < enemiesArray.length; i++) {
        enemiesArray[i].update();
        enemiesArray[i].draw();
    }

    // In your game loop, after updating and drawing enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];

        // Check if the enemy has fallen off the screen
        if (enemy.y > canvas.height) {
            // Remove the enemy from the array
            enemies.splice(i, 1);
        }
    }

    // Create a new enemy at a random position with a random speed at a specified frame interval
    if (gameSettings.frame % frameInterval === 0) {
        const randomX = Math.floor(Math.random() * (canvas.width - gameAttributes.cellSize));
        const randomSpeed = Math.floor(
            Math.random() * (gameAttributes.characters.enemyFastSpeed - gameAttributes.characters.enemySlowSpeed + 1) +
                gameAttributes.characters.enemySlowSpeed
        ); // Adjust speed range as needed
        enemiesArray.push(new Enemy(randomX, randomSpeed));
    }
}