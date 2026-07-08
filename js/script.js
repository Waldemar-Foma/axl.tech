const contactModal = document.getElementById('contactModal');
const teamModal = document.getElementById('teamModal');
const galleryModal = document.getElementById('galleryModal');
const closeButtons = document.querySelectorAll('.close-modal');

// Open contact modal
document.getElementById('contactNav')?.addEventListener('click', () => contactModal.style.display = 'flex');
document.getElementById('joinModalBtn')?.addEventListener('click', () => contactModal.style.display = 'flex');
document.getElementById('heroButton')?.addEventListener('click', () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('ctaButton')?.addEventListener('click', () => contactModal.style.display = 'flex');

// Close modals
closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        contactModal.style.display = 'none';
        teamModal.style.display = 'none';
        galleryModal.style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target === contactModal) contactModal.style.display = 'none';
    if (e.target === teamModal) teamModal.style.display = 'none';
    if (e.target === galleryModal) galleryModal.style.display = 'none';
});

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

// Обновите обработчики закрытия
closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        closeModal(contactModal);
        closeModal(teamModal);
        closeModal(galleryModal);
    });
});

window.addEventListener('click', (e) => {
    if (e.target === contactModal) closeModal(contactModal);
    if (e.target === teamModal) closeModal(teamModal);
    if (e.target === galleryModal) closeModal(galleryModal);
});

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
    
    modalPhoto.onerror = function() {
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="45" fill="%23e8e8ed"/%3E%3Ctext x="50" y="67" font-size="40" text-anchor="middle" fill="%23999"%3E📷%3C/text%3E%3C/svg%3E';
    };
    
    openModal(document.getElementById("teamModal"));
}

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
    
    modalPhoto.onerror = function() {
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="45" fill="%23e8e8ed"/%3E%3Ctext x="50" y="67" font-size="40" text-anchor="middle" fill="%23999"%3E📷%3C/text%3E%3C/svg%3E';
    };
    
    document.getElementById("teamModal").style.display = "flex";
    document.body.style.overflow = "hidden";
}

document.querySelectorAll(".member-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const memberId = btn.getAttribute("data-member");
        if (memberId && teamData[memberId]) {
            openMemberModal(memberId);
        }
    });
});

document.querySelectorAll(".member").forEach(card => {
    const silhouette = card.querySelector(".silhouette");
    if (silhouette) {
        silhouette.addEventListener("click", () => {
            const memberId = card.getAttribute("data-member");
            if (memberId && teamData[memberId]) openMemberModal(memberId);
        });
    }
});

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

// Thumbnail click for main photo
document.querySelectorAll('.thumbnail[data-img]').forEach(thumb => {
    thumb.addEventListener('click', () => {
        const imgSrc = thumb.dataset.img;
        if (imgSrc) {
            document.getElementById('mainTeamPhoto')?.setAttribute('src', imgSrc);
        }
    });
});

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

document.addEventListener('DOMContentLoaded', function() {
    const mainVector = document.getElementById('mainVectorOverlay');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainPhoto = document.getElementById('mainTeamPhoto');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const imgSrc = this.dataset.img;
            
            // Меняем главное фото
            if (mainPhoto) {
                mainPhoto.src = imgSrc;
            }
            
            // Анимация вектора при смене фото
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
