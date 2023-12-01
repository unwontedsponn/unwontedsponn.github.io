/**
 * Imports
 */
/*--------------------------------------------------------------------------------------------------------------------*/  
import { ctx, colours, powerUpCollected } from './gameConfig.js';

/**
 * Exports
 */
/*--------------------------------------------------------------------------------------------------------------------*/  
// Define the Line class
export class Line {
    constructor(x, y, height, length, type) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.length = length;
        this.type = type; // 'horizontal' or 'vertical'
        this.color = colours.lineColour;
        this.colorPowerUp = colours.playerColourPowerUp;
        this.decreaseDuration = 5000; // 5000 milliseconds or 5 seconds
        this.startTime = null; // To track when the decrease starts
    }

    draw() {
        // If powerUpCollected, draw gold line that decreases in length
        if (powerUpCollected) {
            // Set the line color to gold
            ctx.fillStyle = this.colorPowerUp;

            // If startTime is not set, set it to the current time
            if (this.startTime === null) this.startTime = Date.now();

            // Calculate the time elapsed since the power-up started
            const elapsedTime = Date.now() - this.startTime;

            // Calculate the fraction of time elapsed
            const timeFraction = Math.min(1, elapsedTime / this.decreaseDuration);

            // Calculate the decreasing length or height based on the fraction of time elapsed
            const decreasingDimension = (this.type === 'horizontal') ? this.length * (1 - timeFraction) : this.height * (1 - timeFraction);

            // Draw a rectangle representing the decreasing line
            if (this.type === 'horizontal') ctx.fillRect(this.x, this.y, decreasingDimension, this.height);
            else if (this.type === 'vertical') ctx.fillRect(this.x, this.y, this.length, decreasingDimension);

            // If the entire duration has passed, reset the powerUpCollected state
            if (timeFraction === 1) this.startTime = null; // Reset the start time for the next power-up
        }
        // Or draw as a red line
        else {
            // Set the line color to the default color
            ctx.fillStyle = this.color;
            // Draw a rectangle representing the line
            ctx.fillRect(this.x, this.y, this.length, this.height);
        }
    }
}