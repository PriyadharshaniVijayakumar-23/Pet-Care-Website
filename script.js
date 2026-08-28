// Mobile Menu

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});


// Close mobile menu after clicking a link

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (item) {
    item.addEventListener("click", function () {
        navLinks.classList.remove("active");
    });
});


// Contact Modal

const contactBtn = document.getElementById("contactBtn");
const contactModal = document.getElementById("contactModal");
const closeBtn = document.getElementById("closeBtn");

contactBtn.addEventListener("click", function () {
    contactModal.style.display = "flex";
});

closeBtn.addEventListener("click", function () {
    contactModal.style.display = "none";
});


// Close modal when clicking outside

contactModal.addEventListener("click", function (event) {
    if (event.target === contactModal) {
        contactModal.style.display = "none";
    }
});


// Contact Form

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    alert("Thank you! Your message has been received. 🐾");

    contactForm.reset();

    contactModal.style.display = "none";
});