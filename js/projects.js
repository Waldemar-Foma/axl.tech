document.addEventListener('DOMContentLoaded', function() {
    // Project data
    const projectsData = [
        {
            title: 'Корпоративный портал',
            titleEn: 'Corporate Portal',
            category: 'Веб-разработка',
            categoryEn: 'Web Development',
            description: 'Комплексное решение для автоматизации бизнес-процессов крупной компании.',
            descriptionEn: 'Comprehensive business process automation solution for large enterprises.',
            image: 'https://www.directum.ru/application/images/coprortal-dir_pic-1.png',
            tags: ['web']
        },
        {
            title: 'Мобильное приложение',
            titleEn: 'Mobile Application',
            category: 'Мобильная разработка',
            categoryEn: 'Mobile Development',
            description: 'Приложение для управления финансами с использованием искусственного интеллекта.',
            descriptionEn: 'Finance management app using artificial intelligence.',
            image: 'https://lms-api.ycla-coding.com/image/abd7cf0e-fe47-4833-84fd-4b5a011cbeb5.jpeg',
            tags: ['mobile', 'ai']
        },
        {
            title: 'Интернет-магазин',
            titleEn: 'E-commerce',
            category: 'Веб-разработка',
            categoryEn: 'Web Development',
            description: 'Высоконагруженная платформа электронной коммерции с индивидуальным дизайном.',
            descriptionEn: 'High-load e-commerce platform with custom design.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZEbXIkT7hQADpQx9eOufUvI4kl91ac-fu2g&s',
            tags: ['web']
        },
        {
            title: 'Система аналитики',
            titleEn: 'Analytics System',
            category: 'Big Data',
            categoryEn: 'Big Data',
            description: 'Система сбора и анализа больших данных в реальном времени.',
            descriptionEn: 'Real-time big data collection and analysis system.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_ErmPGYtiDr-oTZtEcfPrHNw7-yunUinkQ&s',
            tags: ['ai']
        }
    ];

    // DOM elements
    const projectsGrid = document.querySelector('.projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectModal = document.querySelector('.project-modal');
    const modalContent = document.querySelector('.modal-body');
    const modalClose = document.querySelector('.modal-close');
    const html = document.documentElement;

    // Current language
    let currentLang = html.getAttribute('lang') || 'ru';

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
        currentLang = html.getAttribute('lang') || 'ru';
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