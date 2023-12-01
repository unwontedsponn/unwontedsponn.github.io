/**
 * navBar- Creates a modal for the contact triggers and close buttons in a reusable function.
 */
/*--------------------------------------------------------------------------------------------------------------------*/
// Reusable function for creating and handling modals
const createModal = (modal, trigger, close) => {
    const toggleModal = () => {
        modal.style.display = modal.style.display === "block" ? "none" : "block";
    };

    trigger.addEventListener('click', toggleModal);
    close.addEventListener('click', toggleModal);
};

const myModal = document.getElementById("myModal");
const lastItemTrigger = document.getElementById("last-item");
const closeModalButton = document.querySelector(".close");

createModal(myModal, lastItemTrigger, closeModalButton);

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (event) => {
    if (event.target === myModal) {
        myModal.style.display = "none";
        // Perform additional actions here if needed
    }
});