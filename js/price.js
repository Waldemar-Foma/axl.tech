document.addEventListener('DOMContentLoaded', function() {
    // Price data converted from Excel
    const priceData = {
        development: [
            {
                title: "Лендинг (одностраничник)",
                titleEn: "Landing Page",
                price: "7 000 - 15 000",
                period: "руб",
                periodEn: "RUB",
                popular: false,
                features: [
                    "Дизайн + верстка",
                    "Варианты: базовая реализация / адаптивность + формы / админ-панель + наполнение"
                ],
                featuresEn: [
                    "Design + layout",
                    "Options: basic implementation / responsiveness + forms / admin panel + content"
                ]
            },
            {
                title: "Корпоративный сайт",
                titleEn: "Corporate Website",
                price: "25 000 - 60 000",
                period: "руб",
                periodEn: "RUB",
                popular: true,
                features: [
                    "До 5 страниц + CMS",
                    "Варианты: базовая реализация / адаптивность + формы / админ-панель + наполнение"
                ],
                featuresEn: [
                    "Up to 5 pages + CMS",
                    "Options: basic implementation / responsiveness + forms / admin panel + content"
                ]
            },
            {
                title: "Интернет-магазин",
                titleEn: "E-commerce",
                price: "20 000 - 65 000",
                period: "руб",
                periodEn: "RUB",
                popular: false,
                features: [
                    "Каталог + корзина + оплата",
                    "Варианты: базовая реализация / адаптивность + формы / админ-панель + наполнение"
                ],
                featuresEn: [
                    "Catalog + cart + payment",
                    "Options: basic implementation / responsiveness + forms / admin panel + content"
                ]
            },
            {
                title: "Доработка сайта",
                titleEn: "Website Improvements",
                price: "1 500 - 2 500",
                period: "руб/час",
                periodEn: "RUB/hour",
                popular: false,
                features: [
                    "Правки дизайна/функционала",
                    "Варианты: базовая реализация / адаптивность + формы / админ-панель + наполнение"
                ],
                featuresEn: [
                    "Design/functionality edits",
                    "Options: basic implementation / responsiveness + forms / admin panel + content"
                ]
            }
        ],
        design: [
            {
                title: "Дизайн лендинга в Figma",
                titleEn: "Landing Page Design in Figma",
                price: "3 000 - 10 000",
                period: "руб",
                periodEn: "RUB",
                popular: false,
                features: [
                    "Варианты: 1 концепция / 2 концепции / 3 концепции + анимации"
                ],
                featuresEn: [
                    "Options: 1 concept / 2 concepts / 3 concepts + animations"
                ]
            },
            {
                title: "Редизайн страницы",
                titleEn: "Page Redesign",
                price: "3 000 - 10 000",
                period: "руб",
                periodEn: "RUB",
                popular: false,
                features: [
                    "Варианты: статичный макет / адаптивный макет / полный гайдлайн"
                ],
                featuresEn: [
                    "Options: static layout / responsive layout / full guideline"
                ]
            },
            {
                title: "UI-кит компонентов",
                titleEn: "UI Component Kit",
                price: "3 000 - 10 000",
                period: "руб",
                periodEn: "RUB",
                popular: true,
                features: [
                    "Варианты: базовые элементы / расширенный набор / полная система дизайна"
                ],
                featuresEn: [
                    "Options: basic elements / extended set / complete design system"
                ]
            }
        ],
        backend: [
            {
                title: "API на Node.js/Python",
                titleEn: "Node.js/Python API",
                price: "15 000 - 50 000",
                period: "руб",
                periodEn: "RUB",
                popular: false,
                features: [
                    "Варианты: базовые endpoints / документация + тесты / оптимизация + безопасность"
                ],
                featuresEn: [
                    "Options: basic endpoints / documentation + tests / optimization + security"
                ]
            },
            {
                title: "Интеграция платежей",
                titleEn: "Payment Integration",
                price: "10 000 - 30 000",
                period: "руб",
                periodEn: "RUB",
                popular: false,
                features: [
                    "Варианты: 1 система / 2 системы / кастомное решение"
                ],
                featuresEn: [
                    "Options: 1 system / 2 systems / custom solution"
                ]
            },
            {
                title: "Настройка БД (MySQL)",
                titleEn: "MySQL Database Setup",
                price: "8 000 - 25 000",
                period: "руб",
                periodEn: "RUB",
                popular: false,
                features: [
                    "Варианты: простая схема / оптимизированная / репликация + бэкапы"
                ],
                featuresEn: [
                    "Options: simple schema / optimized / replication + backups"
                ]
            }
        ],
        automation: [
            {
                title: "Telegram-бот (базовый)",
                titleEn: "Basic Telegram Bot",
                price: "8 000 - 20 000",
                period: "руб",
                periodEn: "RUB",
                popular: false,
                features: [
                    "Варианты: базовые команды / Webhook + БД / AI-интеграция"
                ],
                featuresEn: [
                    "Options: basic commands / Webhook + DB / AI integration"
                ]
            },
            {
                title: "Парсер данных (Python)",
                titleEn: "Python Data Parser",
                price: "5 000 - 25 000",
                period: "руб",
                periodEn: "RUB",
                popular: true,
                features: [
                    "Варианты: 1 источник / 3 источника / облачное решение"
                ],
                featuresEn: [
                    "Options: 1 source / 3 sources / cloud solution"
                ]
            },
            {
                title: "Автоматизация отчетов",
                titleEn: "Report Automation",
                price: "10 000 - 35 000",
                period: "руб",
                periodEn: "RUB",
                popular: false,
                features: [
                    "Варианты: простые скрипты / система уведомлений / полный workflow"
                ],
                featuresEn: [
                    "Options: simple scripts / notification system / full workflow"
                ]
            }
        ],
        support: [
            {
                title: "Техподдержка",
                titleEn: "Technical Support",
                price: "2 000 - 5 000",
                period: "руб/час",
                periodEn: "RUB/hour",
                popular: false,
                features: [
                    "Варианты: 5 правок/мес / безлимитные правки"
                ],
                featuresEn: [
                    "Options: 5 edits/month / unlimited edits"
                ]
            },
            {
                title: "Срочные правки (вне плана)",
                titleEn: "Urgent Edits (off-plan)",
                price: "1 500 - 5 000",
                period: "руб",
                periodEn: "RUB",
                popular: false,
                features: [
                    "Варианты: +1 500 ₽/случай / включено в тариф"
                ],
                featuresEn: [
                    "Options: +1 500 RUB/case / included in tariff"
                ]
            },
            {
                title: "Консультация",
                titleEn: "Consultation",
                price: "2 000 - 5 000",
                period: "руб",
                periodEn: "RUB",
                popular: false,
                features: [
                    "Варианты: 1 час/месяц / 3 часа/месяц"
                ],
                featuresEn: [
                    "Options: 1 hour/month / 3 hours/month"
                ]
            }
        ]
    };

    const priceTableBody = document.getElementById('priceTableBody');
    const tabs = document.querySelectorAll('.price-tab');
    let currentCategory = 'development';

    function loadPrices(category) {
        if (!priceTableBody) return;
        
        priceTableBody.innerHTML = '';
        const prices = priceData[category];
        
        prices.forEach(service => {
            const row = document.createElement('div');
            row.className = 'pricing-row';
            
            row.innerHTML = `
                <div class="pricing-cell service-col lang-ru">${service.title} ${service.popular ? '<span class="popular-badge lang-ru">Популярный</span>' : ''}</div>
                <div class="pricing-cell service-col lang-en">${service.titleEn} ${service.popular ? '<span class="popular-badge lang-en">Popular</span>' : ''}</div>
                <div class="pricing-cell price-col lang-ru">${service.price} ${service.period}</div>
                <div class="pricing-cell price-col lang-en">${service.priceEn} ${service.periodEn}</div>
                <div class="pricing-cell features-col lang-ru">
                    <div class="price-features">
                        ${service.features.map(feat => `
                            <div class="price-feature">
                                <i class="fas fa-check"></i>
                                <span>${feat}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="pricing-cell features-col lang-en">
                    <div class="price-features">
                        ${service.featuresEn.map(feat => `
                            <div class="price-feature">
                                <i class="fas fa-check"></i>
                                <span>${feat}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="pricing-cell action-col">
                    <a href="contact.html" class="order-btn">
                        <i class="fas fa-paper-plane"></i>
                        <span class="lang-ru">Заказать</span>
                        <span class="lang-en">Order</span>
                    </a>
                </div>
            `;
            
            priceTableBody.appendChild(row);
        });
    }

    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            loadPrices(currentCategory);
        });
    });

    // Initial load
    loadPrices(currentCategory);
});