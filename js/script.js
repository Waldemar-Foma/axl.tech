document.addEventListener('DOMContentLoaded', function() {
    // Declare all DOM element variables at the top
    const preloader = document.querySelector('.preloader');
    const loadingProgress = document.querySelector('.loading-progress');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuItems = document.querySelector('.menu-items');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const langButtons = document.querySelectorAll('.lang-btn');
    const teamGrid = document.querySelector('.team-grid');
    const projectsSlider = document.querySelector('.projects-slider');
    const currentProject = document.querySelector('.current-project');
    const totalProjects = document.querySelector('.total-projects');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const html = document.documentElement;
    const contactForm = document.querySelector('.contact-form');

    // Preloader
    if (loadingProgress) {
        loadingProgress.style.width = '100%';
    }

    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 3000);
    }

    // Circular Menu
    if (menuToggle && menuItems) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            menuItems.classList.toggle('active');
        });
    }

    // Smooth scrolling for menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (menuToggle && menuItems) {
                menuToggle.classList.remove('active');
                menuItems.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Theme Switcher
    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        themeButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            }
        });
    }

    if (themeButtons.length) {
        themeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const theme = this.getAttribute('data-theme');
                setTheme(theme);
            });
        });
    }

    // Apply saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    // Language Switcher
    function setLanguage(lang) {
        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('language', lang);
        
        // Update active button
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        // Show/hide language elements
        document.querySelectorAll('[data-lang]').forEach(el => {
            if (el.hasAttribute('data-lang-only')) return;
            el.style.display = 'none';
        });
        
        document.querySelectorAll(`[data-lang="${lang}"]`).forEach(el => {
            if (el.hasAttribute('data-lang-only')) return;
            el.style.display = el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' ? 'block' : 'inline-block';
        });
        
        // Re-render dynamic content
        if (typeof renderTeam === 'function') renderTeam(lang);
        if (typeof renderProjects === 'function') renderProjects(lang);
        if (typeof initProjectsSlider === 'function') initProjectsSlider();
    }

    if (langButtons.length) {
        langButtons.forEach(button => {
            button.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                setLanguage(lang);
            });
        });
    }

    // Team Data
    const teamData = [
        {
            name: 'Фоменко Владислав',
            nameEn: 'Fomenko Vladislav',
            role: 'Fullstack|WEB-Дизайнер',
            roleEn: 'Fullstack|WEB-designer',
            photo: 'https://sun9-16.userapi.com/impg/ceLsVmfjKm1m2T8-tF8rHcOXo8H-_7fAIc9Z4A/Z4CK4i1ernA.jpg?size=2560x1818&quality=95&sign=439daa320abdbb115e982be6ca275b83&type=album',
            bio: 'Опыт работы более 5 лет. Специализируется на веб разработке, разработке ТГ-ботов, разработки web/desctop приложений.',
            bioEn: 'Work experience of more than 5 years. Specializes in web development, telegram bot development, and web/desktop application development.',
            skills: ['Node.js', 'Python', 'HTML', 'Docker', 'CSS3', 'JavaScript', 'Figma', 'Adobe Illustrator', 'Adobe Photoshop'],
        },
        {
            name: 'Устинов Максим',
            nameEn: 'Ustinov Maksim',
            role: 'Менеджер|Тестировщик',
            roleEn: 'Menager|Tester',
            photo: 'https://sun9-79.userapi.com/impg/BAZ0JrH6-VD-V4NMKL7vLOxE65c0PcMlHU8ynw/rCNm9Ij6IQQ.jpg?size=1620x2160&quality=95&sign=394cf2bf293a3cdfe4a248bac3977bd1&type=album',
            bio: 'Руководит всеми процессами во время работы над проектом, поддерживает связь с клиентом, ищет и сообщает о багах, для дальнейшего устранения.',
            bioEn: 'Manages all processes while working on the project, keeps in touch with the client, searches for and reports bugs for further elimination.',
            skills: ['Figma', 'CSS3', 'HTML', 'Adobe Photoshop'],
        },
    ];

    // Render Team
    function renderTeam(lang) {
        if (!teamGrid) return;
        
        teamGrid.innerHTML = '';
        
        teamData.forEach(member => {
            const memberElement = document.createElement('div');
            memberElement.className = 'team-member';
            
            memberElement.innerHTML = `
                <div class="member-photo" style="background-image: url('${member.photo}')"></div>
                <div class="member-info">
                    <h3 class="member-name">${lang === 'ru' ? member.name : member.nameEn}</h3>
                    <p class="member-role">${lang === 'ru' ? member.role : member.roleEn}</p>
                    <p class="member-bio">${lang === 'ru' ? member.bio : member.bioEn}</p>
                    <div class="member-skills">
                        ${member.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
            `;
            
            teamGrid.appendChild(memberElement);
        });
    }

    // Projects Data
    const projectsData = [
        {
            title: 'Корпоративный портал',
            titleEn: 'Corporate Portal',
            category: 'Веб-разработка',
            categoryEn: 'Web Development',
            description: 'Комплексное решение для автоматизации бизнес-процессов крупной компании.',
            descriptionEn: 'Comprehensive business process automation solution for large enterprises.',
            image: 'https://www.directum.ru/application/images/coprortal-dir_pic-1.png'
        },
        {
            title: 'Мобильное приложение',
            titleEn: 'Mobile Application',
            category: 'Мобильная разработка',
            categoryEn: 'Mobile Development',
            description: 'Приложение для управления финансами с использованием искусственного интеллекта.',
            descriptionEn: 'Finance management app using artificial intelligence.',
            image: 'https://lms-api.ycla-coding.com/image/abd7cf0e-fe47-4833-84fd-4b5a011cbeb5.jpeg'
        },
        {
            title: 'Интернет-магазин',
            titleEn: 'E-commerce',
            category: 'Веб-разработка',
            categoryEn: 'Web Development',
            description: 'Высоконагруженная платформа электронной коммерции с индивидуальным дизайном.',
            descriptionEn: 'High-load e-commerce platform with custom design.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZEbXIkT7hQADpQx9eOufUvI4kl91ac-fu2g&shttps://eurobyte.ru/img/articles/plyusy-i-minusy-internet-magazina/image1.png'
        },
        {
            title: 'Система аналитики',
            titleEn: 'Analytics System',
            category: 'Big Data',
            categoryEn: 'Big Data',
            description: 'Система сбора и анализа больших данных в реальном времени.',
            descriptionEn: 'Real-time big data collection and analysis system.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_ErmPGYtiDr-oTZtEcfPrHNw7-yunUinkQ&s'
        }
    ];

    // Projects Elements
    let currentSlide = 0;
    let slides = [];

    if (totalProjects) {
        totalProjects.textContent = projectsData.length;
    }

    function renderProjects(lang) {
        if (!projectsSlider) return;
        
        projectsSlider.innerHTML = '';
        
        projectsData.forEach((project, index) => {
            const slide = document.createElement('div');
            slide.className = 'project-slide';
            
            slide.innerHTML = `
                <img src="${project.image}" alt="${lang === 'ru' ? project.title : project.titleEn}" class="project-image">
                <div class="project-info">
                    <h3 class="project-title">${lang === 'ru' ? project.title : project.titleEn}</h3>
                    <span class="project-category">${lang === 'ru' ? project.category : project.categoryEn}</span>
                    <p class="project-description">${lang === 'ru' ? project.description : project.descriptionEn}</p>
                    <a href="#" class="btn" data-lang="ru">Подробнее</a>
                    <a href="#" class="btn" data-lang="en" style="display:none">Details</a>
                </div>
            `;
            
            projectsSlider.appendChild(slide);
        });
        
        slides = document.querySelectorAll('.project-slide');
        updateSlider();
    }

    function updateSlider() {
        if (!projectsSlider || !slides.length) return;
        
        const slideWidth = slides[0].offsetWidth;
        projectsSlider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        
        if (currentProject) {
            currentProject.textContent = currentSlide + 1;
        }
    }

    function initProjectsSlider() {
        if (!prevBtn || !nextBtn) return;
        
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
            updateSlider();
        });
        
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
            updateSlider();
        });
        
        // Handle window resize
        window.addEventListener('resize', updateSlider);
    }

    // Tech Sphere
    const techTags = [
        'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Node.js',
        'Python', 'Django', 'PHP', 'Laravel', 'MySQL', 'MongoDB',
        'Docker', 'AWS', 'Git', 'Figma', 'Adobe XD', 'Sass',
        'Webpack', 'GraphQL', 'REST API', 'Jest', 'Cypress'
    ];

    // Initialize tag cloud
    if (document.getElementById('tech-sphere') && typeof TagCloud !== 'undefined') {
        TagCloud('#tech-sphere', techTags, {
            radius: 250,
            maxSpeed: 'fast',
            initSpeed: 'fast',
            direction: 135,
            keep: true,
            useHTML: true
        });
    }

    // Particles.js
    if (document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#FF6B00"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#FF6B00",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get current language
            const lang = document.documentElement.getAttribute('lang') || 'ru';
            
            // Show success message
            alert(lang === 'ru' 
                ? 'Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.' 
                : 'Thank you! Your message has been sent. We will contact you soon.');
            
            // Reset form
            this.reset();
        });
    }

    // Apply saved language
    const savedLang = localStorage.getItem('language') || 'ru';
    setLanguage(savedLang);

    // Initial renders
    renderTeam(savedLang);
    renderProjects(savedLang);
    initProjectsSlider();
});