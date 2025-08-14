document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger-btn');
    const navGroup = document.getElementById('nav-group');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navGroup.classList.toggle('open');
    });

    navGroup.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navGroup.classList.remove('open');
        });
    });
});
