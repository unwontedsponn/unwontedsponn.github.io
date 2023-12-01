/**
 * CHANGING WORDS
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
 * Intersection Observer
 */
/*--------------------------------------------------------------------------------------------------------------------*/
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