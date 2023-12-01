/**
 * myGame
 */
/*--------------------------------------------------------------------------------------------------------------------*/
const canvas = document.getElementById('my-canvas');

function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
}

// Call the resizeCanvas() function whenever the window is resized
window.addEventListener('resize', resizeCanvas);

// Initial call to set canvas size
resizeCanvas();

/**
 * Intersection Observer- functions to keep animations active when scrolling between pages
 */
/*--------------------------------------------------------------------------------------------------------------------*/
// observer for game
document.addEventListener('DOMContentLoaded', function () {
    const gameNav = document.querySelector('#game-nav');
    const gameTitle = document.querySelector('#game-title');
    const largePGame = document.querySelector('#large-p-game1');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gameNav.classList.add('nav-underline');
                largePGame.classList.add('large-p-game-animation');
                return;
            }
            gameNav.classList.remove('nav-underline');
            largePGame.classList.remove('large-p-game-animation');
        });
    });

    // observer.observe(document.querySelector('#canvas-container')); // Change this to the correct target element
    observer.observe(gameTitle); // Change this to the correct target element
});