/**
 * Imports
 */
/*--------------------------------------------------------------------------------------------------------------------*/    
import { gameSettings, edibles, enemies, powerUpCollected } from '../gameConfig.js';
import { createEdibles } from '../edible.js';
import { createEnemies } from '../enemies.js';
import { fadeText } from '../uiAnimation.js';

/**
 * Exports
 */
/*--------------------------------------------------------------------------------------------------------------------*/    
export function levelOne() {
    createEdibles(edibles);
    createEnemies(enemies, gameSettings.fInterval);

    // Fade title text over 2 seconds
    fadeText('game-title', 2000, 0);

    // Fading out instructions over 2 seconds, and then call try-not-to-die text
    fadeText('large-p-game1', 2000, 0, () => {
        
        // If player hits an enemy, immediately fade try-not-to-die instructions to 0 opacity
        if (gameSettings.level === 0) fadeText('try-not-to-die', 0, 0);

        // Fade in 'try not to die' instructions over 1 second
        else if (gameSettings.level === 1 && gameSettings.timesPlayedTheGame === 0) {

            fadeText('try-not-to-die', 2000, 0.2);

            // Fade out "try not to die" after 1 second
            setTimeout(() => {
                fadeText('try-not-to-die', 1000, 0);
            }, 2000);

        }
    });

    // POWER UP - SCORE TEXT
    if (powerUpCollected) {
        const score = document.getElementById('game-title');
        const killAnEnemy = document.getElementById('large-p-game1');
            
        score.innerHTML = `Score: ${gameSettings.enemiesDefeated}`;
        fadeText('game-title', 2000, 0.4);

        killAnEnemy.innerHTML = "Kill an enemy...";
        fadeText('large-p-game1', 2000, 1);
    } 
}