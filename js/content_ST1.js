const goToTopButton = document.querySelector('.go-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        goToTopButton.style.display = 'block';
    } else {
        goToTopButton.style.display = 'none';
    }
});

goToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scrollspy for right-side scroll menu
const sectionIds = [
    { id: 'types-of-biodiversity', nav: 'nav-biodiversity' },
    { id: 'threats', nav: 'nav-threats' },
    { id: 'ecosystem-services', nav: 'nav-services' },
    { id: 'conservation-strategies', nav: 'nav-conservation' }
];

window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY || document.documentElement.scrollTop;
    sectionIds.forEach(({ id, nav }) => {
        const section = document.getElementById(id);
        const navLink = document.getElementById(nav);
        if (section && navLink) {
            const offsetTop = section.offsetTop - 120;
            const offsetBottom = offsetTop + section.offsetHeight;
            if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
});