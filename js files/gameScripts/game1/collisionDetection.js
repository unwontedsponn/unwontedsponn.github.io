/**
 * Check for collision between two rectangles.
 *
 * @param {Object} rect1 - The first rectangle with properties x, y, width, and height.
 * @param {Object} rect2 - The second rectangle with properties x, y, width, and height.
 * @returns {boolean} True if collision occurs, false otherwise.
 */
/**
 * Exports
 */
/*--------------------------------------------------------------------------------------------------------------------*/  
export function collisionDetection(rect1, rect2) {
    const notColliding = (
        rect1.x > rect2.x + rect2.width ||
        rect1.x + rect1.width < rect2.x ||
        rect1.y > rect2.y + rect2.height ||
        rect1.y + rect1.height < rect2.y
    );

    return !notColliding;
}