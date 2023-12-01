/**
 * Exports
 */
/*--------------------------------------------------------------------------------------------------------------------*/  
// Function to add a flash overlay when player dies or enters new level
export function flashOverlay(id, rgba1, rgba2, rgba3, duration, callback) {
    const emptyNavElement = document.getElementById('empty-nav');
    const overlayElement = document.getElementById(id);

    const rgbaColor1 = `rgba(${rgba1}, ${rgba2}, ${rgba3}, 1)`;
    const rgbaColor0 = `rgba(${rgba1}, ${rgba2}, ${rgba3}, 0)`;

    // Trigger the flash effect by changing the background color
    emptyNavElement.style.color = rgbaColor1;
    overlayElement.style.background = rgbaColor1;

    // After a short delay, reset the background color back to transparent
    setTimeout(() => {
        emptyNavElement.style.color = rgbaColor0;
        overlayElement.style.background = rgbaColor0;

        // Execute the callback function
        if (typeof callback === 'function') callback();

    }, duration); // Adjust the duration to match your desired flash duration
}

export function fadeText(id, fadeDuration, opacity, callback) {
    const element = document.getElementById(`${id}`);

    // Fade out
    element.style.transition = `opacity ${fadeDuration / 1000}s`;
    element.style.opacity = opacity;

    // Call the callback function after the fade duration
    setTimeout(() => {
        // Check if the callback is a function before calling it
        if (typeof callback === 'function') {
            callback();
        }
    }, fadeDuration);
}