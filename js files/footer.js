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
            for (let i = 0; i < volumes.length; i++) {
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
        for (let i = 0; i < volumes.length; i++) {
            volumes[i].style.display = "none";
        }
    }
}