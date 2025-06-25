const header = document.querySelector("header");
window.addEventListener("scroll", function () {
	header.classList.toggle("sticky", window.scrollY > 100);
});

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
	menu.classList.toggle('bx-x');
	navlist.classList.toggle('open');
};

window.onscroll = () => {
	menu.classList.remove('bx-x');
	navlist.classList.remove('open');
};

// Fade up animation on scroll into view
function animateOnView(element) {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.remove('animate-fadeUp');
				// Force reflow to restart animation
				void entry.target.offsetWidth;
				entry.target.classList.add('animate-fadeUp');
			}
		});
	}, { threshold: 0.5 });
	observer.observe(element);
}

document.addEventListener('DOMContentLoaded', function () {
	const homeTitle = document.querySelector('.home-title');
	const homeMain = document.querySelector('.home-main');
	if (homeTitle) animateOnView(homeTitle);
	if (homeMain) animateOnView(homeMain);
});

// Blog sort dropdown logic
const sortDropdown = document.getElementById('sort-blog');
const portfolioContent = document.querySelector('.portfolio-content');

if (sortDropdown && portfolioContent) {
	sortDropdown.addEventListener('change', function () {
		const rows = Array.from(portfolioContent.querySelectorAll('.row'));
		let sortedRows;
		if (this.value === 'oldest') {
			sortedRows = rows.slice().reverse();
		} else if (this.value === 'az') {
			sortedRows = rows.slice().sort((a, b) => {
				const aText = a.querySelector('.layer h5')?.textContent.trim() || '';
				const bText = b.querySelector('.layer h5')?.textContent.trim() || '';
				return aText.localeCompare(bText);
			});
		} else {
			// Newest (default order in DOM)
			sortedRows = rows;
		}
		// Remove all rows
		rows.forEach(row => portfolioContent.removeChild(row));
		// Append sorted rows
		sortedRows.forEach(row => portfolioContent.appendChild(row));
	});
}