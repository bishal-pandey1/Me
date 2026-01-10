// Menu button functionality
const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');

menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuBtn.classList.toggle('fa-times');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navbar.contains(e.target)) {
        navbar.classList.remove('active');
        menuBtn.classList.remove('fa-times');
    }
});

// Scroll sections
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

let lastScroll = 0;
let scrollTimer;

window.addEventListener('scroll', () => {
    // Auto-hide header logic
    const currentScroll = window.pageYOffset;
    const scrollDelta = currentScroll - lastScroll;
    
    // Clear the existing timer
    clearTimeout(scrollTimer);

    // If scrolling down and past the header height
    if (currentScroll > 100) {
        header.classList.add('scrolled');
        
        if (scrollDelta > 50) {
            header.classList.add('hidden');
        } else if (scrollDelta < -10) {
            header.classList.remove('hidden');
        }
    } else {
        header.classList.remove('scrolled');
        header.classList.remove('hidden');
    }

    // Set a timer to show header after user stops scrolling
    scrollTimer = setTimeout(() => {
        header.classList.remove('hidden');
    }, 1000);

    lastScroll = currentScroll;

    // Active section highlighting
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 100;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('.navbar a[href*=' + id + ']').classList.add('active');
            });
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking a link
            navbar.classList.remove('active');
            menuBtn.classList.remove('fa-times');
        }
    });
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Update copyright year dynamically
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

