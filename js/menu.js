document.addEventListener('DOMContentLoaded', function () {
    const toggler = document.querySelector('.toggler');
    const menu = document.querySelector('.menu');
    const menuContent = document.querySelector('.menu-content');
    const closeBtn = document.querySelector('.menu-close');

    closeBtn.addEventListener('click', () => {
        toggler.checked = false;
    });

    menu.addEventListener('click', (e) => {
        if (!menuContent.contains(e.target)) {
            toggler.checked = false;
        }
    });
});