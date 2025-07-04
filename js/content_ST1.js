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


        // Add animation classes on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (window.pageYOffset > 100) {
                header.style.background = 'rgba(45, 80, 22, 0.98)';
            } else {
                header.style.background = 'rgba(45, 80, 22, 0.95)';
            }
        });
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.addEventListener("scroll", () => {
    const scrollBtn = document.querySelector(".scroll-to-top");
    const heroSection = document.querySelector(".hero-sectionc");
    if (!scrollBtn || !heroSection) return;

    const heroBottom = heroSection.getBoundingClientRect().bottom;
    if (heroBottom > 0) {
        scrollBtn.classList.add("hidden");
    } else {
        scrollBtn.classList.remove("hidden");
    }
});