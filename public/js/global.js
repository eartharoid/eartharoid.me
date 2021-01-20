document.addEventListener('DOMContentLoaded', () => {
	// Get all 'navbar-burger' elements
	const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

	// Check if there are any navbar burgers
	if ($navbarBurgers.length > 0) {

		// Add a click event on each of them
		$navbarBurgers.forEach(el => {
			el.addEventListener('click', () => {

				// Get the target from the 'data-target' attribute
				const target = el.dataset.target;
				const $target = document.getElementById(target);

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

let theme = localStorage.getItem('theme');

switch (theme) {
	case 'dark':
		enableDarkTheme();
		break;
	case 'light':
		enableLightTheme();
		break;
}

document.getElementById('darkThemeCSS').remove();
document.getElementById('lightThemeCSS').remove();

function enableDarkTheme() {
	localStorage.setItem('theme', 'dark');

	let icon = document.getElementById('themeIcon');
	icon.classList.add('fa-moon');
	icon.classList.remove('fa-sun');

	let link = document.getElementById('themeCSS');
	link.setAttribute('href', '/css/dark_theme.css');

	document.getElementById('madeWithBulma')
		.setAttribute('src', '/images/bulma-white.png');
}

function enableLightTheme() {
	localStorage.setItem('theme', 'light');

	let icon = document.getElementById('themeIcon');
	icon.classList.add('fa-sun');
	icon.classList.remove('fa-moon');

	let link = document.getElementById('themeCSS');
	link.setAttribute('href', '/css/light_theme.css');

	document.getElementById('madeWithBulma')
		.setAttribute('src', '/images/bulma-black.png');
}

function toggleTheme() {
	let theme = localStorage.getItem('theme');

	switch (theme) {
		case 'dark':
			enableLightTheme(); // it is dark, make it light theme
			break;
		case 'light':
			enableDarkTheme(); // it is light, make it dark theme
			break;
	}
}