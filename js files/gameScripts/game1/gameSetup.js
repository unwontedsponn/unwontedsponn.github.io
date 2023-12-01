/**
 * Imports
 */
/*--------------------------------------------------------------------------------------------------------------------*/  
import {
    toggleGameState,
    gameSettings, setGameSettings,
    gameAttributes, setGameAttributes, resetEnemies, resetPowerUp, powerUpCollectedToggle
} from './gameConfig.js';
import { Line } from './line.js';
import { fadeText } from './uiAnimation.js';

/**
 * Variables
 */
/*--------------------------------------------------------------------------------------------------------------------*/  
export let topLine = new Line(canvas.width, 0, 5, 0, 'horizontal');
export let bottomLine = new Line(0, canvas.height - 5, 5, 0, 'horizontal');
export let leftLine = new Line(0, canvas.height, 0, 5, 'vertical');
export let rightLine = new Line(canvas.width - 5, 0, 0, 5, 'vertical');
export let lineLengthIncreaseDivisionCount = 5;
export let lineLengthIncreaseWidth = canvas.width / lineLengthIncreaseDivisionCount;
export let lineLengthIncreaseHeight = canvas.height / lineLengthIncreaseDivisionCount;

/**
 * Exports
 */
/*--------------------------------------------------------------------------------------------------------------------*/  

export function newGame() {
    toggleGameState('gameRunning', true);
    setGameAttributes('enemySlowSpeed', 3);
    setGameAttributes('enemyMediumSpeed', 5);
    setGameAttributes('enemyFastSpeed', 9);
    setGameSettings('fInterval', 60);
    setGameSettings('level', 0);
    setGameSettings('score', 0);
    setGameSettings('enemiesDefeated', 0);
    setGameSettings('timesPlayedTheGame', gameSettings.timesPlayedTheGame + 1);
    resetEnemies();

    // Reset the lines to their initial states
    topLine = new Line(canvas.width, 0, 5, 0, 'horizontal');
    bottomLine = new Line(0, canvas.height - 5, 5, 0, 'horizontal');
    leftLine = new Line(0, canvas.height, 0, 5, 'vertical');
    rightLine = new Line(canvas.width - 5, 0, 0, 5, 'vertical');

    // Reset linelengthIncrease
    lineLengthIncreaseDivisionCount = 5;

    // Recalculate linelengthIncreaseWidth and linelengthIncreaseHeight
    lineLengthIncreaseWidth = canvas.width / lineLengthIncreaseDivisionCount;
    lineLengthIncreaseHeight = canvas.height / lineLengthIncreaseDivisionCount;
}

export function nextLevel() {
    powerUpCollectedToggle(false); // Reset powerUpCollected to false
    resetPowerUp();
    setGameSettings('score', 0);
    setGameAttributes('enemySlowSpeed', gameAttributes.characters.enemySlowSpeed + 2);
    setGameAttributes('enemyMediumSpeed', gameAttributes.characters.enemyMediumSpeed + 2);
    setGameAttributes('enemyFastSpeed', gameAttributes.characters.enemyFastSpeed + 2);
    setGameSettings('fInterval', gameSettings.fInterval - 5);
    setGameSettings('level', gameSettings.level + 1);

    // Reset the lines to their initial states
    topLine = new Line(canvas.width, 0, 5, 0, 'horizontal');
    bottomLine = new Line(0, canvas.height - 5, 5, 0, 'horizontal');
    leftLine = new Line(0, canvas.height, 0, 5, 'vertical');
    rightLine = new Line(canvas.width - 5, 0, 0, 5, 'vertical');

    // Shorten linelengthIncrease
    lineLengthIncreaseDivisionCount *= 1.5;

    // Recalculate linelengthIncreaseWidth and linelengthIncreaseHeight
    lineLengthIncreaseWidth = canvas.width / lineLengthIncreaseDivisionCount;
    lineLengthIncreaseHeight = canvas.height / lineLengthIncreaseDivisionCount;

    // Fade title text over 2 seconds
    fadeText('game-title', 2000, 0);

    // Fading out instructions over 2 seconds, and then call try-not-to-die text
    fadeText('large-p-game1', 2000, 0, () => {
        
        // If player hits an enemy, immediately fade try-not-to-die instructions to 0 opacity
        if (gameSettings.level === 0) fadeText('level-complete', 0, 0);

        // Fade in 'try not to die' instructions over 1 second
        else {
            fadeText('level-complete', 2000, 0.2);

            // Fade out "try not to die" after 1 second
            setTimeout(() => {
                fadeText('level-complete', 1000, 0);
            }, 2000);
        }
    });
}