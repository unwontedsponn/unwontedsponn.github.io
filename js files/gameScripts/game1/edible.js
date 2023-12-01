/**
 * Imports
 */
/*--------------------------------------------------------------------------------------------------------------------*/  
import { ctx, gameSettings, setGameSettings, colours, gameAttributes } from './gameConfig.js';
import { player } from './mainGame.js';
import { topLine, bottomLine, leftLine, rightLine, lineLengthIncreaseHeight, lineLengthIncreaseWidth } from './gameSetup.js';
import { collisionDetection } from './collisionDetection.js';

/**
 * Exports
 */
/*--------------------------------------------------------------------------------------------------------------------*/  
// Define the Edible class
export class Edible {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = gameAttributes.cellSize;
        this.height = gameAttributes.cellSize;
        this.color = colours.edibleColour;
        this.pulsateState = 0;
        this.pulsateSpeed = 0.3; // Sspeed of pulsation
        this.pulsateAmplitude = 5; // Amplitude of pulsation
        this.baseSize = gameAttributes.edibleSize; // Initial size of the power-up
        this.isCollision = false; // Flag to track collisions
    }

    handleCollision() {
        if (collisionDetection(player, this)) {
            
            // If player collides with an edible, update its position and increment the score
            this.respawn();
            setGameSettings('score', gameSettings.score + 1); // Increment score by 1
            this.isCollision = true; // Set collision flag to true

        } else this.isCollision = false; // Reset collision flag if no collision
    }

    draw() {
        // Generates the oscillating value between -1 and 1.
        const pulsateValue = Math.sin(this.pulsateSpeed * this.pulsateState) * this.pulsateAmplitude;
        const size = this.baseSize + pulsateValue;

        // Calculate position to keep the power-up centered
        const xOffset = (this.baseSize - size) / 2;
        const yOffset = (this.baseSize - size) / 2;

        // Calculate color shade
        const colorShadeRange = 2; // Adjust the range for the subtle color change
        const targetColor = [193, 85, 100]; // Target color in RGB

        // Adjust the multiplier for color shade intensity
        const colorShadeR = Math.floor(targetColor[0] - pulsateValue * colorShadeRange);
        const colorShadeG = Math.floor(targetColor[1] - pulsateValue * colorShadeRange);

        // Apply the pulsation effect to size and color
        ctx.fillStyle = `rgba(${colorShadeR}, ${colorShadeG}, ${targetColor[2]}, 1)`;
        ctx.fillRect(this.x + xOffset, this.y + yOffset, size, size);

        // Update pulsation state
        this.pulsateState += this.pulsateSpeed;
    }

    respawn() {
        // Randomly respawn the edible in a new location, ensuring it's not too close to the player
        let newX, newY;
    
        do {
            newX = this.generateRandomX();
            newY = this.generateRandomY();
        } while (this.isTooCloseToPlayer(newX, newY));
    
        this.x = newX;
        this.y = newY;
    }
    
    isTooCloseToPlayer(newX, newY) {
        // Check if the new position is too close to the player
        const minDistance = gameAttributes.edibleSize + gameAttributes.playerSize;
    
        return (
            newX + gameAttributes.edibleSize > player.x - minDistance &&
            newX < player.x + player.width + minDistance &&
            newY + gameAttributes.edibleSize > player.y - minDistance &&
            newY < player.y + player.height + minDistance
        );
    }
    

    generateRandomX() {
        const buffer = 10;
        const minX = gameAttributes.edibleSize + buffer;
        const maxX = canvas.width - gameAttributes.edibleSize - buffer;
        return Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    }
    
    generateRandomY() {
        const buffer = 10;
        const minY = ((gameSettings.level === 0 || gameSettings.level === 1) && gameSettings.score === 0) 
            ? canvas.height / 2 + buffer 
            : gameAttributes.edibleSize + buffer;
        const maxY = canvas.height - gameAttributes.edibleSize - buffer;
    
        return Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    }    
}

export function createEdibles(ediblesArray) {
    // Draw and handle collisions for existing edibles
    for (let i = 0; i < ediblesArray.length; i++) {
        const edible = ediblesArray[i];
        edible.handleCollision();

        // Check if a collision occurred
        if (edible.isCollision) {
            // Increase each line's length/height when the player eats an edible
            topLine.length -= lineLengthIncreaseWidth;
            bottomLine.length += lineLengthIncreaseWidth;
            leftLine.height -= lineLengthIncreaseHeight;
            rightLine.height += lineLengthIncreaseHeight;
        }
        edible.draw();
    }

    // If no edibles exist, create a new one at a random position
    if (ediblesArray.length === 0) {
        ediblesArray.push(new Edible(
            Math.floor(Math.random() * (canvas.width - gameAttributes.edibleSize * 2) + gameAttributes.edibleSize),
            Math.floor(Math.random() * (canvas.height / 2 - gameAttributes.edibleSize * 2) + canvas.height / 2)
        ));
    }
}
