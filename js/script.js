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
    
    // Re-render team with correct language
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
        personalPage: "team/vladislav.html"
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
        name: "Алексеев Александр",
        nameEn: "Alekseyev Alexander",
        role: "Backend Developer",
        roleEn: "Backend Developer",
        bio: "Создает комплексные программные решения, от серверной части веб-сайтов и мобильных приложений до интеллектуальных ботов и систем анализа данных, обеспечивая их стабильную работу и удобный пользовательский опыт.",
        bioEn: "Ensures stable operation of all platform services. Not only from the beginning to the end of its implementation, but also during its operation.",
        photo: "../images/alex.jpg",
        skills: {
            "Backend": ["Python", "FastAPI", "Django", "Node.js"],
            "Базы данных": ["SQL", "PostgreSQL", "MySQL", "Redis"],
            "Инфраструктура": ["Docker", "Git", "Bash", "Deployment"],
            "Разработка": ["Frontend", "HTML5", "CSS3", "Android", "Kotlin", "Qt", "Telegram Bots (Aiogram)", "API Development"],
            "Анализ данных": ["Pandas", "Data Analysis"],
            "Языки": ["English B2"]
        },
        personalPage: "team/alex.html"
    },
    {
        id: 4,
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

// Team Carousel Variables
let currentSlide = 0;
let slidesToShow = 1;
let slideWidth = 0;
const gap = 20;

// Team Carousel
function initTeamCarousel() {
    const teamGrid = document.querySelector('.team-grid');
    if (!teamGrid) return;

    // Очищаем и создаем карточки
    teamGrid.innerHTML = '';
    teamMembers.forEach((member, index) => {
        const memberCard = createMemberCard(member, index);
        teamGrid.appendChild(memberCard);
    });

    // Инициализируем карусель
    updateSlidesToShow();
    setupCarouselNavigation();
    updateCarousel();
}

function createMemberCard(member, index) {
    const memberCard = document.createElement('div');
    memberCard.className = 'team-member';
    memberCard.dataset.index = index;
    
    const currentLang = document.documentElement.getAttribute('lang') || 'ru';
    const useEnglish = currentLang === 'en';

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

    memberCard.addEventListener('click', (e) => {
        openTeamModal(member);
    });

    return memberCard;
}

function updateSlidesToShow() {
    const width = window.innerWidth;
    let newSlidesToShow;
    
    if (width < 480) newSlidesToShow = 1;
    else if (width < 768) newSlidesToShow = 2;
    else if (width < 1024) newSlidesToShow = 3;
    else newSlidesToShow = 4;
    
    if (newSlidesToShow !== slidesToShow) {
        slidesToShow = newSlidesToShow;
        updateCarousel();
    }
}

function updateCarousel() {
    const teamGrid = document.querySelector('.team-grid');
    if (!teamGrid || teamGrid.children.length === 0) return;

    // Рассчитываем ширину одного слайда
    const firstSlide = teamGrid.children[0];
    slideWidth = firstSlide.offsetWidth + gap;
    
    // Рассчитываем максимальный слайд
    const maxSlide = Math.max(0, teamMembers.length - slidesToShow);
    currentSlide = Math.min(currentSlide, maxSlide);
    
    // Устанавливаем позицию
    setSliderPosition();
    updateNavigation();
    updateDots();
}

function setSliderPosition() {
    const teamGrid = document.querySelector('.team-grid');
    if (teamGrid) {
        const translateX = -currentSlide * slideWidth;
        teamGrid.style.transform = `translateX(${translateX}px)`;
        teamGrid.style.transition = 'transform 0.4s ease';
    }
}

function goToSlide(slideIndex) {
    const maxSlide = Math.max(0, teamMembers.length - slidesToShow);
    currentSlide = Math.max(0, Math.min(slideIndex, maxSlide));
    updateCarousel();
}

function setupCarouselNavigation() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Удаляем старые обработчики
    const newPrevBtn = prevBtn?.cloneNode(true);
    const newNextBtn = nextBtn?.cloneNode(true);
    
    if (prevBtn && newPrevBtn) {
        prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
        newPrevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    }
    
    if (nextBtn && newNextBtn) {
        nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
        newNextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    }
}

function updateNavigation() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.disabled = currentSlide === 0;
        prevBtn.style.opacity = prevBtn.disabled ? '0.3' : '0.9';
    }
    
    if (nextBtn) {
        const maxSlide = Math.max(0, teamMembers.length - slidesToShow);
        nextBtn.disabled = currentSlide >= maxSlide;
        nextBtn.style.opacity = nextBtn.disabled ? '0.3' : '0.9';
    }
}

function createDots() {
    const dotsContainer = document.querySelector('.carousel-dots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    const dotCount = Math.ceil(teamMembers.length / slidesToShow);
    
    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.addEventListener('click', () => goToSlide(i * slidesToShow));
        dotsContainer.appendChild(dot);
    }
    
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    const activeDotIndex = Math.floor(currentSlide / slidesToShow);
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeDotIndex);
    });
}

// Render Team with Language Support
function renderTeam(lang) {
    const teamGrid = document.querySelector('.team-grid');
    if (!teamGrid) return;
    
    teamGrid.innerHTML = '';
    teamMembers.forEach((member, index) => {
        const memberCard = createMemberCard(member, index);
        teamGrid.appendChild(memberCard);
    });
    
    // Полная переинициализация
    updateSlidesToShow();
    setupCarouselNavigation();
    updateCarousel();
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
                        <span class="lang-en">Learn more</span>
                    </a>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
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

// Initialize Everything
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme and language
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedLang = getCookie('language') || 'ru';
    
    setTheme(savedTheme);
    setLanguage(savedLang);
    
    // Initialize team carousel
    initTeamCarousel();
    
    // Setup modal handlers
    setupModalHandlers();
    
    // Theme switcher
    document.querySelectorAll('.theme-btn').forEach(button => {
        button.addEventListener('click', () => {
            setTheme(button.getAttribute('data-theme'));
        });
    });
    
    // Language switcher
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', () => {
            setLanguage(button.getAttribute('data-lang'));
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
    
    // Keyboard navigation for carousel
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
        else if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
        else if (e.key === 'Escape') closeModal();
    });
    
    // Window resize handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateSlidesToShow();
            updateCarousel();
        }, 250);
    });

    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 200);
        }, 2000);
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

let animationFrame = 0;

