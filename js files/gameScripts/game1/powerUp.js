/**
 * Imports
 */
/*--------------------------------------------------------------------------------------------------------------------*/     
import {
    ctx,
    powerUpCollected, powerUpCollectedToggle,
    colours,
    gameAttributes, resetPowerUp
} from './gameConfig.js';

import { player } from './mainGame.js';
import { collisionDetection } from './collisionDetection.js';
import { nextLevel, bottomLine } from './gameSetup.js';

/**
 * Exports
 */
/*--------------------------------------------------------------------------------------------------------------------*/  
// Define the PowerUp class
export class PowerUp {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = gameAttributes.cellSize;
        this.height = gameAttributes.cellSize;
        this.color = colours.powerUpColour;
        this.pulsateState = 0;
        this.pulsateSpeed = 0.3; // Adjust the speed of pulsation
        this.pulsateAmplitude = 5; // Adjust the amplitude of pulsation
        this.baseSize = gameAttributes.cellSize; // Initial size of the power-up
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
        const goldColourR = 255; // Maximum value for gold color
        const goldColourG = 215; // Maximum value for gold color
        const colorShadeR = Math.floor(goldColourR - pulsateValue * colorShadeRange); // Adjust the multiplier for color shade intensity
        const colorShadeG = Math.floor(goldColourG - pulsateValue * colorShadeRange); // Adjust the multiplier for color shade intensity

        // Apply the pulsation effect to size and color
        ctx.fillStyle = `rgb(${colorShadeR}, ${colorShadeG}, 0)`;
        ctx.fillRect(this.x + xOffset, this.y + yOffset, size, size);

        // Update pulsation state
        this.pulsateState += this.pulsateSpeed;
    }

    handleCollision() {
        if (collisionDetection(player, this)) {
            
            // Set powerUpCollected to true    
            powerUpCollectedToggle(true);
        
            // Remove powerUp
            resetPowerUp();

            // Next level after 5 seconds
            setTimeout(() => {            
                nextLevel();
            }, 5000);
        }
    }
}

export function createPowerUps(powerUpArray) {
    // Draw and handle collisions for existing power-ups
    for (let i = 0; i < powerUpArray.length; i++) {
        powerUpArray[i].draw();
        powerUpArray[i].handleCollision();
    }

    // If no power-up exists create a new one at a random position
    if (bottomLine.length >= canvas.width && !powerUpCollected && powerUpArray.length === 0) {
        
        const buffer = 10; 
        const minX = gameAttributes.cellSize + buffer;
        const maxX = canvas.width - gameAttributes.cellSize - buffer;
        const minY = canvas.height / 2 + buffer;
        const maxY = canvas.height - gameAttributes.cellSize - buffer;

        const newPowerUp = new PowerUp(
            Math.floor(Math.random() * (maxX - minX + 1)) + minX,
            Math.floor(Math.random() * (maxY - minY + 1)) + minY
        );
        powerUpArray.push(newPowerUp);
    }
}