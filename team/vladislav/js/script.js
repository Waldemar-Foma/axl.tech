// 1. Гамбургер-меню
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

// Создаем оверлей
const overlay = document.createElement('div');
overlay.className = 'menu-overlay';
document.body.appendChild(overlay);

if (hamburger && mobileMenu && overlay) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    overlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// 2. Клик по фото - показываем хэштеги
const photoCard = document.getElementById('photoCard');
const photoHashtags = document.getElementById('photoHashtags');

if (photoCard && photoHashtags) {
    photoCard.addEventListener('click', (e) => {
        e.stopPropagation();
        photoHashtags.classList.toggle('active');
        
        const tags = photoHashtags.querySelectorAll('.photo-hashtag');
        tags.forEach((tag, index) => {
            tag.style.setProperty('--i', index);
        });
    });
}

document.addEventListener('click', (e) => {
    if (photoHashtags && !photoCard.contains(e.target)) {
        photoHashtags.classList.remove('active');
    }
});

// 3. Раскрытие деталей проектов
const detailButtons = document.querySelectorAll('.work-detail-btn');
const details = document.querySelectorAll('.work-detail');

detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = btn.dataset.project;
        const detail = document.getElementById(`detail-${projectId}`);
        
        details.forEach(d => d.classList.remove('active'));
        
        if (detail) {
            detail.classList.add('active');
        }
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.work-detail') && !e.target.closest('.work-detail-btn')) {
        details.forEach(d => d.classList.remove('active'));
    }
});

// 4. Плавный скролл для всех ссылок
document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 5. Анимация появления при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .work-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 6. Активный пункт меню
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            current = section.getAttribute('id') || '';
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// 7. Копирование email
const emailContact = document.querySelector('.contact-item[href*="mailto"]');
if (emailContact) {
    emailContact.addEventListener('click', (e) => {
        e.preventDefault();
        const email = 'vladislavfomenko77@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
            const original = emailContact.querySelector('.contact-value').textContent;
            emailContact.querySelector('.contact-value').textContent = 'Скопировано!';
            setTimeout(() => {
                emailContact.querySelector('.contact-value').textContent = original;
            }, 2000);
        });
    });
}