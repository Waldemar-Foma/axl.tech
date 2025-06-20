document.addEventListener('DOMContentLoaded', function() {
    // Cookie functions
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

    // Preloader
    const preloader = document.querySelector('.preloader');
    const loadingProgress = document.querySelector('.loading-progress');
    
    if (loadingProgress) loadingProgress.style.width = '100%';
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 300);
        }, 1500);
    }

    // Theme switcher
    const themeButtons = document.querySelectorAll('.theme-btn');
    const html = document.documentElement;
    
    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme); // Keep theme in localStorage for consistency
        
        // Update icon colors
        document.documentElement.style.setProperty(
            '--icon-color', 
            theme === 'dark' ? '#ffffff' : '#000000'
        );
        
        themeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
        });
    }

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            setTheme(button.getAttribute('data-theme'));
        });
    });

    // Language switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    
    function setLanguage(lang) {
        html.setAttribute('lang', lang);
        setCookie('language', lang); // Save language to cookie
        
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
        
        document.querySelectorAll('.lang-ru, .lang-en').forEach(el => {
            el.style.display = 'none';
        });
        document.querySelectorAll(`.lang-${lang}`).forEach(el => {
            el.style.display = 'inline';
        });
        
        renderTeam(lang);
    }

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            setLanguage(button.getAttribute('data-lang'));
        });
    });

    // Team Section
    const teamGrid = document.querySelector('.team-grid');
    const teamData = [
        {
            name: 'Фоменко Владислав',
            nameEn: 'Fomenko Vladislav',
            role: 'Fullstack | WEB-Дизайнер',
            roleEn: 'Fullstack | WEB Designer',
            photo: 'https://sun9-16.userapi.com/impg/ceLsVmfjKm1m2T8-tF8rHcOXo8H-_7fAIc9Z4A/Z4CK4i1ernA.jpg?size=2560x1818&quality=95&sign=439daa320abdbb115e982be6ca275b83&type=album',
            bio: 'Опыт работы более 5 лет. Специализируется на веб разработке, разработке ТГ-ботов, разработки web/desctop приложений.',
            bioEn: 'Work experience of more than 5 years. Specializes in web development, telegram bot development, and web/desktop application development.',
            skills: ['Node.js', 'Python', 'HTML', 'Docker', 'CSS3', 'JavaScript', 'Figma', 'Adobe Illustrator', 'Adobe Photoshop', "Excel", "PowerPoint", "Communication", "PHP", "TypeScript"],
        },
        {
            name: 'Устинов Максим',
            nameEn: 'Ustinov Maksim',
            role: 'Менеджер | Тестировщик',
            roleEn: 'Manager | Tester',
            photo: 'https://sun9-79.userapi.com/impg/BAZ0JrH6-VD-V4NMKL7vLOxE65c0PcMlHU8ynw/rCNm9Ij6IQQ.jpg?size=1620x2160&quality=95&sign=394cf2bf293a3cdfe4a248bac3977bd1&type=album',
            bio: 'Руководит всеми процессами во время работы над проектом, поддерживает связь с клиентом, ищет и сообщает о багах, для дальнейшего устранения.',
            bioEn: 'Manages all processes while working on the project, keeps in touch with the client, searches for and reports bugs for further elimination.',
            skills: ['Figma', 'CSS3', 'HTML', 'Adobe Photoshop', "Python", "SWOT-analysis", "Communication", "PowerPoint", "English Language C1", "Managing", "Team Building"],
        },
        {
            name: 'Айрапетян Эрик',
            nameEn: 'Ayrapetyan Erik',
            role: 'Backend',
            roleEn: 'Backend',
            photo: 'https://i.postimg.cc/tTLK3nDq/photo-2025-06-21-00-21-49.jpg',
            bio: 'Обеспечивает стабильную работу всех сервисов платформы. Не только от начала до конца ее реализации, но и в течение ее работы.',
            bioEn: 'Ensures stable operation of all platform services. Not only from the beginning to the end of its implementation, but also during its operation.',
            skills: ["SQL", 'CSS3', 'HTML', "Python", "Java", "Docker", "PowerPoint", "Excel", "Communication", "Armenian language", "Node.js", "C#", "Unity", "Blender", "Wordpress"],
        },
    ];

    function renderTeam(lang) {
        if (!teamGrid) return;
        teamGrid.innerHTML = '';
        teamData.forEach(member => {
            const el = document.createElement('div');
            el.className = 'team-member';
            el.innerHTML = `
                <div class="member-photo" style="background-image: url('${member.photo}')"></div>
                <div class="member-info">
                    <h3 class="member-name">${lang === 'en' ? member.nameEn : member.name}</h3>
                    <p class="member-role">${lang === 'en' ? member.roleEn : member.role}</p>
                    <p class="member-bio">${lang === 'en' ? member.bioEn : member.bio}</p>
                    <div class="member-skills">
                        ${member.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
            `;
            teamGrid.appendChild(el);
        });
    }

    // Particles.js
    if (document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 }},
                color: { value: "#FF6B00" },
                shape: { type: "circle", stroke: { width: 0, color: "#000" }},
                opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 }},
                size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1 }},
                line_linked: { enable: true, distance: 150, color: "#FF6B00", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 1, direction: "none", random: true, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
                modes: { grab: { distance: 140, line_linked: { opacity: 1 }}, push: { particles_nb: 4 }}
            },
            retina_detect: true
        });
    }

    // Contact Form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const lang = html.getAttribute('lang') || 'ru';
            alert(lang === 'en' ? 'Thank you! Your message has been sent.' : 'Спасибо! Ваше сообщение отправлено.');
            this.reset();
        });
    }

    // Initialize
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    const savedLang = getCookie('language') || 'ru'; // Get language from cookie
    setLanguage(savedLang);
    
    renderTeam(savedLang);
});
