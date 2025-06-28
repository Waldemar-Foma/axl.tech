document.addEventListener('DOMContentLoaded', function() {
    // Безопасное получение элементов
    const toggler = document.querySelector('.toggler');
    const menu = document.querySelector('.menu');
    const menuContent = document.querySelector('.menu-content');
    const closeBtn = document.querySelector('.menu-close');

    // Проверка наличия элементов перед добавлением обработчиков
    if (!toggler || !menu || !menuContent || !closeBtn) return;

    // Закрытие меню по клику на кнопку закрытия
    closeBtn.addEventListener('click', () => {
        toggler.checked = false;
        // Добавляем анимацию/эффект закрытия
        menu.classList.add('closing');
        setTimeout(() => menu.classList.remove('closing'), 300);
    });

    // Закрытие меню по клику вне контента
    menu.addEventListener('click', (e) => {
        if (!menuContent.contains(e.target)) {
            toggler.checked = false;
            menu.classList.add('closing');
            setTimeout(() => menu.classList.remove('closing'), 300);
        }
    });

    // Обработка клавиши Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toggler.checked) {
            toggler.checked = false;
            menu.classList.add('closing');
            setTimeout(() => menu.classList.remove('closing'), 300);
        }
    });
});