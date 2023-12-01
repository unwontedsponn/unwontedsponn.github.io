/**
 * Imports
 */
/*--------------------------------------------------------------------------------------------------------------------*/  
import { ctx, obstacles, powerUpCollected, input, colours, gameAttributes, particles } from './gameConfig.js';
import { collisionDetection } from './collisionDetection.js';
import { Particle } from './particle.js';

/**
 * Exports
 */
/*--------------------------------------------------------------------------------------------------------------------*/  
// Define the Player class
export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = gameAttributes.cellSize;
        this.height = gameAttributes.cellSize;
        this.color = colours.playerColour;
        this.colorPowerUp = colours.playerColourPowerUp;
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

    draw() {
        const { proposedX, proposedY } = this.handleMovement();

        this.x = proposedX;
        this.y = proposedY;

        if (powerUpCollected) {
            ctx.fillStyle = this.colorPowerUp; // Change player to gold

            for (let i = 0; i < 10; i++) {
                const particle = new Particle(this.x + this.width / 2, this.y + this.height / 2, 'gold');
                particles.push(particle);
            }
        }

        else ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Allow player to wrap around the screen
        if (this.x > canvas.width - 5 || this.x < 0 || this.y > canvas.height - 5 || this.y < 0) {
            if (this.x > canvas.width - 5) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height - 5) this.y = 1;
            if (this.y < 0) this.y = canvas.height;
        }
    }
}