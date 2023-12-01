/**
 * Imports
 */
/*--------------------------------------------------------------------------------------------------------------------*/  
import { ctx } from './gameConfig.js';

/**
 * Exports
 */
/*--------------------------------------------------------------------------------------------------------------------*/  
// Define the Edible class
export class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.radius = 3;
      this.velocity = {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5,
      };
      this.alpha = 1;
      this.decayRate = 0.05; // How far the particles spread out from the player, the higher the number, the closer they are
    }
  
    update() {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.alpha -= this.decayRate;
    }
  
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.restore();
    }

    isExpired() {
        return this.alpha <= 0;
    }
}  

// New function to update and draw particles
export function updateAndDrawParticles(ctx, particles) {
    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.update();

        // Remove faded-out particles
        if (particle.isExpired()) {
            particles.splice(i, 1);
            i--; // Adjust index to account for the removed particle
        } else particle.draw(ctx);
    }
}