/**
 * Imports
 */
/*--------------------------------------------------------------------------------------------------------------------*/  
import { toggleInput } from './gameConfig.js';

/**
 * Exports
 */
/*--------------------------------------------------------------------------------------------------------------------*/  
// Define the Input Handlers
function keyDownHandler(e) {
    if (e.key === "ArrowUp") {
        e.preventDefault(); // Prevent the default scrolling behavior
        toggleInput('upPressed', true);
    } else if (e.key === "ArrowRight") toggleInput('rightPressed', true);
    else if (e.key === "ArrowDown") toggleInput('downPressed', true);
    else if (e.key === "ArrowLeft") toggleInput('leftPressed', true);
}

function keyUpHandler(e) {
    if (e.key === "ArrowUp") toggleInput('upPressed', false);
    else if (e.key === "ArrowRight") toggleInput('rightPressed', false);
    else if (e.key === "ArrowDown") toggleInput('downPressed', false);
    else if (e.key === "ArrowLeft") toggleInput('leftPressed', false);
}

export function setupInputListeners() {
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
}
