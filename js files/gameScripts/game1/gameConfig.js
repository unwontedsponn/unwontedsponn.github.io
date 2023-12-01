/**
 * Canvas Context
 */
export const canvas = document.getElementById('my-canvas');
export const ctx = canvas.getContext('2d');

/**
 * Game State
 */
export let gameState = {
  gameRunning: true,
  gameWon: false, // Not used yet
  gameLost: false // Not used yet
}
export const toggleGameState = (property, newValue) => {gameState[property] = newValue};

/**
 * Game Settings
 */
export let gameSettings = {
  level: 0,
  score: 0,
  highScore: 0,
  enemiesDefeated: 0,
  timesPlayedTheGame: 0,
  targetFPS: 60,
  frame: 0,
  fInterval: 60,
  fIntervalObstacles: 180,
  initialLineLength: 0
}
export const setGameSettings = (property, newValue) => {gameSettings[property] = newValue};

/**
 * Input
 */
export let input = {
  upPressed: false,
  leftPressed: false,
  downPressed: false,
  rightPressed: false
}
export const toggleInput = (property, newValue) => {input[property] = newValue};

/**
 * Colors
 */
export const colours = {
  playerColour: "#407dbf",
  titleColour: "#acddfb",
  playerColourPowerUp: "gold",
  enemyColour: "#3f423e",
  edibleColour: "#c15564",
  powerUpColour: "#4a713f",
  levelCompleteColour: "#334862",
  obstacleColour: "#334862",
  lineColour: "#c15564"
}

/**
 * Game Attributes
 */
export let gameAttributes = {
  cellSize: 20,
  edibleSize: 15,
  characters: {
    enemySlowSpeed: 3,
    enemyMediumSpeed: 5,
    enemyFastSpeed: 9
  },
};
export const setGameAttributes = (property, newValue) => {gameAttributes.characters[property] = newValue};

/**
 * Collections
 */
export const edibles = [];
export const resetEdibles = () => edibles.length = 0;
export const enemies = [];
export const resetEnemies = () => enemies.length = 0;
export const powerUp = [];
export const resetPowerUp = () => powerUp.length = 0;
export const particles = [];
export const resetParticles = () => particles.length = 0;
export const obstacles = [];

/**
 * Power-Up Collected
 */
export let powerUpCollected = false;
export const powerUpCollectedToggle = newValue => (powerUpCollected = newValue);