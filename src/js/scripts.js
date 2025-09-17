window.addEventListener('DOMContentLoaded', (event) => {
  // Navbar shrink function
  let navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector('#mainNav');

    if (!navbarCollapsible) {
      return;
    }

    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove('navbar-shrink');
      document.body.classList.remove('navbar-shrink-active'); // Remove classe do body
    } else {
      navbarCollapsible.classList.add('navbar-shrink');
      document.body.classList.add('navbar-shrink-active'); // Adiciona classe ao body
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener('scroll', navbarShrink);
});
