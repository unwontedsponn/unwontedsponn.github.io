/**
 * Imports
 */
/*--------------------------------------------------------------------------------------------------------------------*/    
import { setGameSettings, gameSettings, input } from '../gameConfig.js';
import { player } from '../mainGame.js';
import { fadeText } from '../uiAnimation.js';

/**
 * Exports
 */
/*--------------------------------------------------------------------------------------------------------------------*/    
let arrowKeyInstructionsFaded = false; // Track whether arrow key instructions have faded

export function levelMinusOne() {

    // Display initial message
    if (gameSettings.highScore > 0) {

        const highScore = document.getElementById('game-title');
        highScore.style.opacity = 0.4;
        highScore.innerHTML = `highScore: ${gameSettings.highScore}`;
        highScore.style.fontSize = '9vw';

        const replayMessage = document.getElementById('large-p-game1');
        replayMessage.innerHTML = "Is that all...??";
        replayMessage.style.opacity = 1;
        replayMessage.style.top = '28vh';

    } else {

        const myGame = document.getElementById('game-title');
        myGame.style.opacity = 0.4;
        myGame.innerHTML = "myGame";
        myGame.style.fontSize = '12vw';

        const walkThroughWall = document.getElementById('large-p-game1');
        walkThroughWall.innerHTML = "Walk through a wall...";
        walkThroughWall.style.opacity = 1;

    }
    
    // Fade arrow instructions if keys pressed
    if (input.upPressed || input.downPressed || input.leftPressed || input.rightPressed) {
        
        // Mark arrow key instructions as faded
        arrowKeyInstructionsFaded = true;

        // Fading out the arrow key instructions over 1 second
        fadeText('arrow-key-instructions', 1000); 
    }

    // Once the player moves through a wall, move to level 0
    if (player.x > canvas.width - 5 || player.x < 5 || player.y > canvas.height - 5 || player.y < 5) setGameSettings('level', 0);
}