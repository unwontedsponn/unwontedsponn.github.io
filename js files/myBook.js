/**
 * Intersection Observer- functions to keep animations active when scrolling between pages
 */
/*--------------------------------------------------------------------------------------------------------------------*/
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