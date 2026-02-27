document.addEventListener('DOMContentLoaded', () => {
    // 1. Гамбургер-меню
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    // Создаем оверлей, если его нет
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
    }

    function toggleMenu(open) {
        const isOpen = open !== undefined ? open : !mobileMenu.classList.contains('active');
        hamburger.classList.toggle('active', isOpen);
        mobileMenu.classList.toggle('active', isOpen);
        overlay.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        overlay.addEventListener('click', () => toggleMenu(false));

        // Закрытие меню при клике на мобильные ссылки
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    toggleMenu(false);
                    
                    const target = document.querySelector(targetId);
                    if (target) {
                        const headerHeight = document.querySelector('.glass-header').offsetHeight;
                        window.scrollTo({
                            top: target.offsetTop - headerHeight - 20,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // 2. Клик по фото
    const photoCard = document.getElementById('photoCard');
    const photoHashtags = document.getElementById('photoHashtags');

    if (photoCard && photoHashtags) {
        photoCard.addEventListener('click', (e) => {
            e.stopPropagation();
            photoHashtags.classList.toggle('active');
            photoHashtags.querySelectorAll('.photo-hashtag').forEach((tag, i) => {
                tag.style.setProperty('--i', i);
            });
        });
    }

    document.addEventListener('click', (e) => {
        if (photoHashtags && !photoCard.contains(e.target)) {
            photoHashtags.classList.remove('active');
        }
    });

    // 3. Детали проектов
    const detailButtons = document.querySelectorAll('.work-detail-btn');
    const details = document.querySelectorAll('.work-detail');

    detailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = btn.dataset.project;
            const targetDetail = document.getElementById(`detail-${projectId}`);
            
            details.forEach(d => { 
                if (d !== targetDetail) d.classList.remove('active'); 
            });
            
            if (targetDetail) {
                targetDetail.classList.toggle('active');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.work-detail') && !e.target.closest('.work-detail-btn')) {
            details.forEach(d => d.classList.remove('active'));
        }
    });

    // 4. Плавный скролл для десктоп навигации
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.glass-header').offsetHeight;
                    window.scrollTo({
                        top: target.offsetTop - headerHeight - 20,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 5. Анимация появления при скролле
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.skill-card, .work-card, .contact-item').forEach(el => {
        el.classList.add('reveal-item');
        observer.observe(el);
    });

    // 6. Активный пункт меню и липкий хедер
    const sections = document.querySelectorAll('section[id]');
    const header = document.getElementById('header');
    let lastScrollTop = 0;

    function onScroll() {
        const scrollPos = window.scrollY + 150;
        
        // Header sticky
        if (window.scrollY > 50) {
            header.classList.add('sticky');
            
            // Hide/show on scroll direction
            if (window.scrollY > lastScrollTop && window.scrollY > 200) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
        } else {
            header.classList.remove('sticky', 'hidden');
        }

        // Active link
        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                const id = section.getAttribute('id');
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
        
        lastScrollTop = window.scrollY;
    }

    window.addEventListener('scroll', onScroll);
    onScroll(); // Вызываем сразу для правильного состояния
    
    // 7. Копирование email
    const emailContact = document.querySelector('.contact-item[href*="mailto"]');
    if (emailContact) {
        emailContact.addEventListener('click', function(e) {
            e.preventDefault();
            const email = 'vladislavfomenko77@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                const original = this.querySelector('span:nth-child(2)').textContent;
                this.querySelector('span:nth-child(2)').textContent = 'Скопировано!';
                setTimeout(() => {
                    this.querySelector('span:nth-child(2)').textContent = original;
                }, 2000);
            });
        });
    }
    
    // 8. Закрытие меню при ресайзе на десктоп
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                toggleMenu(false);
            }
        }
    });
});
