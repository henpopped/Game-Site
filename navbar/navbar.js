// navbar.js

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('menu-open');
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('menu-open');
    }
});
