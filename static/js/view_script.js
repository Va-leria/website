const image3d = document.querySelector('.image3d');

// Function to apply random movement
function randomMovement() {
    const moveX = (Math.random() - 0.5) * 20; // Change the factor to adjust the initial movement
    const moveY = (Math.random() - 0.5) * 20; // Change the factor to adjust the initial movement
    image3d.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

// Apply random movement on page load or refresh
window.addEventListener('DOMContentLoaded', randomMovement);

// Smooth transition and follow mouse movement
image3d.addEventListener('mousemove', (e) => {
    const boundingRect = image3d.getBoundingClientRect();
    const mouseX = e.clientX - boundingRect.left;
    const mouseY = e.clientY - boundingRect.top;

    const moveX = (mouseX - boundingRect.width / 2) / 10;
    const moveY = (mouseY - boundingRect.height / 2) / 10;

    image3d.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// Smooth transition when leaving the container
image3d.addEventListener('mouseleave', () => {
    image3d.style.transition = 'transform 0.5s ease'; // Apply transition
    randomMovement(); // Apply random movement
});

// Reset transition when the transition ends
image3d.addEventListener('transitionend', () => {
    image3d.style.transition = ''; // Reset transition after it ends
});