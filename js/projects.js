document.addEventListener('DOMContentLoaded', function() {
    // Cookie function to get language
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

    // Project data
    const projectsData = [
        {
            title: 'SkillScout — сервис по подбору кандидатов на вакансию по типу личности',
            titleEn: 'SkillScout — candidate matching service based on personality type',
            category: 'Веб-разработка / HR-технологии', 
            categoryEn: 'Web Development / HR Technologies',
            description: 'Автоматизированный сервис для подбора кандидатов на вакансии с учетом их психологического профиля. Интегрирует психометрические модели (Big Five, MBTI) и технологии анализа данных для повышения эффективности рекрутинга.',
            descriptionEn: 'Automated service for candidate matching based on psychological profiling. Integrates psychometric models (Big Five, MBTI) and data analysis technologies to enhance recruitment efficiency.',
            image: 'https://sun9-17.userapi.com/impg/2DAJggRJUf4eDUGe7WZiQ-j2RCVb8BguTdNYGA/EAa99hqebmY.jpg?size=1080x1440&quality=95&sign=87c1a6e9799b010a087f9788b67228df&type=album',
            tags: ['web', 'ai', 'mobile']
        },
        {
            title: 'Конструктор графов - решение для профессионалов',
            titleEn: 'Graph Constructor - a solution for professionals',
            category: 'Веб-разработка', 
            categoryEn: 'Web Development',
            description: 'Веб сервис с технологией построения графов на плоскости для профессионалов.',
            descriptionEn: 'A web service with graph construction technology on a plane for professionals.',
            image: 'https://prog-cpp.ru/wp-content/uploads/width.gif',
            tags: ['web']
        },
    ];

    // DOM elements
    const projectsGrid = document.querySelector('.projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectModal = document.querySelector('.project-modal');
    const modalContent = document.querySelector('.modal-body');
    const modalClose = document.querySelector('.modal-close');
    const html = document.documentElement;

    // Current language - get from cookie first, then from html attribute
    let currentLang = getCookie('language') || html.getAttribute('lang') || 'ru';

    // Render projects
    function renderProjects(filter = 'all') {
        if (!projectsGrid) return;
        
        projectsGrid.innerHTML = '';
        
        projectsData.forEach((project, index) => {
            if (filter !== 'all' && !project.tags.includes(filter)) return;
            
            const projectEl = document.createElement('div');
            projectEl.className = 'project-card';
            projectEl.setAttribute('data-index', index);
            
            projectEl.innerHTML = `
                <div class="project-image" style="background-image: url('${project.image}')"></div>
                <div class="project-overlay">
                    <h3 class="project-title">${currentLang === 'en' ? project.titleEn : project.title}</h3>
                    <span class="project-category">${currentLang === 'en' ? project.categoryEn : project.category}</span>
                    <button class="btn view-details">
                        <span class="lang-ru" style="display: ${currentLang === 'ru' ? 'inline' : 'none'}">Подробнее</span>
                        <span class="lang-en" style="display: ${currentLang === 'en' ? 'inline' : 'none'}">Details</span>
                    </button>
                </div>
            `;
            
            projectsGrid.appendChild(projectEl);
        });

        // Add event listeners for details buttons
        document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const card = this.closest('.project-card');
                const projectIndex = card.getAttribute('data-index');
                openModal(projectIndex);
            });
        });

        // Add event listeners for project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', function() {
                const projectIndex = this.getAttribute('data-index');
                openModal(projectIndex);
            });
        });
    }

    // Open modal with project details
    function openModal(projectIndex) {
        const project = projectsData[projectIndex];
        
        modalContent.innerHTML = `
            <div class="modal-left">
                <div class="modal-image" style="background-image: url('${project.image}')"></div>
            </div>
            <div class="modal-right">
                <h2>${currentLang === 'en' ? project.titleEn : project.title}</h2>
                <span class="modal-category">${currentLang === 'en' ? project.categoryEn : project.category}</span>
                <p class="modal-description">${currentLang === 'en' ? project.descriptionEn : project.description}</p>
                <div class="modal-tags">
                    ${project.tags.map(tag => `<span class="tag-${tag}">${tag.toUpperCase()}</span>`).join('')}
                </div>
                <button class="btn modal-btn">
                    <span class="lang-ru" style="display: ${currentLang === 'ru' ? 'inline' : 'none'}">Посетить сайт</span>
                    <span class="lang-en" style="display: ${currentLang === 'en' ? 'inline' : 'none'}">Visit website</span>
                </button>
            </div>
        `;
        
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeModal() {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Filter buttons event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            renderProjects(filter);
        });
    });

    // Modal close event listeners
    modalClose.addEventListener('click', closeModal);
    projectModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // Handle language change
    function handleLanguageChange() {
        currentLang = getCookie('language') || html.getAttribute('lang') || 'ru';
        const activeFilter = document.querySelector('.filter-btn.active');
        const currentFilter = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
        renderProjects(currentFilter);
    }

    // Observe language changes
    const langObserver = new MutationObserver(handleLanguageChange);
    langObserver.observe(html, { attributes: true, attributeFilter: ['lang'] });

    // Initialize
    renderProjects();
});

