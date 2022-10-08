document.addEventListener('DOMContentLoaded', () => {
	// Get all 'navbar-burger' elements
	const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
	// Check if there are any navbar burgers
	if ($navbarBurgers.length > 0) {
		// Add a click event on each of them
		$navbarBurgers.forEach(el => {
			el.addEventListener('click', () => {

				// Get the target from the 'data-target' attribute
				const $target = document.getElementById(el.dataset.target);

				// Toggle the 'is-active' class on both the 'navbar-burger' and the 'navbar-menu'
				el.classList.toggle('is-active');
				$target.classList.toggle('is-active');
			});
		});
	}
});

if (!localStorage.getItem('theme')) {
	localStorage.setItem('theme',
		window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

const theme = localStorage.getItem('theme');

if (theme === 'dark') {
	enableDarkTheme();
} else {
	enableLightTheme();
}

document.getElementById('darkThemeCSS').remove();
document.getElementById('lightThemeCSS').remove();

function enableDarkTheme() {
	localStorage.setItem('theme', 'dark');

	const icon = document.getElementById('themeIcon');
	icon.classList.add('fa-moon');
	icon.classList.remove('fa-sun');

	let link = document.getElementById('themeCSS');
	link.setAttribute('href', '/css/dark_theme.css');

	document.getElementById('madeWithBulma')
		.setAttribute('src', '/images/bulma-white.png');
}

function enableLightTheme() {
	localStorage.setItem('theme', 'light');

	const icon = document.getElementById('themeIcon');
	icon.classList.add('fa-sun');
	icon.classList.remove('fa-moon');

	const link = document.getElementById('themeCSS');
	link.setAttribute('href', '/css/light_theme.css');

	document.getElementById('madeWithBulma')
		.setAttribute('src', '/images/bulma-black.png');
}

function toggleTheme() {
	const theme = localStorage.getItem('theme');

	// if it's dark, make it light theme
	// else set it back to dark again
	if (theme === 'dark') {
		enableLightTheme();
	} else {
		enableDarkTheme();
	}
}