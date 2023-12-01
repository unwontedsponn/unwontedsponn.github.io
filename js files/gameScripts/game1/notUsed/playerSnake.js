/**
 * Exports
 */
/*--------------------------------------------------------------------------------------------------------------------*/  
import {
    ctx, 
    obstacles, 
    powerUpCollected,
    input, colours, gameAttributes, particles
} from './gameConfig.js';

import { collisionDetection } from './collisionDetection.js';
import { Particle } from './particle.js';

/**
 * Define the Player class
 */
export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = gameAttributes.cellSize;
        this.height = gameAttributes.cellSize;
        this.color = colours.playerColour;
        this.colorPowerUp = colours.playerColourPowerUp;
        this.trail = []; // Store trail positions
        this.trailMaxLength = 10; // Adjust the length of the trail as needed
        this.trailOpacity = 0.8; // Adjust the initial opacity of the trail
        this.transitionDuration = 0.2; // Adjust the duration of the transition
        this.transitionProgress = 0; // Track the progress of the transition
    }

    handleMovement() {
        let proposedX = this.x;
        let proposedY = this.y;

        const moveDistance = 10;

        if (input.upPressed) proposedY -= moveDistance;
        else if (input.rightPressed) proposedX += moveDistance;
        else if (input.downPressed) proposedY += moveDistance;
        else if (input.leftPressed) proposedX -= moveDistance;

        return { proposedX, proposedY };
    }

    update(deltaTime) {
        if (this.transitionProgress < 1) {
            // Update the transition progress
            this.transitionProgress += (1 / this.transitionDuration) * deltaTime;
        }

        // Update the trail with the current player position
        this.updateTrail();
    }

    draw() {
        const { proposedX, proposedY } = this.handleMovement();
        let canMove = true;

        for (let i = 0; i < obstacles.length; i++) {
            if (collisionDetection({ x: proposedX, y: proposedY, width: this.width, height: this.height }, obstacles[i])) {
                canMove = false;
                break;
            }
        }

        if (canMove) {
            this.x = proposedX;
            this.y = proposedY;
        }

        if (powerUpCollected) {
            ctx.fillStyle = this.colorPowerUp; // Change player to gold

            for (let i = 0; i < 10; i++) {
                const particle = new Particle(this.x + this.width / 2, this.y + this.height / 2, 'gold');
                particles.push(particle);
            }
        }
        else ctx.fillStyle = this.color;

        // Apply transition effect to the player's position
        const animatedX = this.x + (proposedX - this.x) * this.transitionProgress;
        const animatedY = this.y + (proposedY - this.y) * this.transitionProgress;

        ctx.fillRect(animatedX, animatedY, this.width, this.height);

        // Allow player to wrap around the screen
        if (animatedX > canvas.width - 5 || animatedX < 0 || animatedY > canvas.height - 5 || animatedY < 0) {
            if (animatedX > canvas.width - 5) this.x = 0;
            if (animatedX < 0) this.x = canvas.width;
            if (animatedY > canvas.height - 5) this.y = 1;
            if (animatedY < 0) this.y = canvas.height;
        }

        // Draw the trail
        this.drawTrail();
    }

    drawTrail() {
        // Draw the trail with decreasing opacity
        for (let i = 0; i < this.trail.length; i++) {
            const alpha = this.trailOpacity - (i / this.trailMaxLength) * this.trailOpacity;
            ctx.fillStyle = `rgba(${this.colorPowerUp}, ${alpha})`;
            ctx.fillRect(this.trail[i].x, this.trail[i].y, this.width, this.height);
        }
    }

    updateTrail() {
        // Update the trail with the current player position
        this.trail.push({ x: this.x, y: this.y });

        // Trim the trail to the maximum length
        if (this.trail.length > this.trailMaxLength) {
            this.trail.shift();
        }
    }
}