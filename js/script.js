// Utility: Throttle function for performance
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

// Mobile Navigation
function initMobileNavigation() {
	const mobileMenuToggle = document.getElementById('mobileMenuToggle');
	const mobileNav = document.getElementById('mobileNav');
	const navbar = document.getElementById('navbar');
	const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

	if (mobileMenuToggle && mobileNav) {
		mobileMenuToggle.addEventListener('click', () => {
			mobileMenuToggle.classList.toggle('active');
			mobileNav.classList.toggle('active');
			document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
		});
	}

	mobileNavLinks.forEach(link => {
		link.addEventListener('click', () => {
			mobileMenuToggle.classList.remove('active');
			mobileNav.classList.remove('active');
			document.body.style.overflow = '';
		});
	});

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

	if (navbar) {
		window.addEventListener('scroll', throttle(() => {
			navbar.classList.toggle('scrolled', window.scrollY > 50);
		}, 100));
	}
}


// Table Sorting
function initTableSorting() {
	const table = document.getElementById('conservationTable');
	if (!table) return;
	const thead = table.querySelector('thead');
	const tbody = table.querySelector('tbody');
	const ths = thead.querySelectorAll('th[data-sort]');
	let sortCol = null;
	let sortDir = 1;

	ths.forEach((th, idx) => {
		th.style.cursor = 'pointer';
		th.addEventListener('click', () => {
			ths.forEach(t => t.querySelector('.sort-icon').textContent = '');
			if (sortCol === idx) sortDir *= -1;
			else { sortCol = idx; sortDir = 1; }
			th.querySelector('.sort-icon').textContent = sortDir === 1 ? '▲' : '▼';
			const rows = Array.from(tbody.querySelectorAll('tr')).filter(row => !row.querySelector('[colspan]'));
			rows.sort((a, b) => {
				let aText = a.children[idx].textContent.trim();
				let bText = b.children[idx].textContent.trim();
				let aNum = parseFloat(aText.replace(/[^\d.\-]/g, ''));
				let bNum = parseFloat(bText.replace(/[^\d.\-]/g, ''));
				if (!isNaN(aNum) && !isNaN(bNum)) return (aNum - bNum) * sortDir;
				return aText.localeCompare(bText) * sortDir;
			});
			rows.forEach(row => tbody.appendChild(row));
		});
	});
}

// Portfolio Sorting
function sortContent() {
	const select = document.getElementById('sortSelect');
	const portfolioContent = document.getElementById('portfolioContent');
	if (!select || !portfolioContent) return;
	const rows = Array.from(portfolioContent.querySelectorAll('.row'));
	if (!rows.length) return;
	const sortType = select.value;
	let sortedRows = [...rows];

	switch (sortType) {
		case 'name-desc':
			sortedRows.sort((a, b) => (b.querySelector('h5')?.textContent || '').localeCompare(a.querySelector('h5')?.textContent || ''));
			break;
		case 'date':
			sortedRows.sort((a, b) => new Date(b.dataset.date || '1900-01-01') - new Date(a.dataset.date || '1900-01-01'));
			break;
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

// Smooth scrolling for anchor links
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

// Floating element hover and mouse parallax
function initFloatingElements() {
	const floatingElements = document.querySelectorAll('.floating-element');
	floatingElements.forEach(element => {
		element.addEventListener('mouseenter', () => {
			element.style.transform = 'scale(3)';
			element.style.opacity = '1';
		});
		element.addEventListener('mouseleave', () => {
			element.style.transform = 'scale(1)';
			element.style.opacity = '0.7';
		});
	});
	document.addEventListener('mousemove', (e) => {
		const mouseX = e.clientX / window.innerWidth;
		const mouseY = e.clientY / window.innerHeight;
		floatingElements.forEach((element, index) => {
			const speed = (index + 1) * 0.5;
			const x = (mouseX - 0.5) * speed;
			const y = (mouseY - 0.5) * speed;
			element.style.transform += ` translate(${x}px, ${y}px)`;
		});
	});
}

// Parallax effect for hero content
function updateHeroParallax() {
	const scrolled = window.pageYOffset;
	const rate = scrolled * -0.5;
	const heroContent = document.querySelector('.hero-content');
	if (heroContent) heroContent.style.transform = `translateY(${rate}px)`;
}

// Button ripple effect
function initButtonRipple() {
	document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
		button.addEventListener('click', function (e) {
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
			ripple.style.background = 'rgba(255,255,255,0.6)';
			ripple.style.transform = 'scale(0)';
			ripple.style.animation = 'ripple 0.6s linear';
			ripple.style.pointerEvents = 'none';
			this.appendChild(ripple);
			setTimeout(() => ripple.remove(), 600);
		});
	});
	// Ripple CSS
	const style = document.createElement('style');
	style.textContent = `
		@keyframes ripple { to { transform: scale(4); opacity: 0; } }
		.btn-primary, .btn-secondary { position: relative; overflow: hidden; }
	`;
	document.head.appendChild(style);
}

// Hero entrance animation
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

// Scroll to top button
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

// Initialization
document.addEventListener('DOMContentLoaded', () => {
	initMobileNavigation();
	initTableSorting();
	initSmoothScroll();
	initFloatingElements();
	initButtonRipple();
	initScrollToTop();
});

window.addEventListener('load', animateHeroOnLoad);

// Parallax scroll (throttled)
window.addEventListener('scroll', throttle(updateHeroParallax, 16));
