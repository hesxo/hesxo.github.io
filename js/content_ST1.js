// =============================================
// JavaScript Enhancements for Smooth Scrolling,
// Scroll Effects, and Animations
// =============================================

// Enable smooth scrolling behavior when internal links are clicked
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor jump
        const target = document.querySelector(this.getAttribute('href'));  // Get the element the link points to
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            }); // Smoothly scroll to the target section
        }
    });
});

// Scroll the page to the top smoothly (used by scroll-to-top button)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Configure IntersectionObserver to detect when sections enter viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Add 'animate-in' class to sections as they scroll into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { // Trigger animation only when visible
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe each section for visibility to apply animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Change header background color slightly when page is scrolled
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (!header) return; // Skip if header element is missing
    header.style.background = window.pageYOffset > 100
        ? 'rgba(45, 80, 22, 0.98)'
        : 'rgba(45, 80, 22, 0.95)';
});

// Show or hide scroll-to-top button based on scroll position
window.addEventListener('scroll', () => {
    const scrollBtn = document.querySelector('.scroll-to-top');
    const heroSection = document.querySelector('.hero-sectionc');
    if (!scrollBtn || !heroSection) return; // Ensure both elements exist

    const heroBottom = heroSection.getBoundingClientRect().bottom; // Get bottom of hero section
    scrollBtn.classList.toggle('hidden', heroBottom > 0); // Hide button while still in hero
});
