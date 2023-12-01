/**
 * aboutMe - DEVICES 1367px AND BIGGER
 */
/*--------------------------------------------------------------------------------------------------------------------*/
// Changes age in bio table automatically
function calculateAge() {
    const birthDate = new Date("1989-11-24");
    const currentDate = new Date();
    const ageInMilliseconds = currentDate - birthDate;
    const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
    document.getElementById("age").textContent = ageInYears;
}
calculateAge();

// Intersection Observer
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

/**
 * aboutMe - DEVICES 1367px AND SMALLER
 */
/*--------------------------------------------------------------------------------------------------------------------*/
// Constants for the about section text animation
const aboutSummary = document.getElementById("about-summary");
const aboutText = "Following a 15yr career as a business owner, offering music/audio services, I transitioned into pastures new. I up-skilled in web development before securing a scholarship on a competitive Software Engineering & Data Science course, competing against 20,000 other applicants, and I now spend my time combining my love for all things tech, music and art.";
let aboutTextIndex = 0;
let aboutTextInterval;

// Function to check if the screen width is smaller than 1366px
const isSmallScreen = () => window.innerWidth <= 1366;

// Function to toggle the about section text
const toggleAboutText = () => {
    if (aboutTextIndex < aboutText.length) {
        aboutSummary.innerHTML += aboutText.charAt(aboutTextIndex);
        aboutTextIndex++;
    } else {
        clearInterval(aboutTextInterval);
    }
};

// Function to start the about section text animation
const startAboutTextAnimation = () => {
    if (!isTextAnimationRunning && isSmallScreen()) {
        isTextAnimationRunning = true;
        aboutTextInterval = setInterval(toggleAboutText, 50);
    }
};

// Function to stop the about section text animation
const stopAboutTextAnimation = () => {
    isTextAnimationRunning = false;
    clearInterval(aboutTextInterval);
};

if (isSmallScreen()) {
    const about = document.querySelector('#about');
    const piano = document.querySelector('#piano-img');
    const codeImg = document.querySelector('#code-img');
    let isPianoVisible = true;
    let isTextAnimationRunning = false;

    // Function to toggle between piano and codeImg
    const toggleImages = () => {
        if (isPianoVisible) {
            piano.classList.add('piano-and-code-fade');
            piano.addEventListener('animationend', () => {
                piano.style.display = 'none';
                codeImg.style.display = 'block';
                codeImg.classList.add('piano-and-code-fade');
                isPianoVisible = false;
            }, { once: true });
        } else {
            codeImg.classList.add('piano-and-code-fade');
            codeImg.addEventListener('animationend', () => {
                codeImg.style.display = 'none';
                piano.style.display = 'block';
                piano.classList.add('piano-and-code-fade');
                isPianoVisible = true;
            }, { once: true });
        }
    };

    // Interval to repeatedly toggle the images
    const imageSwitchInterval = setInterval(toggleImages, 6000);

    // Intersection Observer for the about section
    const observer3 = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutSummary.classList.add('about-summary-appear');
                logo.innerHTML = "aboutMe";

                if (!isTextAnimationRunning) {
                    startAboutTextAnimation();
                    isTextAnimationRunning = true;
                }
            } else {
                aboutSummary.classList.remove('about-summary-appear');
                stopAboutTextAnimation();
                isTextAnimationRunning = false;
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px 0px 0px'
    });
    observer3.observe(about);
}