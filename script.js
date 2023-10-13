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

// Call the rotateWords function to start the word rotation
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
            titleImg.classList.add('title-img-animation');
            mediumP.classList.add('medium-p-animation');
            largeP.classList.add('large-p-animation');
            smallP.classList.add('small-p-animation');
            logo.classList.add('nav-underline'); 
            return;
        }
        title.classList.remove('title-animation');
        titleImg.classList.remove('title-img-animation');
        mediumP.classList.remove('medium-p-animation');
        largeP.classList.remove('large-p-animation');
        smallP.classList.remove('small-p-animation');
        logo.classList.remove('nav-underline'); 
    });
});
observer.observe(title, titleImg);

// observer for about
const largePAbout1 = document.querySelector('#large-p-about1');
const aboutNav = document.querySelector('#about-nav');

const observer2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            largePAbout1.classList.add('large-p-about1-animation');          
            aboutNav.classList.add('nav-underline');
            return;
        }
        largePAbout1.classList.remove('large-p-about1-animation');
        aboutNav.classList.remove('nav-underline');
    });
});
observer2.observe(largePAbout1);

// observer for book
const bookTitle = document.querySelector('#book-title');
const bookNav = document.querySelector('#book-nav');
const largePBook = document.querySelector('#large-p-book2');
const bookPic = document.querySelector('#book-pic');
const bookText = document.querySelector('#book-text');
const buyNow = document.querySelector('#buy-now');
const bookSample = document.querySelector('#book-sample');

const observer3 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {       
            bookNav.classList.add('nav-underline');
            largePBook.classList.add('large-p-book-animation');   
            bookPic.classList.add('book-wiggle-animation');   
            // bookText.classList.add('book-and-text-animation');   
            // buyNow.classList.add('book-and-text-animation');   
            return;
        }
        bookNav.classList.remove('nav-underline');
        largePBook.classList.remove('large-p-book-animation'); 
        bookPic.classList.remove('book-wiggle-animation');    
        // bookText.classList.remove('book-and-text-animation');   
        // buyNow.classList.remove('book-and-text-animation');     
    });
});
observer3.observe(bookTitle, bookSample);

// observer for game
document.addEventListener('DOMContentLoaded', function () {
    const gameNav = document.querySelector('#game-nav');

    const observer4 = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gameNav.classList.add('nav-underline');
                return;
            }
            gameNav.classList.remove('nav-underline');
        });
    });

    observer4.observe(document.querySelector('#canvas-container')); // Change this to the correct target element
});