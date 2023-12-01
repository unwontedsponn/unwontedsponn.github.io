/**
 * Imports
 */
/*--------------------------------------------------------------------------------------------------------------------*/
import {
    ctx,
    obstacles, powerUp,

    gameSettings,
    colours,
    gameAttributes,
} from '../gameConfig.js';

import { player } from '../mainGame.js';
import { collisionDetection } from '../collisionDetection.js';

/**
 * Exports
 */
/*--------------------------------------------------------------------------------------------------------------------*/
// Define the Obstacle class
export class Obstacle {
    constructor(y, widthFactor, speed) {
        this.x = 0;
        this.y = y;
        this.width = gameAttributes.cellSize * widthFactor;
        this.height = gameAttributes.cellSize;
        this.color = colours.obstacleColour;
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

export function createObstacles(obstaclesArray, frameInterval) {
    // Function to check if a given position is valid for a new obstacle
    function isValidPosition(obstacle, player, obstaclesArray, powerUp) {
        const width = obstacle.width;
        const height = obstacle.height;

        // Check if it overlaps with the player
        if (collisionDetection(obstacle, player)) return false;

        // Check if it overlaps with any existing obstacles
        for (let i = 0; i < obstaclesArray.length; i++) {
            if (collisionDetection(obstacle, obstaclesArray[i])) return false;
        }

        // Check if it overlaps with any power-ups
        for (let i = 0; i < powerUp.length; i++) {
            if (collisionDetection(obstacle, powerUp[i])) return false;
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
        if (obstacle.x > canvas.width) {
            // Remove the obstacle from the array
            obstacles.splice(i, 1);
        } else {
            // Pass the obstacle to the isValidPosition function
            if (!isValidPosition(obstacle, player, obstaclesArray, powerUp)) {
                // Handle the collision or invalid position as needed
            }
        }
    }

    // Create a new obstacle at a random position at a specified frame interval
    if (gameSettings.frame % frameInterval === 0) {
        let widthFactor = Math.floor(Math.random() * 4) + 2;
        let randomY;

        // Generate a valid position for the obstacle
        do {
            randomY = Math.floor(Math.random() * (canvas.height - gameAttributes.cellSize));
        } while (!isValidPosition(new Obstacle(randomY, widthFactor, 0), player, obstaclesArray, powerUp));
        const randomSpeed = Math.floor(Math.random() * (gameAttributes.characters.enemySlowSpeed - 1 + 1) + 1); // Adjust speed range as needed
        obstaclesArray.push(new Obstacle(randomY, widthFactor, randomSpeed));
    }
}