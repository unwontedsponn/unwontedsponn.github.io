/**
 * Things to fix/implement
 */
/*--------------------------------------------------------------------------------------------------------------------*/   

// Make enemies2 be spawned at random times, not the same time as enemies1

// The PowerUp to spawn every 5 seconds, instead of constantly when not collided with
// 'Collectibles' - perhaps items that give more points - like a 5 pointer...
// Timer?
// High Score
// Checkpoints- like, when you reach level 5, if you die you restart from there...
// Upgrade
// Puzzles
// Boss Battle
// Acheivements - quickest level completeion... etc
// Narrative



// Frame Rate: Your game loop is running constantly at the maximum frame rate, which can put a heavy load on the browser. Consider using requestAnimationFrame to control the frame rate and ensure that your game loop is not running faster than the screen can refresh.

// Memory Management: Creating and destroying objects like enemies, power-ups, and obstacles dynamically can cause memory leaks over time. Make sure to properly clean up and remove objects that are no longer in use to free up memory.

// Collision Detection: Repeatedly checking for collisions with all game objects in each frame can be computationally expensive. Optimize collision detection by using spatial partitioning techniques like quadtrees or a grid system to reduce the number of collision checks.

// Audio: You've commented out the import of the Tone library, but if you later decide to use it for audio, be cautious about its impact on performance. Loading and playing audio can be resource-intensive.

// Power-Up Respawn: The power-up respawn logic may need optimization. Instead of constantly checking for collisions with the player, you can use a timer to respawn the power-up after a fixed interval.

// Obstacle Generation: Generating obstacles at every frame may be excessive. Consider generating obstacles less frequently or at specific intervals to reduce the load on the CPU.

// Global Variables: Using global variables for game state can lead to unexpected behavior and make debugging difficult. Try encapsulating your game state and logic in an object-oriented or functional programming approach to improve code organization.

// Mouse Over Canvas: The isMouseOverCanvas variable doesn't appear to be used in the provided code snippet. Ensure it serves a purpose, or remove it if it's unnecessary.

// Optimize Drawing: Drawing operations in Canvas can also be resource-intensive. Optimize drawing by only updating and rendering objects that are visible on the screen, and avoid redrawing static elements.

// Error Handling: Ensure that your code has proper error handling in case of unexpected events or exceptions that could lead to freezing.

// Browser Dev Tools: Use browser developer tools to profile your game's performance. Check for CPU and memory usage, and look for bottlenecks in your code.

// Testing: Test your game on different browsers and devices to ensure it performs well across various environments.