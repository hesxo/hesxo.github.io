// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Intersection Observer for section animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (!header) return;
    header.style.background = window.pageYOffset > 100
        ? 'rgba(45, 80, 22, 0.98)'
        : 'rgba(45, 80, 22, 0.95)';
});

// Show/hide scroll-to-top button
window.addEventListener('scroll', () => {
    const scrollBtn = document.querySelector('.scroll-to-top');
    const heroSection = document.querySelector('.hero-sectionc');
    if (!scrollBtn || !heroSection) return;

    const heroBottom = heroSection.getBoundingClientRect().bottom;
    scrollBtn.classList.toggle('hidden', heroBottom > 0);
});
