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
	
});

// Profile button functionality
function handleProfileClick() {
	// Add your profile functionality here
	console.log('Profile button clicked');
	// You can redirect to a profile page or show a modal
	alert('Profile functionality coming soon!');
}
