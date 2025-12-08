// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeFAQ();
    initializePhoneMask();
    initializeContactAnimations();
    setupCopyContactInfo();
});

// Инициализация формы обратной связи
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Останавливаем стандартную отправку
        
        // Проверяем валидность формы
        if (!validateForm()) return;
        
        const submitBtn = this.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;
        const isRu = document.documentElement.lang === 'ru';
        
        // Показываем загрузку
        submitBtn.innerHTML = isRu 
            ? '<i class="fas fa-spinner fa-spin"></i> Отправка...' 
            : '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        try {
            // Отправляем на Formspree
            const response = await fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Успех!
                if (isRu) {
                    showNotification(
                        '✅ Отправлено успешно!',
                        'Ваше сообщение доставлено. Сейчас вы будете перенаправлены...',
                        'success'
                    );
                } else {
                    showNotification(
                        '✅ Sent successfully!',
                        'Your message has been delivered. You will be redirected...',
                        'success'
                    );
                }
                
                // Ждем 2 секунды и перенаправляем
                setTimeout(() => {
                    const redirectUrl = this.querySelector('input[name="_next"]')?.value;
                    if (redirectUrl) {
                        window.location.href = redirectUrl;
                    } else {
                        // Если нет redirect, очищаем форму
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('loading');
                        this.reset();
                        clearErrors();
                    }
                }, 2000);
                
            } else {
                // Ошибка от Formspree
                const errorText = await response.text();
                console.error('Formspree error response:', errorText);
                throw new Error(`Formspree error: ${response.status}`);
            }
            
        } catch (error) {
            console.error('Ошибка отправки формы:', error);
            
            // Показываем ошибку
            if (isRu) {
                showNotification(
                    '❌ Ошибка отправки',
                    'Что-то пошло не так. Попробуйте еще раз или свяжитесь с нами другим способом.',
                    'error'
                );
            } else {
                showNotification(
                    '❌ Sending error',
                    'Something went wrong. Please try again or contact us another way.',
                    'error'
                );
            }
            
            // Возвращаем кнопку
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    });
    
    // Валидация в реальном времени
    setupRealTimeValidation();
}

// Валидация формы
function validateForm() {
    const form = document.getElementById('contactForm');
    const isRu = document.documentElement.lang === 'ru';
    let isValid = true;
    
    // Очистить предыдущие ошибки
    clearErrors();
    
    // Валидация имени
    const name = form.querySelector('#name').value.trim();
    if (!name) {
        showError('name', isRu ? 'Пожалуйста, введите ваше имя' : 'Please enter your name');
        isValid = false;
    } else if (name.length < 2) {
        showError('name', isRu ? 'Имя должно быть не менее 2 символов' : 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Валидация email
    const email = form.querySelector('#email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showError('email', isRu ? 'Пожалуйста, введите ваш email' : 'Please enter your email');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('email', isRu ? 'Пожалуйста, введите корректный email' : 'Please enter a valid email');
        isValid = false;
    }
    
    // Валидация темы
    const subject = form.querySelector('#subject').value;
    if (!subject) {
        showError('subject', isRu ? 'Пожалуйста, выберите тему' : 'Please select a subject');
        isValid = false;
    }
    
    // Валидация сообщения
    const message = form.querySelector('#message').value.trim();
    if (!message) {
        showError('message', isRu ? 'Пожалуйста, введите сообщение' : 'Please enter your message');
        isValid = false;
    } else if (message.length < 10) {
        showError('message', isRu ? 'Сообщение должно быть не менее 10 символов' : 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

// Показать ошибку
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    field.classList.add('error');
    formGroup.classList.add('has-error');
    
    // Создать или обновить сообщение об ошибке
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Очистить ошибки
function clearErrors() {
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('has-error');
        const input = group.querySelector('input, textarea, select');
        if (input) input.classList.remove('error');
        
        const errorMsg = group.querySelector('.error-message');
        if (errorMsg) errorMsg.style.display = 'none';
    });
}

// Валидация в реальном времени
function setupRealTimeValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('blur', function() {
            const fieldId = this.id;
            const value = this.value.trim();
            const isRu = document.documentElement.lang === 'ru';
            
            // Очистить ошибку при фокусе
            clearFieldError(fieldId);
            
            // Валидация при потере фокуса
            if (fieldId === 'name' && value && value.length < 2) {
                showError(fieldId, isRu ? 'Имя должно быть не менее 2 символов' : 'Name must be at least 2 characters');
            } else if (fieldId === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showError(fieldId, isRu ? 'Пожалуйста, введите корректный email' : 'Please enter a valid email');
                }
            } else if (fieldId === 'message' && value && value.length < 10) {
                showError(fieldId, isRu ? 'Сообщение должно быть не менее 10 символов' : 'Message must be at least 10 characters');
            }
        });
        
        field.addEventListener('input', function() {
            // Очистить ошибку при вводе
            clearFieldError(this.id);
        });
    });
}

// Очистить ошибку для конкретного поля
function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    const formGroup = field.closest('.form-group');
    if (formGroup) {
        formGroup.classList.remove('has-error');
        field.classList.remove('error');
        
        const errorMsg = formGroup.querySelector('.error-message');
        if (errorMsg) errorMsg.style.display = 'none';
    }
}

// Функция для показа уведомлений
function showNotification(title, message, type = 'info') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas ${icon}"></i>
        </div>
        <div class="notification-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Стили для уведомления (добавляем один раз)
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 30px;
                right: 30px;
                background: var(--card-bg);
                border-left: 4px solid #3498db;
                border-radius: 8px;
                padding: 15px 20px;
                display: flex;
                align-items: center;
                gap: 15px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                z-index: 9999;
                max-width: 400px;
                transform: translateX(120%);
                transition: transform 0.3s ease;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-success {
                border-left-color: #2ecc71;
            }
            
            .notification-error {
                border-left-color: #e74c3c;
            }
            
            .notification-icon {
                font-size: 1.5rem;
            }
            
            .notification-success .notification-icon {
                color: #2ecc71;
            }
            
            .notification-error .notification-icon {
                color: #e74c3c;
            }
            
            .notification-content h4 {
                margin: 0 0 5px 0;
                color: var(--text);
                font-size: 1rem;
            }
            
            .notification-content p {
                margin: 0;
                color: var(--text-secondary);
                font-size: 0.9rem;
                line-height: 1.4;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                padding: 5px;
                opacity: 0.7;
                transition: opacity 0.3s ease;
                margin-left: auto;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Добавляем на страницу
    document.body.appendChild(notification);
    
    // Показываем с анимацией
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Кнопка закрытия
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
    
    // Автоматическое закрытие через 5 секунд
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Инициализация FAQ
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Закрыть все остальные FAQ
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherIcon = otherItem.querySelector('.faq-question i');
                        if (otherIcon) {
                            otherIcon.classList.remove('fa-chevron-down');
                            otherIcon.classList.add('fa-question-circle');
                        }
                    }
                });
                
                // Переключить текущий FAQ
                item.classList.toggle('active');
                
                // Анимация иконки
                const icon = question.querySelector('i');
                if (icon) {
                    if (item.classList.contains('active')) {
                        icon.classList.remove('fa-question-circle');
                        icon.classList.add('fa-chevron-down');
                    } else {
                        icon.classList.remove('fa-chevron-down');
                        icon.classList.add('fa-question-circle');
                    }
                }
            });
        }
    });
    
    // Открыть первый FAQ по умолчанию
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        const icon = faqItems[0].querySelector('.faq-question i');
        if (icon) {
            icon.classList.remove('fa-question-circle');
            icon.classList.add('fa-chevron-down');
        }
    }
}

// Маска для телефона
function initializePhoneMask() {
    const phoneInput = document.getElementById('phone');
    
    if (!phoneInput) return;
    
    phoneInput.addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (!value.startsWith('7') && !value.startsWith('8')) {
                value = '7' + value;
            }
            
            let formattedValue = '+7 (';
            
            if (value.length > 1) {
                formattedValue += value.substring(1, 4);
            }
            if (value.length >= 4) {
                formattedValue += ') ' + value.substring(4, 7);
            }
            if (value.length >= 7) {
                formattedValue += '-' + value.substring(7, 9);
            }
            if (value.length >= 9) {
                formattedValue += '-' + value.substring(9, 11);
            }
            
            this.value = formattedValue;
        }
    });
    
    phoneInput.addEventListener('keydown', function(e) {
        // Разрешить: backspace, delete, tab, escape, enter
        if ([46, 8, 9, 27, 13].includes(e.keyCode) ||
            // Разрешить: Ctrl+A
            (e.keyCode === 65 && e.ctrlKey === true) ||
            // Разрешить: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        
        // Запретить все, кроме цифр
        if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
}

// Анимации для контактных карточек
function initializeContactAnimations() {
    const contactCards = document.querySelectorAll('.contact-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    contactCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Добавить CSS для анимации
    if (!document.querySelector('.contact-animations')) {
        const style = document.createElement('style');
        style.className = 'contact-animations';
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Копирование контактной информации при клике
function setupCopyContactInfo() {
    const contactDetails = document.querySelectorAll('.contact-details p:not(.contact-note)');
    
    contactDetails.forEach(detail => {
        detail.style.cursor = 'pointer';
        detail.style.position = 'relative';
        
        // Добавляем всплывающую подсказку
        detail.title = document.documentElement.lang === 'ru' 
            ? 'Нажмите чтобы скопировать' 
            : 'Click to copy';
        
        detail.addEventListener('click', function() {
            const textToCopy = this.textContent;
            
            // Используем Clipboard API если доступен
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showCopyFeedback(this, true);
                }).catch(() => {
                    // Fallback для старых браузеров
                    copyUsingFallback(textToCopy, this);
                });
            } else {
                // Fallback для HTTP или старых браузеров
                copyUsingFallback(textToCopy, this);
            }
        });
    });
}

// Показать обратную связь при копировании
function showCopyFeedback(element, success) {
    const originalText = element.textContent;
    const isRu = document.documentElement.lang === 'ru';
    
    if (success) {
        element.textContent = isRu ? 'Скопировано! ✓' : 'Copied! ✓';
        element.style.color = '#2ecc71';
    } else {
        element.textContent = isRu ? 'Не удалось скопировать' : 'Failed to copy';
        element.style.color = '#e74c3c';
    }
    
    setTimeout(() => {
        element.textContent = originalText;
        element.style.color = '';
    }, 1500);
}

// Fallback метод копирования
function copyUsingFallback(text, element) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        showCopyFeedback(element, successful);
    } catch (err) {
        showCopyFeedback(element, false);
        console.error('Fallback copy failed:', err);
    }
    
    document.body.removeChild(textArea);
}

// Инициализация частиц на герое контактов
function initializeContactParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 40, density: { enable: true, value_area: 800 } },
                color: { value: "#3498db" },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#3498db",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }
}

// Адаптация для мобильных устройств
function setupMobileOptimizations() {
    // Оптимизация высоты поля сообщения на мобильных
    const messageTextarea = document.getElementById('message');
    if (messageTextarea && window.innerWidth <= 768) {
        messageTextarea.style.minHeight = '100px';
    }
    
    // Улучшение отображения select на мобильных
    const selectElement = document.getElementById('subject');
    if (selectElement && window.innerWidth <= 768) {
        selectElement.style.fontSize = '16px'; // Предотвращает масштабирование в iOS
    }
}

// Вызов оптимизаций при загрузке и изменении размера
window.addEventListener('load', setupMobileOptimizations);
window.addEventListener('resize', setupMobileOptimizations);

// Инициализация частиц когда DOM готов
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeContactParticles);
} else {
    initializeContactParticles();
}
