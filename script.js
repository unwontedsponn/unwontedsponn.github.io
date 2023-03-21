// CHANGING WORD ON HOMEPAGE---------------------------------------------------------
const array = ["things", "websites", "music", "films", "books", "games"]
let changingWord = document.getElementById('change-word');
let index = 0;

setInterval(changeWord, 1500);

function changeWord() {
    if (index < 7) {
        changingWord.textContent = array[index];
        index++;
    }
    if (index === 7) {
        index = 0;
        changeWord();
    }
}

// music player play and pause----------------------------------------------------------------------------------------------------------------------------------------------------------------
const audio = new Audio("./audio/room of my own.mp3");
const equaliser = document.getElementById('equaliser');
let playFooter = document.getElementById('play-footer');

function playPause() {
    if(audio.paused) {
        audio.play();
        document.getElementById("green-and-pine-footer").innerHTML = "<span style='color: #5f9251'>nowPlaying: 'roomOfMyOwn'</span>";
        document.getElementById('play-footer').innerText = 'pause';
        playFooter.classList.add('nav-underline'); 
        equaliser.style.display = "block";
    }
    else {
        audio.pause();
        document.getElementById("green-and-pine-footer").innerHTML = "greenAndPine";
        document.getElementById('play-footer').innerText = 'play';
        playFooter.classList.remove('nav-underline'); 
        equaliser.style.display = "none";
    }
}

// check that about's step animation has ended--------------------------------------------------------------------------------------------------
const aboutText = document.getElementById("large-p-about1");
    const aboutText2 = document.getElementById("large-p-about2");
    aboutText.addEventListener("animationend", () => {
    aboutText2.style.display = "block";
    });

// Intersection Observer functions to keep animations active when scrolling between pages--------------------------------------------------------------------------------------------------
// observer for title-screen
const title = document.querySelector('#title');
const titleImg = document.querySelector('#title-img');
const logo = document.querySelector('#logo');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            title.classList.add('title-animation');
            titleImg.classList.add('title-img-animation');
            logo.classList.add('nav-underline'); 
            return;
        }
        title.classList.remove('title-animation');
        titleImg.classList.remove('title-img-animation');
        logo.classList.remove('nav-underline'); 
    });
});
observer.observe(title, titleImg);

// observer for about
const largePAbout1 = document.querySelector('#large-p-about1');
const largePAbout2 = document.querySelector('#large-p-about2');
const aboutNav = document.querySelector('#about-nav');

const observer2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            largePAbout1.classList.add('large-p-about1-animation');            
            largePAbout2.classList.add('large-p-about2-animation');
            aboutNav.classList.add('nav-underline');
            return;
        }
        largePAbout1.classList.remove('large-p-about1-animation');
        largePAbout2.classList.remove('large-p-about2-animation');
        largePAbout2.style.display = "none";
        aboutNav.classList.remove('nav-underline');
    });
});
observer2.observe(largePAbout1, largePAbout2);

// observer for portfolio
const portfolioImg = document.querySelector('#portfolio-image');
const portfolioNav = document.querySelector('#portfolio-nav');
const portfolioImg2 = document.querySelector('#portfolio-image2');

const observer3 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {          
            portfolioImg.classList.add('portfolio-img-animation');
            portfolioNav.classList.add('nav-underline');
            portfolioImg2.classList.add('portfolio-img2-animation');
            return;
        }
        portfolioImg.classList.remove('portfolio-img-animation');
        portfolioNav.classList.remove('nav-underline');
        portfolioImg2.classList.remove('portfolio-img2-animation');
    });
});
observer3.observe(portfolioImg, portfolioImg2);

// PORTFOLIO TEXT APPEARANCES-----------------------------------------------------------------------------------------------------------------------
// expanded lists
// function webDevEnter() {
//     document.getElementById('webDevList').style.display = "block";
// }

// function webDevLeave() {
//     webDevList = document.getElementById('webDevList');
//     if (webDevList) {
//     // Do something..
//     }



//     if (bookEnter() && arcadeEnter()) {
//         document.getElementById('webDevList').style.display = "block";
//     } else {
//         document.getElementById('webDevList').style.display = "none";
//     }
// }

// function dataScienceEnter() {
//     document.getElementById('dataScienceList').style.display = "block";
// }

// function dataScienceLeave() {
//     if (bookLeave() && arcadeLeave() && dataScienceLeave()) {
//         document.getElementById('dataScienceList').style.display = "none";
//     }
// }

// function audioProjectsEnter() {
//     document.getElementById('audioProjectsList').style.display = "block";
// }

// function audioProjectsLeave() {
//     if (bookLeave() && arcadeLeave() && webDevLeave()) {
//         document.getElementById('audioProjectsList').style.display = "none";
//     }
// }

// expanded text
function websiteEnter() {
    document.getElementById('website-text').style.display = "block";
}

function websiteLeave() {
    document.getElementById('website-text').style.display = "none";
}

function bookEnter() {
    document.getElementById('book-text').style.display = "block";
}

function bookLeave() {
    document.getElementById('book-text').style.display = "none";
}

function arcadeEnter() {
    document.getElementById('arcade-text').style.display = "block";   
}

function arcadeLeave() {
    document.getElementById('arcade-text').style.display = "none";
}

function laplandEnter() {
    document.getElementById('lapland-text').style.display = "block";
}

function laplandLeave() {
    document.getElementById('lapland-text').style.display = "none";
}

function shortFilmEnter() {
    document.getElementById('short-film-text').style.display = "block";
    document.getElementById('short-film-list').style.display = "block";  
}

function shortFilmLeave() {
    document.getElementById('short-film-text').style.display = "none";
    document.getElementById('short-film-list').style.display = "none";  
}

function gameEnter() {
    document.getElementById('game-text').style.display = "block";    
}

function gameLeave() {
    document.getElementById('game-text').style.display = "none";
}

function vlogsEnter() {
    document.getElementById('vlog-text').style.display = "block";
}

function vlogsLeave() {
    document.getElementById('vlog-text').style.display = "none";
}

function transcriptionEnter() {
    document.getElementById('transcription-text').style.display = "block";
}

function transcriptionLeave() {
    document.getElementById('transcription-text').style.display = "none";
}

function showreelEnter() {
    document.getElementById('showreel-text').style.display = "block";
}

function showreelLeave() {
    document.getElementById('showreel-text').style.display = "none";
}

// MODAL FOR CONTACT---------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Get the modal
const modal = document.getElementById("myModal");

// Get the contact nav that opens the modal
const contact = document.getElementById("last-item");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the contact nav, open the modal 
contact.onclick = function() {
    modal.style.display = "block";
    contact.classList.add('nav-underline'); 
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    contact.classList.remove('nav-underline'); 
}

// MODAL FOR LAPLAND VIDEO---------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Get the modal
const modal2 = document.getElementById("laplandVideoModal");

// Get the lapland link that opens the modal
const lapland = document.getElementById("lapland");

// When the user clicks on the lapland title, open the modal 
lapland.onclick = function() {
    modal2.style.display = "block";
}

// Get the <span> element that closes the modal
const span2 = document.getElementsByClassName("close2")[0];
// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
    modal2.style.display = "none";
}

// MODAL FOR WHEN WE FELL VIDEO---------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Get the modal
const modal3 = document.getElementById("whenWeFellVideoModal");

// Get the shortFilm link that opens the modal
const shortFilm = document.getElementById("short-film");

// When the user clicks on the shortFilm title, open the modal 
shortFilm.onclick = function() {
    modal3.style.display = "block";
}

// Get the <span> element that closes the modal
const span3 = document.getElementsByClassName("close3")[0];
// When the user clicks on <span> (x), close the modal
span3.onclick = function() {
    modal3.style.display = "none";
}

// MODAL FOR VLOG---------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Get the modal
const modal4 = document.getElementById("vlogVideoModal");

// Get the vlog link that opens the modal
const vlog = document.getElementById("vlogs");

// When the user clicks on the vlog title, open the modal 
vlog.onclick = function() {
    modal4.style.display = "block";
}

// Get the <span> element that closes the modal
const span4 = document.getElementsByClassName("close4")[0];
// When the user clicks on <span> (x), close the modal
span4.onclick = function() {
    modal4.style.display = "none";
}

// MODAL FOR TRANSCRIPTION---------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Get the modal
const modal5 = document.getElementById("transcriptionVideoModal");

// Get the showreel link that opens the modal
const transcription = document.getElementById("transcription");

// When the user clicks on the vlog title, open the modal 
transcription.onclick = function() {
    modal5.style.display = "block";
}

// Get the <span> element that closes the modal
const span5 = document.getElementsByClassName("close5")[0];
// When the user clicks on <span> (x), close the modal
span5.onclick = function() {
    modal5.style.display = "none";
}

// MODAL FOR SHOWREEL---------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Get the modal
const modal6 = document.getElementById("showreelVideoModal");

// Get the showreel link that opens the modal
const showreel = document.getElementById("showreel");

// When the user clicks on the vlog title, open the modal 
showreel.onclick = function() {
    modal6.style.display = "block";
}

// Get the <span> element that closes the modal
const span6 = document.getElementsByClassName("close6")[0];
// When the user clicks on <span> (x), close the modal
span6.onclick = function() {
    modal6.style.display = "none";
}

// When the user clicks anywhere outside of the modals, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        contact.classList.remove('nav-underline'); 
    }
    if (event.target == modal2) {
        modal2.style.display = "none";
        iframe.pause();
    }
    if (event.target == modal3) {
        modal3.style.display = "none";
    }
    if (event.target == modal4) {
        modal4.style.display = "none";
    }
    if (event.target == modal5) {
        modal5.style.display = "none";
    }
    if (event.target == modal6) {
        modal6.style.display = "none";
    }
}