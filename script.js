/**
 * GLOBAL FUNCTIONS
 */
/*--------------------------------------------------------------------------------------------------------------------*/
// Function to check if the screen width is smaller than 767px
function isSmallScreen() {
  return window.innerWidth < 767;
}

/**
 * CHANGING WORDS- on the homepage
 */
/*--------------------------------------------------------------------------------------------------------------------*/
const rotateWords = () => {
    const array = ["things", "websites", "games", "music", "films", "books", "sketches"];
    let index = 0;

    const changeWord = () => {
        const changeWords = document.getElementById('change-word').textContent = array[index];
        // Increment index and wrap around to 0 when reaching the end of the array
        index = (index + 1) % array.length;
    };

    setInterval(changeWord, 1500);
};
rotateWords();

/**
 * MUSIC PLAYER- in the footer, play and pause
 */
/*--------------------------------------------------------------------------------------------------------------------*/
const audio = new Audio("./audio/room of my own.mp3");
audio.volume = 0.4
const equaliser = document.getElementById('equaliser');
const playFooter = document.getElementById('play-footer');
const volumes = document.getElementsByClassName('volume');
let currentVolume = audio.volume; // Store the current volume
const volumeCount = document.getElementById("volume-count");
let volumeCountNumber = document.getElementById("volume-count-number");

// Increase / decrease the volume
function increaseVolume() {
    if (currentVolume < 1.0) {
        currentVolume += 0.1; // Increase volume by 0.1
        audio.volume = currentVolume;
        volumeCountNumber.innerHTML = currentVolume.toFixed(1);
    }
}

function decreaseVolume() {
    if (currentVolume > 0.2) {
        currentVolume -= 0.1; // Decrease volume by 0.1
        audio.volume = currentVolume;
        volumeCountNumber.innerHTML = currentVolume.toFixed(1);
    }
}

function playPause() {
    if(audio.paused) {
        audio.play();
        playFooter.innerText = 'pause';
        playFooter.classList.add('nav-underline');

        if (window.matchMedia("(max-width: 1024px)").matches) {
            // Execute JavaScript code for screens with a width of 1024 pixels or less
            volumeCount.style.display = "none";
            equaliser.style.display = "none";
        } else {
            // Execute JavaScript code for screens wider than 1366 pixels
            volumeCount.style.display = "block"
            equaliser.style.display = "block";
            document.getElementById("green-and-pine-footer").innerHTML = "<span style='color: #5f9251'>nowPlaying: 'roomOfMyOwn'</span>";

            // Loop through the volume elements and set their display to "block"
            for (var i = 0; i < volumes.length; i++) {
                volumes[i].style.display = "block";
            }
        }
        
    }
    else {
        audio.pause();
        document.getElementById("green-and-pine-footer").innerHTML = "greenAndPine";
        volumeCount.style.display = "none"
        playFooter.innerText = 'play';
        playFooter.classList.remove('nav-underline'); 
        equaliser.style.display = "none";

        // Loop through the volume elements and set their display to "none"
        for (var i = 0; i < volumes.length; i++) {
            volumes[i].style.display = "none";
        }
    }
}

/**
 * ABOUTPAGE- age in years calculator inside info table
 */
/*--------------------------------------------------------------------------------------------------------------------*/
// Changes age in bio automatically
function calculateAge() {
    const birthDate = new Date("1989-11-24");
    const currentDate = new Date();
    const ageInMilliseconds = currentDate - birthDate;
    const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
    document.getElementById("age").textContent = ageInYears;
}
calculateAge();

// Make summary text appear one letter at a time
const textContainer = document.getElementById("about-summary");
const text = "Following a 15yr career as a business owner, offering music/audio services, I transitioned into pastures new. I up-skilled in web development before securing a scholarship on a competitive Software Engineering & Data Science course, competing against 20,000 other applicants, and I now spend my time combining my love for all things tech, music and art.";
let index = 0;
let interval;

// Function to add a letter to the text container
function addLetterAbout() {
  if (index < text.length) {
    textContainer.innerHTML += text.charAt(index);
    index++;
  } else {
    clearInterval(interval); // Stop when all letters are displayed
  }
}
// Start the interval when the about section is scrolled into view
function startTextAnimation() {
  if (!isTextAnimationRunning && isSmallScreen()) {
    isTextAnimationRunning = true;
    interval = setInterval(addLetterAbout, 50);
  }
}

// Stop the interval when the about section is scrolled out of view
function stopTextAnimation() {
    isTextAnimationRunning = false;
    clearInterval(interval);
}

/**
 * Lone Legends Game
 */
/*--------------------------------------------------------------------------------------------------------------------*/
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;

  // Redraw your content or update your canvas here
}

// Call the resizeCanvas() function whenever the window is resized
window.addEventListener('resize', resizeCanvas);

// Initial call to set canvas size
resizeCanvas();

/**
 * MODALS- Creates each modal with triggers and close buttons in a reusable function.
 */
/*--------------------------------------------------------------------------------------------------------------------*/
// Store modal elements in an object
const modals = {
    "myModal": document.getElementById("myModal"),
};

const createModal = (modalId, triggerId, closeClass) => {
    const modal = modals[modalId];
    const trigger = document.getElementById(triggerId);
    const close = document.querySelector(closeClass);

    const toggleModal = () => {
        modal.style.display = modal.style.display === "block" ? "none" : "block";
    };

    trigger.onclick = toggleModal;
    close.onclick = toggleModal;
};

createModal("myModal", "last-item", ".close");

// When the user clicks anywhere outside of each modal, close it
window.onclick = function(event) {
    for (const modalId in modals) {
        if (event.target === modals[modalId]) {
            modals[modalId].style.display = "none";
            // Perform additional actions here if needed
            break;
        }
    }
};

/**
 * Intersection Observer- functions to keep animations active when scrolling between pages
 */
/*--------------------------------------------------------------------------------------------------------------------*/
// observer for title-screen
const title = document.querySelector('#title');
const titleImg = document.querySelector('#title-img');
const mediumP = document.querySelector('#medium-p-homepage');
const largeP = document.querySelector('#large-p-homepage');
const smallP = document.querySelector('#small-p-homepage');
const logo = document.querySelector('#logo');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            title.classList.add('title-animation');
            title.classList.add('title-appear');
            titleImg.classList.add('title-img-animation');
            titleImg.classList.add('ben-pic-fade');
            mediumP.classList.add('medium-p-animation');
            largeP.classList.add('large-p-animation');
            smallP.classList.add('small-p-animation');
            logo.innerHTML = "benSpooner";
            logo.classList.add('nav-underline'); 
            return;
        }
        title.classList.remove('title-animation');
        titleImg.classList.remove('title-img-animation');
        title.classList.remove('title-appear');
        titleImg.classList.remove('ben-pic-fade');
        mediumP.classList.remove('medium-p-animation');
        largeP.classList.remove('large-p-animation');
        smallP.classList.remove('small-p-animation');
        logo.classList.remove('nav-underline'); 
    });
});
observer.observe(title, titleImg);

// observer for about
const about = document.querySelector('#about');
const largePAbout1 = document.querySelector('#large-p-about1');
const aboutNav = document.querySelector('#about-nav');

const observer2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            largePAbout1.classList.add('large-p-about1-animation');          
            aboutNav.classList.add('nav-underline');
        } else {
            largePAbout1.classList.remove('large-p-about1-animation');
            aboutNav.classList.remove('nav-underline');
        }
    });
});
observer2.observe(largePAbout1);

// observer for about on devices 767px and smaller
if (window.innerWidth <= 767) {
    const about = document.querySelector('#about');
    const piano = document.querySelector('#piano-img');
    const codeImg = document.querySelector('#code-img');
    let isPianoVisible = true; // Starting with piano visible
    const summary = document.querySelector('#about-summary');
    let isTextAnimationRunning = false; // Flag to track animation state

    const observer3 = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {        
                summary.classList.add('about-summary-appear');
                
                logo.innerHTML = "aboutMe";

                if (!isTextAnimationRunning) {
                    startTextAnimation(); // Start animation only if it's not already running
                    isTextAnimationRunning = true;
                }

                // Function to toggle between piano and codeImg
                function toggleImages() {
                    if (isPianoVisible) {
                        // If piano is currently displayed, start its fade-out animation
                        piano.classList.add('piano-and-code-fade');
                        piano.addEventListener('animationend', () => {
                            piano.style.display = 'none';
                            codeImg.style.display = 'block';
                            codeImg.classList.add('piano-and-code-fade');
                            isPianoVisible = false;
                        }, { once: true });
                    } else {
                        // If codeImg is currently displayed, start its fade-out animation
                        codeImg.classList.add('piano-and-code-fade');
                        codeImg.addEventListener('animationend', () => {
                            codeImg.style.display = 'none';
                            piano.style.display = 'block';
                            piano.classList.add('piano-and-code-fade');
                            isPianoVisible = true;
                        }, { once: true });
                    }
                }
                toggleImages(); // Initial image toggle

                // Set an interval to repeatedly toggle the images
                const imageSwitchInterval = setInterval(toggleImages, 6000); // Switch every 6 seconds (adjust the duration as needed)

            } else {
                summary.classList.remove('about-summary-appear');

                stopTextAnimation(); // Stop animation when the section is out of view
                isTextAnimationRunning = false;
            }
        });
    }, {
        threshold: 0.2, // Adjust as needed
        rootMargin: '0px 0px 0px 0px' // Adjust the margins if necessary
    });
    observer3.observe(about);
}

// observer for book
const bookTitle = document.querySelector('#book-title');
const bookNav = document.querySelector('#book-nav');
const largePBook = document.querySelector('#large-p-book2');
const bookPic = document.querySelector('#book-pic');
const buyNow = document.querySelector('#buy-now');

const observer4 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {       
            bookNav.classList.add('nav-underline');
            largePBook.classList.add('large-p-book-animation');   
            bookPic.classList.add('book-wiggle-animation');
            bookPic.classList.add('book-img-fade');     
            buyNow.classList.add('book-text-appear');
            
            if (isSmallScreen()) logo.innerHTML = "myBook";
            return;
        }
        bookNav.classList.remove('nav-underline');
        largePBook.classList.remove('large-p-book-animation'); 
        bookPic.classList.remove('book-wiggle-animation');  
        bookPic.classList.remove('book-img-fade');  
        buyNow.classList.remove('book-text-appear');   


    });
});
observer4.observe(bookPic);

// observer for game
document.addEventListener('DOMContentLoaded', function () {
    const gameNav = document.querySelector('#game-nav');

    const observer5 = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gameNav.classList.add('nav-underline');
                return;
            }
            gameNav.classList.remove('nav-underline');
        });
    });

    observer5.observe(document.querySelector('#canvas-container')); // Change this to the correct target element
});