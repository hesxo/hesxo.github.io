
function throttle(fn, wait) {
	let lastTime = 0;
	return function (...args) {
		const now = Date.now();
		if (now - lastTime >= wait) {
			lastTime = now;
			fn.apply(this, args);
		}
	};
}

// Initializes mobile navigation:
// Toggles visibility of the menu when the hamburger icon is clicked
// Closes the menu when a link is clicked or the user clicks outside
// Locks body scroll when menu is open
// Adds/removes a "scrolled" class on the navbar for styling purposes
function initMobileNavigation() {
	const mobileMenuToggle = document.getElementById('mobileMenuToggle');
	const mobileNav = document.getElementById('mobileNav');
	const navbar = document.getElementById('navbar');
	const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

	// Toggle mobile menu on hamburger click
	if (mobileMenuToggle && mobileNav) {
		mobileMenuToggle.addEventListener('click', () => {
			mobileMenuToggle.classList.toggle('active');
			mobileNav.classList.toggle('active');
			document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
		});
	}

	// Close mobile menu when a link is clicked
	mobileNavLinks.forEach(link => {
		link.addEventListener('click', () => {
			mobileMenuToggle.classList.remove('active');
			mobileNav.classList.remove('active');
			document.body.style.overflow = '';
		});
	});

	// Close mobile menu when clicking outside
	document.addEventListener('click', (event) => {
		if (
			mobileNav &&
			mobileNav.classList.contains('active') &&
			!mobileNav.contains(event.target) &&
			!mobileMenuToggle.contains(event.target)
		) {
			mobileMenuToggle.classList.remove('active');
			mobileNav.classList.remove('active');
			document.body.style.overflow = '';
		}
	});

	// Add 'scrolled' class to navbar when page is scrolled
	if (navbar) {
		window.addEventListener('scroll', throttle(() => {
			navbar.classList.toggle('scrolled', window.scrollY > 50);
		}, 100));
	}
}


// Enables interactive table column sorting for the "conservationTable".
function initTableSorting() {
	const table = document.getElementById('conservationTable');                  // Get the table element by ID
	if (!table) return;                                                          // Exit if table not found
	const thead = table.querySelector('thead');                                 // Get table header
	const tbody = table.querySelector('tbody');                                 // Get table body
	const ths = thead.querySelectorAll('th[data-sort]');                        // Get sortable header cells
	let sortCol = null;                                                          // Track the current sorted column
	let sortDir = 1;                                                             // 1 = ascending, -1 = descending

	ths.forEach((th, idx) => {
		th.style.cursor = 'pointer';                                             // Indicate the header is clickable
		th.addEventListener('click', () => {
			ths.forEach(t => t.querySelector('.sort-icon').textContent = '');   // Clear sort icons
			if (sortCol === idx) sortDir *= -1;                                 // Toggle direction if same column
			else { sortCol = idx; sortDir = 1; }                                // Reset for a new column
			th.querySelector('.sort-icon').textContent = sortDir === 1 ? '▲' : '▼'; // Display arrow icon
			const rows = Array.from(tbody.querySelectorAll('tr'))               // Get all rows
				.filter(row => !row.querySelector('[colspan]'));                // Exclude rows with colspan (summary)
			rows.sort((a, b) => {
				let aText = a.children[idx].textContent.trim();                // Get cell text in current column
				let bText = b.children[idx].textContent.trim();
				let aNum = parseFloat(aText.replace(/[^\d.\-]/g, ''));         // Try to parse number from text
				let bNum = parseFloat(bText.replace(/[^\d.\-]/g, ''));
				if (!isNaN(aNum) && !isNaN(bNum))                              // If both are numbers
					return (aNum - bNum) * sortDir;                            // Sort numerically
				return aText.localeCompare(bText) * sortDir;                   // Otherwise, sort alphabetically
			});
			rows.forEach(row => tbody.appendChild(row));                        // Reattach sorted rows
		});
	});
}

// Sorts a grid of portfolio items:
// - Sort options include alphabetical (descending), newest date, or oldest date
// - Smooth animation is applied to reordering
function sortContent() {
	const select = document.getElementById('sortSelect');
	const portfolioContent = document.getElementById('portfolioContent');
	if (!select || !portfolioContent) return;
	const rows = Array.from(portfolioContent.querySelectorAll('.row'));
	if (!rows.length) return;
	const sortType = select.value;
	let sortedRows = [...rows];

	switch (sortType) {
		// Sort rows alphabetically descending
		case 'name-desc':
			sortedRows.sort((a, b) => (b.querySelector('h5')?.textContent || '').localeCompare(a.querySelector('h5')?.textContent || ''));
			break;
		// Sort by newest date
		case 'date':
			sortedRows.sort((a, b) => new Date(b.dataset.date || '1900-01-01') - new Date(a.dataset.date || '1900-01-01'));
			break;
		// Sort by oldest date
		case 'date-old':
			sortedRows.sort((a, b) => new Date(a.dataset.date || '1900-01-01') - new Date(b.dataset.date || '1900-01-01'));
			break;
	}
	rows.forEach(row => row.remove());
	sortedRows.forEach((row, i) => {
		row.style.opacity = '0';
		row.style.transform = 'translateY(20px)';
		portfolioContent.appendChild(row);
		setTimeout(() => {
			row.style.transition = 'all 0.3s ease';
			row.style.opacity = '1';
			row.style.transform = 'translateY(0)';
		}, i * 100);
	});
}
// Highlights the active navigation link:
// - Adds 'active' class to the clicked link
// - Removes 'active' class from all other links
document.querySelectorAll('.nav-link').forEach(link => {
	link.addEventListener('click', () => {
		document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
		link.classList.add('active');
	});
});

// Adds smooth scroll behavior to anchor links.
// When a user clicks a link that references a section (e.g. #about),
// the page scrolls smoothly to that section instead of jumping abruptly.
function initSmoothScroll() {
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
	});
}

// Animates decorative floating elements:
// On hover: elements enlarge and become more visible
function initFloatingElements() {
	const floatingElements = document.querySelectorAll('.floating-element');       // Select all elements that float

	floatingElements.forEach(element => {
		element.addEventListener('mouseenter', () => {
			element.style.transform = 'scale(3)';                                  // Enlarge element on hover
			element.style.opacity = '1';                                           // Make it fully visible
		});
		element.addEventListener('mouseleave', () => {
			element.style.transform = 'scale(1)';                                  // Reset size when not hovered
			element.style.opacity = '0.7';                                         // Make it slightly transparent
		});
	});

	document.addEventListener('mousemove', (e) => {
		const mouseX = e.clientX / window.innerWidth;                             // Normalize mouse X position
		const mouseY = e.clientY / window.innerHeight;                            // Normalize mouse Y position

		floatingElements.forEach((element, index) => {
			const speed = (index + 1) * 0.5;                                       // Vary speed for each element
			const x = (mouseX - 0.5) * speed;                                      // Offset based on horizontal position
			const y = (mouseY - 0.5) * speed;                                      // Offset based on vertical position
			element.style.transform += ` translate(${x}px, ${y}px)`;              // Add translation to current transform
		});
	});
}

// Applies parallax scrolling to hero content:
// - As the user scrolls, the hero section text moves vertically
// - Creates a sense of depth and movement
function updateHeroParallax() {
	const scrolled = window.pageYOffset;
	const rate = scrolled * -0.5;
	const heroContent = document.querySelector('.hero-content');
	if (heroContent) heroContent.style.transform = `translateY(${rate}px)`;
}

// Adds a ripple animation effect when buttons are clicked.
function initButtonRipple() {
	document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
		button.addEventListener('click', function (e) {
			const ripple = document.createElement('span');                    // Create a new span element to act as the ripple
			const rect = this.getBoundingClientRect();                        // Get button size and position
			const size = Math.max(rect.width, rect.height);                  // Choose the larger dimension for ripple size
			const x = e.clientX - rect.left - size / 2;                      // Calculate horizontal ripple start position
			const y = e.clientY - rect.top - size / 2;                       // Calculate vertical ripple start position
			ripple.style.width = ripple.style.height = size + 'px';         // Set ripple size
			ripple.style.left = x + 'px';                                   // Set ripple's left offset
			ripple.style.top = y + 'px';                                    // Set ripple's top offset
			ripple.style.position = 'absolute';                             // Position it absolutely inside the button
			ripple.style.borderRadius = '50%';                              // Make the ripple a circle
			ripple.style.background = 'rgba(255,255,255,0.6)';              // Light transparent ripple color
			ripple.style.transform = 'scale(0)';                            // Start scaled down
			ripple.style.animation = 'ripple 0.6s linear';                  // Apply ripple animation
			ripple.style.pointerEvents = 'none';                            // Prevent it from blocking clicks
			this.appendChild(ripple);                                       // Add ripple to the button
			setTimeout(() => ripple.remove(), 600);                         // Remove ripple after animation completes
		});
	});
	// Ripple CSS
	const style = document.createElement('style');
	style.textContent = `
		@keyframes ripple { to { transform: scale(4); opacity: 0; } }       /* Animate ripple growth and fade */
		.btn-primary, .btn-secondary { position: relative; overflow: hidden; }  /* Required styles for ripple containment */
	`;
	document.head.appendChild(style);
}

// Animates hero content when the page loads:
// - Starts with opacity 0 and moves it into place with a transition
// - Helps draw attention to the hero section
function animateHeroOnLoad() {
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
}

// Shows a scroll-to-top button after scrolling down:
// - Appears after a certain scroll depth (300px)
// - Smoothly scrolls to top when clicked
function initScrollToTop() {
	const scrollButton = document.querySelector('.scroll-to-top');
	if (!scrollButton) return;
	window.addEventListener('scroll', throttle(() => {
		scrollButton.style.display = window.pageYOffset > 300 ? 'block' : 'none';
	}, 100));
	scrollButton.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
}

// Initializes all page components after DOM is ready:
// Ensures that the document elements are available to attach listeners
document.addEventListener('DOMContentLoaded', () => {
	initMobileNavigation();
	initSmoothScroll();
	initFloatingElements();
	initButtonRipple();
	initScrollToTop();
});

// Triggers hero animation only after all resources (images/fonts) are fully loaded
window.addEventListener('load', animateHeroOnLoad);

// Applies the hero parallax effect during scroll events with throttling.
// Keeps the animation efficient.
window.addEventListener('scroll', throttle(updateHeroParallax, 16));
