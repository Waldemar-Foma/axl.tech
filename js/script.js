function setCookie(name, value, days = 365) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length);
        }
    }
    return null;
}

// Theme Management
function setTheme(theme) {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
    });
}

// Language Management
function setLanguage(lang) {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    setCookie('language', lang);
    
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
    // Update all language-specific elements
    document.querySelectorAll('.lang-ru, .lang-en').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll(`.lang-${lang}`).forEach(el => {
        el.style.display = 'inline';
    });
    
    renderTeam(lang);
}

// Team Data
const teamMembers = [
    {
        id: 1,
        name: "Фоменко Владислав",
        nameEn: "Fomenko Vladislav",
        role: "Fullstack | WEB-Дизайнер",
        roleEn: "Fullstack | WEB Designer",
        bio: "Опыт работы более 5 лет. Специализируется на веб разработке, разработке ТГ-ботов, разработки web/desctop приложений.",
        bioEn: "Work experience of more than 5 years. Specializes in web development, telegram bot development, and web/desktop application development.",
        photo: "https://sun9-16.userapi.com/impg/ceLsVmfjKm1m2T8-tF8rHcOXo8H-_7fAIc9Z4A/Z4CK4i1ernA.jpg?size=2560x1818&quality=95&sign=439daa320abdbb115e982be6ca275b83&type=album",
        skills: {
            "Frontend": ["HTML", "CSS3", "JavaScript", "React", "Vue"],
            "Backend": ["Node.js", "Python", "PHP", "TypeScript"],
            "Дизайн": ["Figma", "Adobe Illustrator", "Adobe Photoshop"],
            "Инструменты": ["Docker", "Excel", "PowerPoint", "Git"]
        },
        personalPage: "team/vladislav/vladislav.html"
    },
    {
        id: 2,
        name: "Устинов Максим",
        nameEn: "Ustinov Maksim",
        role: "Менеджер | Тестировщик",
        roleEn: "Manager | Tester",
        bio: "Руководит всеми процессами во время работы над проектом, поддерживает связь с клиентом, ищет и сообщает о багах, для дальнейшего устранения.",
        bioEn: "Manages all processes while working on the project, keeps in touch with the client, searches for and reports bugs for further elimination.",
        photo: "https://sun9-79.userapi.com/impg/BAZ0JrH6-VD-V4NMKL7vLOxE65c0PcMlHU8ynw/rCNm9Ij6IQQ.jpg?size=1620x2160&quality=95&sign=394cf2bf293a3cdfe4a248bac3977bd1&type=album",
        skills: {
            "Управление": ["Project Management", "Team Building", "Communication"],
            "Тестирование": ["Manual Testing", "Bug Tracking", "Test Cases"],
            "Дизайн": ["Figma", "Adobe Photoshop", "UI/UX Principles"],
            "Разработка": ["HTML", "CSS3", "Python", "SWOT-analysis"]
        },
        personalPage: "team/maksim.html"
    },
    {
        id: 3,
        name: "Айрапетян Эрик",
        nameEn: "Ayrapetyan Erik",
        role: "Backend Developer",
        roleEn: "Backend Developer",
        bio: "Обеспечивает стабильную работу всех сервисов платформы. Не только от начала до конца ее реализации, но и в течение ее работы.",
        bioEn: "Ensures stable operation of all platform services. Not only from the beginning to the end of its implementation, but also during its operation.",
        photo: "../images/erik.jpg",
        skills: {
            "Backend": ["Node.js", "Python", "Java", "C#", "PHP"],
            "Базы данных": ["MySQL", "SQL", "Database Optimization"],
            "Инфраструктура": ["Docker", "Server Management", "Deployment"],
            "Разработка": ["Unity", "Wordpress", "Blender", "API Development"]
        },
        personalPage: "team/erik.html"
    }
];

// Gallery Data
const teamPhotos = [
    { src: 'images/team_2.jpg', alt: 'Our Team' },
    { src: 'images/team.jpg', alt: 'Team Photo 2' },
    { src: 'images/team_1.jpg', alt: 'Team Photo 3' },
    { src: 'images/team_3.jpg', alt: 'Team Photo 4' }
];

// Team Render Function
function renderTeam(lang) {
    const teamGrid = document.querySelector('.team-grid');
    if (!teamGrid) return;
    
    teamGrid.innerHTML = '';
    const useEnglish = lang === 'en';
    
    teamMembers.forEach((member) => {
        const memberCard = document.createElement('div');
        memberCard.className = 'team-member';
        
        memberCard.innerHTML = `
            <div class="member-photo" style="background-image: url('${member.photo}')" 
                 onerror="this.style.backgroundImage='url(../images/default-avatar.jpg)'"></div>
            <div class="member-info">
                <h3 class="member-name">${useEnglish ? member.nameEn : member.name}</h3>
                <div class="member-role">${useEnglish ? member.roleEn : member.role}</div>
                <p class="member-bio">${useEnglish ? member.bioEn : member.bio}</p>
                <div class="member-skills">
                    ${Object.keys(member.skills).slice(0, 3).map(category => 
                        `<span class="skill-tag">${category}</span>`
                    ).join('')}
                </div>
            </div>
        `;
        
        memberCard.addEventListener('click', () => {
            openTeamModal(member);
        });
        
        teamGrid.appendChild(memberCard);
    });
}

// Open Team Member Modal
function openTeamModal(member) {
    const modal = document.getElementById('teamMemberModal');
    const modalBody = document.getElementById('teamMemberModalBody');
    const currentLang = document.documentElement.getAttribute('lang') || 'ru';
    const useEnglish = currentLang === 'en';

    modalBody.innerHTML = `
        <div class="member-modal-content">
            <div class="modal-member-photo-container">
                <img src="${member.photo}" alt="${useEnglish ? member.nameEn : member.name}" 
                     class="modal-member-photo" onerror="this.src='../images/default-avatar.jpg'">
            </div>
            <div class="modal-member-info">
                <h2 class="modal-member-name">${useEnglish ? member.nameEn : member.name}</h2>
                <div class="modal-member-role">${useEnglish ? member.roleEn : member.role}</div>
                <p class="modal-member-bio">${useEnglish ? member.bioEn : member.bio}</p>
                
                <div class="modal-skills-grid">
                    ${Object.entries(member.skills).map(([category, skills]) => `
                        <div class="modal-skill-category">
                            <h4 class="modal-skill-title">${category}</h4>
                            <ul class="modal-skill-list">
                                ${skills.map(skill => `<li class="modal-skill-item">${skill}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
                
                <div class="modal-actions">
                    <a href="${member.personalPage}" class="btn-learn-more">
                        <i class="fas fa-arrow-right"></i>
                        <span class="lang-ru">Узнать больше</span>
                    </a>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
}

// Gallery Functions
function openGallery(startIndex = 0) {
    const modal = document.getElementById('galleryModal');
    if (!modal) return;
    
    const currentImage = document.getElementById('currentGalleryImage');
    const currentIndexSpan = document.getElementById('currentIndex');
    const totalImagesSpan = document.getElementById('totalImages');
    const thumbnailsContainer = document.querySelector('.gallery-thumbnails');
    
    // Проверяем существование всех необходимых элементов
    if (!currentImage || !currentIndexSpan || !totalImagesSpan || !thumbnailsContainer) return;
    
    // Устанавливаем текущее изображение
    currentImage.src = teamPhotos[startIndex].src;
    currentImage.alt = teamPhotos[startIndex].alt;
    currentIndexSpan.textContent = startIndex + 1;
    totalImagesSpan.textContent = teamPhotos.length;
    
    // Очищаем и создаем миниатюры
    thumbnailsContainer.innerHTML = '';
    teamPhotos.forEach((photo, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `gallery-thumbnail ${index === startIndex ? 'active' : ''}`;
        thumbnail.dataset.index = index;
        
        thumbnail.innerHTML = `
            <img src="${photo.src}" alt="${photo.alt}">
        `;
        
        thumbnail.addEventListener('click', () => {
            changeGalleryImage(index);
        });
        
        thumbnailsContainer.appendChild(thumbnail);
    });
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    
    // Сохраняем текущий индекс в data-атрибуте модального окна
    modal.dataset.currentIndex = startIndex;
}

function changeGalleryImage(index) {
    const modal = document.getElementById('galleryModal');
    const currentImage = document.getElementById('currentGalleryImage');
    const currentIndexSpan = document.getElementById('currentIndex');
    
    // Проверяем существование элементов
    if (!modal || !currentImage || !currentIndexSpan) return;
    
    // Анимация перехода
    currentImage.style.opacity = '0';
    
    setTimeout(() => {
        currentImage.src = teamPhotos[index].src;
        currentImage.alt = teamPhotos[index].alt;
        currentImage.style.opacity = '1';
        currentIndexSpan.textContent = index + 1;
        
        // Обновляем активную миниатюру
        document.querySelectorAll('.gallery-thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        // Обновляем текущий индекс
        modal.dataset.currentIndex = index;
    }, 200);
}

function nextGalleryImage() {
    const modal = document.getElementById('galleryModal');
    let currentIndex = parseInt(modal.dataset.currentIndex) || 0;
    const nextIndex = (currentIndex + 1) % teamPhotos.length;
    changeGalleryImage(nextIndex);
}

function prevGalleryImage() {
    const modal = document.getElementById('galleryModal');
    let currentIndex = parseInt(modal.dataset.currentIndex) || 0;
    const prevIndex = (currentIndex - 1 + teamPhotos.length) % teamPhotos.length;
    changeGalleryImage(prevIndex);
}

// Modal functions
function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('show');
    });
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-open');
}

function setupModalHandlers() {
    // Закрытие модалок
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModal);
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Initialize Gallery Handlers
function setupGalleryHandlers() {
    // Клик на основную фотографию - проверяем существование элемента
    const mainTeamPhoto = document.querySelector('.main-team-photo');
    if (mainTeamPhoto) {
        mainTeamPhoto.addEventListener('click', () => {
            openGallery(0);
        });
    }
    
    // Клик на миниатюры - проверяем существование элементов
    const thumbnails = document.querySelectorAll('.thumbnail');
    if (thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const index = parseInt(thumb.dataset.index);
                openGallery(index);
            });
        });
    }
    
    // Навигация в модальном окне - проверяем существование элементов
    const nextBtn = document.querySelector('.gallery-nav.next');
    const prevBtn = document.querySelector('.gallery-nav.prev');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextGalleryImage);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevGalleryImage);
    }
    
    // Клавиатурная навигация для галереи
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('galleryModal');
        if (!modal || !modal.classList.contains('show')) return;
        
        if (e.key === 'ArrowRight') {
            nextGalleryImage();
        } else if (e.key === 'ArrowLeft') {
            prevGalleryImage();
        }
    });
    
    // Свайпы для мобильных устройств - проверяем существование элемента
    const gallerySlide = document.querySelector('.gallery-slide');
    if (gallerySlide) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        gallerySlide.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        gallerySlide.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Свайп влево - следующее фото
                    nextGalleryImage();
                } else {
                    // Свайп вправо - предыдущее фото
                    prevGalleryImage();
                }
            }
        }
    }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme and language
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedLang = getCookie('language') || 'ru';
    
    setTheme(savedTheme);
    setLanguage(savedLang);
    
    // Setup modal handlers
    setupModalHandlers();
    
    // Setup gallery handlers
    setupGalleryHandlers();
    
    // Theme switcher
    document.querySelectorAll('.theme-btn').forEach(button => {
        button.addEventListener('click', () => {
            setTheme(button.getAttribute('data-theme'));
        });
    });
    
    // Language switcher
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
    
    // Contact modal
    const contactModalBtn = document.getElementById('contactModalBtn');
    if (contactModalBtn) {
        contactModalBtn.addEventListener('click', function() {
            const contactModal = document.getElementById('contactModal');
            if (contactModal) {
                contactModal.classList.add('show');
                document.body.style.overflow = 'hidden';
                document.body.classList.add('modal-open');
            }
        });
    }
    
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 200);
        }, 1300);
    }
});

// Initialize particles if available
if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#FF6B00" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#FF6B00",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                out_mode: "out"
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onclick: { enable: true, mode: "push" },
                resize: true
            }
        },
        retina_detect: true
    });
}
