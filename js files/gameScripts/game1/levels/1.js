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

    // Fade title text over 4 seconds
    fadeText('game-title', 2000, 0);

    // Fading out instructions over 2 seconds
    fadeText('large-p-game1', 2000, 0);

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