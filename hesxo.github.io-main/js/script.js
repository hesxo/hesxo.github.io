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

	// Back to top button functionality
	const backToTopBtn = document.getElementById('backToTopBtn');
	if (backToTopBtn) {
		window.addEventListener('scroll', function () {
			if (window.scrollY > 300) {
				backToTopBtn.style.display = 'block';
			} else {
				backToTopBtn.style.display = 'none';
			}
		});

		backToTopBtn.addEventListener('click', function () {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});
	}
});

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