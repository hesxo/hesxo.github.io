// Mobile Navigation Functionality
document.addEventListener('DOMContentLoaded', function () {
	const mobileMenuToggle = document.getElementById('mobileMenuToggle');
	const mobileNav = document.getElementById('mobileNav');
	const navbar = document.getElementById('navbar');
	const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

	// Mobile menu toggle functionality
	if (mobileMenuToggle && mobileNav) {
		mobileMenuToggle.addEventListener('click', function () {
			mobileMenuToggle.classList.toggle('active');
			mobileNav.classList.toggle('active');
			
			// Prevent body scroll when mobile menu is open
			if (mobileNav.classList.contains('active')) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = '';
			}
		});
	}

	// Close mobile menu when clicking on a link
	mobileNavLinks.forEach(link => {
		link.addEventListener('click', function () {
			mobileMenuToggle.classList.remove('active');
			mobileNav.classList.remove('active');
			document.body.style.overflow = '';
		});
	});

	// Close mobile menu when clicking outside
	document.addEventListener('click', function (event) {
		if (mobileNav && mobileNav.classList.contains('active')) {
			if (!mobileNav.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
				mobileMenuToggle.classList.remove('active');
				mobileNav.classList.remove('active');
				document.body.style.overflow = '';
			}
		}
	});

	// Navbar scroll effect
	if (navbar) {
		window.addEventListener('scroll', function () {
			if (window.scrollY > 50) {
				navbar.classList.add('scrolled');
			} else {
				navbar.classList.remove('scrolled');
			}
		});
	}

// Profile button functionality
function handleProfileClick() {
	// Add your profile functionality here
	console.log('Profile button clicked');
	// You can redirect to a profile page or show a modal
	alert('Profile functionality coming soon!');
}

// Modern Table Sorting for Conservation Table

document.addEventListener('DOMContentLoaded', function () {
	const table = document.getElementById('conservationTable');
	if (!table) return;
	const thead = table.querySelector('thead');
	const tbody = table.querySelector('tbody');
	const ths = thead.querySelectorAll('th[data-sort]');
	let sortCol = null;
	let sortDir = 1; // 1 = asc, -1 = desc

	ths.forEach((th, idx) => {
		th.style.cursor = 'pointer';
		th.addEventListener('click', function () {
			// Remove sort icons from all
			ths.forEach(t => t.querySelector('.sort-icon').textContent = '');
			// Toggle direction if same col
			if (sortCol === idx) {
				sortDir *= -1;
			} else {
				sortCol = idx;
				sortDir = 1;
			}
			// Set icon
			th.querySelector('.sort-icon').textContent = sortDir === 1 ? '▲' : '▼';
			// Get rows, skip summary row (with colspan)
			const rows = Array.from(tbody.querySelectorAll('tr')).filter(row => !row.querySelector('[colspan]'));
			rows.sort((a, b) => {
				let aText = a.children[idx].textContent.trim();
				let bText = b.children[idx].textContent.trim();
				// Try to parse as number
				let aNum = parseFloat(aText.replace(/[^\d.\-]/g, ''));
				let bNum = parseFloat(bText.replace(/[^\d.\-]/g, ''));
				if (!isNaN(aNum) && !isNaN(bNum)) {
					return (aNum - bNum) * sortDir;
				}
				// Otherwise, string compare
				return aText.localeCompare(bText) * sortDir;
			});
			// Re-append sorted rows
			rows.forEach(row => tbody.appendChild(row));
		});
	});
});
function sortContent() {
						const select = document.getElementById('sortSelect');
						const portfolioContent = document.getElementById('portfolioContent');
						const rows = Array.from(portfolioContent.querySelectorAll('.row'));
						
						if (!portfolioContent || rows.length === 0) return;
						
						const sortType = select.value;
						let sortedRows;
						
						switch(sortType) {
							case 'name-desc':
								sortedRows = rows.sort((a, b) => {
									const aName = a.querySelector('h5')?.textContent || '';
									const bName = b.querySelector('h5')?.textContent || '';
									return bName.localeCompare(aName);
								});
								break;
							case 'date':
								sortedRows = rows.sort((a, b) => {
									const aDate = a.dataset.date || '1900-01-01';
									const bDate = b.dataset.date || '1900-01-01';
									return new Date(bDate) - new Date(aDate);
								});
								break;
							case 'date-old':
								sortedRows = rows.sort((a, b) => {
									const aDate = a.dataset.date || '1900-01-01';
									const bDate = b.dataset.date || '1900-01-01';
									return new Date(aDate) - new Date(bDate);
								});
								break;
							default:
								// Reset to original order
								sortedRows = rows;
								break;
						}
						
						// Clear and re-append sorted rows
						rows.forEach(row => row.remove());
						sortedRows.forEach(row => portfolioContent.appendChild(row));
						
						// Add animation effect
						sortedRows.forEach((row, index) => {
							row.style.opacity = '0';
							row.style.transform = 'translateY(20px)';
							setTimeout(() => {
								row.style.transition = 'all 0.3s ease';
								row.style.opacity = '1';
								row.style.transform = 'translateY(0)';
							}, index * 100);
						});
					}
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

// Add interactive hover effects to floating elements
document.querySelectorAll('.floating-element').forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.transform = 'scale(3)';
        element.style.opacity = '1';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'scale(1)';
        element.style.opacity = '0.7';
    });
});

// Parallax effect for hero content
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Add mouse movement parallax effect
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        element.style.transform += ` translate(${x}px, ${y}px)`;
    });
});

// Add click animation to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Initialize animations when page loads
window.addEventListener('load', () => {
    // Add entrance animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Performance optimization: Throttle scroll events
let ticking = false;

function updateScrollAnimations() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${rate}px)`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollAnimations);
        ticking = true;
    }
});
function toggleMobileMenu() {
	document.getElementById("header").classList.toggle("show-mobile-nav");
}

function scrollToTop() {
	window.scrollTo({ top: 0, behavior: "smooth" });

}