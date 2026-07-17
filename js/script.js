const contactModal = document.getElementById('contactModal');
const teamModal = document.getElementById('teamModal');
const galleryModal = document.getElementById('galleryModal');
const closeButtons = document.querySelectorAll('.close-modal');

// --- Открытие модалок ---
document.getElementById('contactNav')?.addEventListener('click', () => openModal(contactModal));
document.getElementById('joinModalBtn')?.addEventListener('click', () => openModal(contactModal));
document.getElementById('ctaButton')?.addEventListener('click', () => openModal(contactModal));

// --- Навигация (скролл) ---
document.getElementById('heroButton')?.addEventListener('click', () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
});

// --- Универсальные функции для модалок ---
function openModal(modal) {
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// --- Закрытие модалок (кнопка X) ---
closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        closeModal(contactModal);
        closeModal(teamModal);
        closeModal(galleryModal);
    });
});

// --- Закрытие модалок (клик вне окна) ---
window.addEventListener('click', (e) => {
    if (e.target === contactModal) closeModal(contactModal);
    if (e.target === teamModal) closeModal(teamModal);
    if (e.target === galleryModal) closeModal(galleryModal);
});

// --- Данные команды ---
const teamData = {
    maxim: {
        name: "Максим У.",
        role: "Тимлидер / Менеджер",
        bio: "Руководит всеми процессами во время работы над проектами. Организует коммуникацию с клиентами, распределяет задачи внутри команды. Имеет сертификацию PMP и опыт управления распределёнными командами.",
        link: "https://t.me/axel_Invincible",
        photo: "images/maxim.jpg"
    },
    vladislav: {
        name: "Владислав Ф.",
        role: "Разработчик / Дизайнер",
        bio: "Fullstack разработчик с упором на фронтенд и UI/UX дизайн. Создаёт эстетичные и отзывчивые интерфейсы. Владеет React, Vue, TailwindCSS. Также занимается дизайном в Figma.",
        link: "https://t.me/Waldemar_Foma",
        photo: "images/vladislav.jpg"
    },
    erik: {
        name: "Эрик А.",
        role: "Разработчик",
        bio: "Бэкенд-разработчик, специалист по высоконагруженным системам и базам данных. Предпочитает Python, Go и PostgreSQL. Отвечает за архитектуру серверной части и надёжность API.",
        link: "https://t.me/erik_axl",
        photo: "images/erik.jpg"
    },
    milena: {
        name: "Мила Л.",
        role: "мл. Дизайнер",
        bio: "Креативный дизайнер с чувством стиля. Разрабатывает визуальные концепции, баннеры, адаптивные макеты. Помогает делать продукты удобными и визуально привлекательными.",
        link: "https://vk.com/milena_axl",
        photo: "images/milena.jpg"
    }
};

// --- Открытие модалки члена команды (единая функция) ---
function openMemberModal(memberId) {
    const data = teamData[memberId];
    if (!data) return;

    document.getElementById("teamModalName").textContent = data.name;
    document.getElementById("teamModalRoleDisplay").textContent = data.role;
    document.getElementById("teamModalBio").textContent = data.bio;
    document.getElementById("teamModalLink").href = data.link;

    const modalPhoto = document.getElementById("modalMemberPhoto");
    modalPhoto.src = data.photo;
    modalPhoto.alt = data.name;

    // Запасное изображение, если фото не загрузилось
    modalPhoto.onerror = function() {
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="45" fill="%23e8e8ed"/%3E%3Ctext x="50" y="67" font-size="40" text-anchor="middle" fill="%23999"%3E📷%3C/text%3E%3C/svg%3E';
    };

    openModal(document.getElementById("teamModal"));
}

// --- Обработчики для кнопок "Узнать подробнее" ---
document.querySelectorAll(".member-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const memberId = btn.getAttribute("data-member");
        if (memberId && teamData[memberId]) {
            openMemberModal(memberId);
        }
    });
});

// --- Обработчики для кликов по аватаркам ---
document.querySelectorAll(".member").forEach(card => {
    const silhouette = card.querySelector(".silhouette");
    if (silhouette) {
        silhouette.addEventListener("click", () => {
            const memberId = card.getAttribute("data-member");
            if (memberId && teamData[memberId]) openMemberModal(memberId);
        });
    }
});

// ============= GALLERY =============
const galleryImages = ['images/team.jpg', 'images/team_1.jpg', 'images/team_2.jpg', 'images/team_3.jpg'];
let currentGalleryIndex = 0;
const galleryImage = document.getElementById('galleryImage');
const galleryCurrent = document.getElementById('galleryCurrent');
const galleryTotal = document.getElementById('galleryTotal');
const galleryThumbnails = document.getElementById('galleryThumbnails');

if (galleryTotal) galleryTotal.textContent = galleryImages.length;

function updateGallery() {
    if (galleryImage) galleryImage.src = galleryImages[currentGalleryIndex];
    if (galleryCurrent) galleryCurrent.textContent = currentGalleryIndex + 1;
    document.querySelectorAll('.gallery-thumb').forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === currentGalleryIndex);
    });
}

// Создание миниатюр для галереи
galleryImages.forEach((img, idx) => {
    const thumb = document.createElement('div');
    thumb.className = 'thumbnail gallery-thumb';
    thumb.style.width = '60px';
    thumb.style.height = '60px';
    thumb.style.cursor = 'pointer';
    thumb.style.borderRadius = '12px';
    thumb.style.overflow = 'hidden';
    thumb.innerHTML = `<img src="${img}" style="width:100%;height:100%;object-fit:cover;">`;
    thumb.addEventListener('click', () => {
        currentGalleryIndex = idx;
        updateGallery();
    });
    galleryThumbnails?.appendChild(thumb);
});

document.getElementById('galleryPrev')?.addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGallery();
});

document.getElementById('galleryNext')?.addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    updateGallery();
});

// Thumbnail click for main photo (для секции About)
document.querySelectorAll('.thumbnail[data-img]').forEach(thumb => {
    thumb.addEventListener('click', () => {
        const imgSrc = thumb.dataset.img;
        if (imgSrc) {
            document.getElementById('mainTeamPhoto')?.setAttribute('src', imgSrc);
        }
    });
});

// --- Навигация по якорям (data-nav) ---
document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.dataset.nav;
        if (target === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
        else if (target === 'about') document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        else if (target === 'projects') document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        else if (target === 'team') document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' });
    });
});

// --- Анимация смены главного фото в About ---
document.addEventListener('DOMContentLoaded', function() {
    const mainVector = document.getElementById('mainVectorOverlay');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainPhoto = document.getElementById('mainTeamPhoto');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const imgSrc = this.dataset.img;
            if (mainPhoto) {
                mainPhoto.src = imgSrc;
            }
            if (mainVector) {
                mainVector.style.opacity = '0';
                mainVector.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    mainVector.style.opacity = '1';
                    mainVector.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });
});

// ============================================================
//   НОВАЯ ИНТЕРАКТИВНОСТЬ: АЙСБЕРГ + ТЕКСТ СЛЕВА
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    const iceSections = document.querySelectorAll('.ice-section');
    const infoBranches = document.querySelectorAll('.info-branch');
    const dynamicItems = document.querySelectorAll('.dynamic-item');
    const legendBtns = document.querySelectorAll('.legend-btn');
    
    // Маппинг уровней
    const levelMap = {
        'innovation': { 
            class: 'highlight-innovation', 
            icon: '💡',
            title: 'Инновации',
            desc: 'То, что клиент видит на релизе. Современные технологии, быстрый фронтенд и продуманный UX.',
            tag: 'Верхушка'
        },
        'reliability': { 
            class: 'highlight-reliability', 
            icon: '⚙️',
            title: 'Надежность',
            desc: 'Внутренние процессы и архитектура. Базы данных, API, серверная логика — всё работает как часы.',
            tag: 'Середина'
        },
        'passion': { 
            class: 'highlight-passion', 
            icon: '❤️',
            title: 'Страсть',
            desc: 'Наш фундамент и любовь к делу. Без неё невозможны ни инновации, ни надёжность.',
            tag: 'Основание'
        }
    };

    // Функция для активации уровня
    function activateLevel(level) {
        const data = levelMap[level];
        if (!data) return;

        // 1. Айсберг: добавляем класс active-level
        iceSections.forEach(section => {
            section.classList.toggle('active-level', section.dataset.section === level);
        });
        
        // 2. Выноски
        infoBranches.forEach(branch => {
            branch.classList.toggle('active-level', branch.dataset.section === level);
        });

        // 3. Динамические элементы слева
        dynamicItems.forEach(item => {
            const isActive = item.dataset.level === level;
            item.classList.toggle('active', isActive);
            // Добавляем класс подсветки
            item.classList.toggle(data.class, isActive);
        });

        // 4. Кнопки легенды
        legendBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.level === level);
        });

        // 5. Обновляем текст в динамическом блоке (опционально)
        // Данные уже есть в HTML, но можно обновить и через JS
    }

    // Функция сброса
    function resetLevels() {
        iceSections.forEach(section => section.classList.remove('active-level'));
        infoBranches.forEach(branch => branch.classList.remove('active-level'));
        dynamicItems.forEach(item => {
            item.classList.remove('active');
            // Убираем все классы подсветки
            Object.values(levelMap).forEach(val => {
                item.classList.remove(val.class);
            });
        });
        legendBtns.forEach(btn => btn.classList.remove('active'));
    }

    // --- СОБЫТИЯ ДЛЯ АЙСБЕРГА ---
    [...iceSections, ...infoBranches].forEach(element => {
        element.addEventListener('mouseenter', function() {
            const level = this.dataset.section;
            if (level && levelMap[level]) {
                activateLevel(level);
            }
        });
    });

    // --- СОБЫТИЯ ДЛЯ КНОПОК ЛЕГЕНДЫ ---
    legendBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const level = this.dataset.level;
            if (level && levelMap[level]) {
                // Сбрасываем всё и активируем выбранный уровень
                resetLevels();
                activateLevel(level);
                
                // Находим соответствующий элемент айсберга и эмулируем наведение
                const targetIce = document.querySelector(`.ice-section[data-section="${level}"]`);
                if (targetIce) {
                    targetIce.classList.add('active-level');
                }
                const targetBranch = document.querySelector(`.info-branch[data-section="${level}"]`);
                if (targetBranch) {
                    targetBranch.classList.add('active-level');
                }
            }
        });
    });

    const icebergWrapper = document.querySelector('.iceberg-visual');
    if (icebergWrapper) {
        icebergWrapper.addEventListener('mouseleave', function(e) {
            const related = e.relatedTarget;
            if (related && (related.closest('.iceberg-visual') || related.closest('.info-branch'))) {
                return;
            }
            iceSections.forEach(section => section.classList.remove('active-level'));
            infoBranches.forEach(branch => branch.classList.remove('active-level'));
        });
    }

    dynamicItems.forEach(item => {
        item.addEventListener('click', function() {
            const level = this.dataset.level;
            if (!level) return;
            
            // Активируем уровень
            resetLevels();
            activateLevel(level);
            
            // Находим секцию для скролла
            let targetSection = document.querySelector(`section[data-section="${level}"]`) || document.getElementById(level);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                targetSection.classList.add('section-highlight');
                setTimeout(() => targetSection.classList.remove('section-highlight'), 2000);
            }
        });
    });

    setTimeout(() => {
        activateLevel('innovation');
    }, 300);
});
