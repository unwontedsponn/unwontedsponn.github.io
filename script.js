// CHANGING WORDS- on the homepage----------------------------------------------------------------------------------------------------
const array = ["websites", "apps", "games", "music", "films", "books"];
let index = 0;

const changeWord = () => {
  document.getElementById('change-word').textContent = array[index];
  // Increment index and wrap around to 0 when reaching the end of the array
  index = (index + 1) % array.length;
};

setInterval(changeWord, 1500);

// MUSIC PLAYER- in the footer, play and pause------------------------------------------------------------------------------------------
const audio = new Audio("./audio/room of my own.mp3");
const equaliser = document.getElementById('equaliser');
const playFooter = document.getElementById('play-footer');

function playPause() {
    if(audio.paused) {
        audio.play();
        document.getElementById("green-and-pine-footer").innerHTML = "<span style='color: #5f9251'>nowPlaying: 'roomOfMyOwn'</span>";
        playFooter.innerText = 'pause';
        playFooter.classList.add('nav-underline'); 
        equaliser.style.display = "block";
    }
    else {
        audio.pause();
        document.getElementById("green-and-pine-footer").innerHTML = "greenAndPine";
        playFooter.innerText = 'play';
        playFooter.classList.remove('nav-underline'); 
        equaliser.style.display = "none";
    }
}

// ABOUTPAGE- age in years calculator inside info table-------------------------------------------------------
function calculateAge() {
    const birthDate = new Date("1989-11-24");
    const currentDate = new Date();
    const ageInMilliseconds = currentDate - birthDate;
    const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
    document.getElementById("age").textContent = ageInYears;
}

calculateAge();

// PORTFOLIO TEXT APPEARANCES/DISAPPEARANCE On hover-----------------------------------------------------------------------------------------------------------------------
const toggleDisplay = (elementId, displayValue) => {
    document.getElementById(elementId).style.display = displayValue;
};

const elements = {
    website: { enter: () => toggleDisplay('website-text', 'block'), leave: () => toggleDisplay('website-text', 'none') },
    book: { enter: () => toggleDisplay('book-text', 'block'), leave: () => toggleDisplay('book-text', 'none') },
    arcade: { enter: () => toggleDisplay('arcade-text', 'block'), leave: () => toggleDisplay('arcade-text', 'none') },
    gitHub: { enter: () => toggleDisplay('github-text', 'block'), leave: () => toggleDisplay('github-text', 'none') },
    lapland: { enter: () => toggleDisplay('lapland-text', 'block'), leave: () => toggleDisplay('lapland-text', 'none') },
    shortFilm: { enter: () => toggleDisplay('short-film-text', 'block'), leave: () => toggleDisplay('short-film-text', 'none') },
    game: { enter: () => toggleDisplay('game-text', 'block'), leave: () => toggleDisplay('game-text', 'none') },
    vlog: { enter: () => toggleDisplay('vlog-text', 'block'), leave: () => toggleDisplay('vlog-text', 'none') },
    transcription: { enter: () => toggleDisplay('transcription-text', 'block'), leave: () => toggleDisplay('transcription-text', 'none') },
    showreel: { enter: () => toggleDisplay('showreel-text', 'block'), leave: () => toggleDisplay('showreel-text', 'none') }
};

// MODALS- Creates each modal with triggers and close buttons in a reusable function.
const createModal = (modalId, triggerId, closeClass) => {
    const modal = document.getElementById(modalId);
    const trigger = document.getElementById(triggerId);
    const close = document.querySelector(closeClass);

    const toggleModal = () => {
        modal.style.display = modal.style.display === "block" ? "none" : "block";
    };

    trigger.onclick = toggleModal;
    close.onclick = toggleModal;
};

createModal("myModal", "last-item", ".close");
createModal("laplandVideoModal", "lapland", ".close2");
createModal("whenWeFellVideoModal", "short-film", ".close3");
createModal("vlogVideoModal", "vlogs", ".close4");
createModal("transcriptionVideoModal", "transcription", ".close5");
createModal("showreelVideoModal", "showreel", ".close6");
createModal("cv1Modal", "cv", ".close7");

// When the user clicks anywhere outside of each modal, close it-------------------------------------------------
window.onclick = function(event) {
    const modals = [modal, modal2, modal3, modal4, modal5, modal6, modal7];

    for (let i = 0; i < modals.length; i++) {
        if (event.target === modals[i]) {
            modals[i].style.display = "none";
            if (i === 0) {
                contact.classList.remove('nav-underline');
            }
            break;
        }
    }
};

// Intersection Observer- functions to keep animations active when scrolling between pages--------------------------------------------------------------------------------------------------
// =======================================================================================
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

// observer for portfolio
const portfolioImg = document.querySelector('#portfolio-image');
const portfolioNav = document.querySelector('#portfolio-nav');

const observer3 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {          
            portfolioImg.classList.add('portfolio-img-animation');
            portfolioNav.classList.add('nav-underline');
            return;
        }
        portfolioImg.classList.remove('portfolio-img-animation');
        portfolioNav.classList.remove('nav-underline');
    });
});
observer3.observe(portfolioImg);