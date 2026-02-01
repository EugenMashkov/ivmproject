// Проверка загрузки Vue.js
if (typeof Vue === 'undefined') {
    console.error('Vue.js не загружен. Проверьте подключение к интернету.');
    document.body.innerHTML = '<div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;"><h1>Ошибка загрузки</h1><p>Не удалось загрузить Vue.js. Проверьте подключение к интернету и обновите страницу.</p></div>';
} else {
    const { createApp } = Vue;

    createApp({
    data() {
        return {
            mobileMenuOpen: false,
            navbarShadow: 'none',
            isScrolled: false,
            isMobile: window.innerWidth <= 768,
            services: [
                {
                    icon: '',
                    image: 'dr6.png',
                    title: 'Mechanical Design',
                    description: ''
                },
                {
                    icon: '',
                    image: 'dr1.png',
                    title: 'Technical Documentation',
                    description: ''
                },
                {
                    icon: '',
                    image: 'dr8.png',
                    title: 'Project Management',
                    description: ''
                },
                {
                    icon: '',
                    image: '',
                    video: 'df4.mov',
                    title: 'Product Development',
                    description: ''
                }
            ],
            form: {
                name: '',
                email: '',
                message: ''
            }
        };
    },
    computed: {
        currentYear() {
            return new Date().getFullYear();
        }
    },
    mounted() {
        // Handle scroll effect on navbar
        window.addEventListener('scroll', this.handleScroll);
        
        // Handle window resize for mobile detection
        const updateMobile = () => {
            this.isMobile = window.innerWidth <= 768;
            // Сбрасываем состояние карусели на мобильных
            if (this.isMobile && this.isScrolled) {
                const grid = this.$refs.servicesGrid;
                if (grid) {
                    grid.classList.remove('scrollable');
                    grid.style.transform = '';
                    this.isScrolled = false;
                }
            }
        };
        window.addEventListener('resize', updateMobile);
        // Проверяем при загрузке
        updateMobile();
        
        // Animate service cards on scroll
        this.observeServiceCards();
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
        },
        scrollServices() {
            // На мобильных устройствах карусель не работает
            if (window.innerWidth <= 768) {
                return;
            }
            this.$nextTick(() => {
                const grid = this.$refs.servicesGrid;
                if (grid) {
                    grid.classList.add('scrollable');
                    // Ждем применения стилей grid с 4 колонками
                    setTimeout(() => {
                        const cards = grid.querySelectorAll('.service-card');
                        if (cards.length > 0) {
                            // Получаем реальную ширину первой карточки + gap
                            const firstCard = cards[0];
                            const cardRect = firstCard.getBoundingClientRect();
                            const gap = 32; // 2rem = 32px
                            const scrollAmount = cardRect.width + gap;
                            grid.style.transform = `translateX(-${scrollAmount}px)`;
                            grid.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                        }
                    }, 150);
                    this.isScrolled = true;
                }
            });
        },
        scrollServicesBack() {
            // На мобильных устройствах карусель не работает
            if (window.innerWidth <= 768) {
                return;
            }
            this.$nextTick(() => {
                const grid = this.$refs.servicesGrid;
                if (grid) {
                    grid.style.transform = 'translateX(0)';
                    setTimeout(() => {
                        grid.classList.remove('scrollable');
                        grid.style.transform = '';
                    }, 600);
                    this.isScrolled = false;
                }
            });
        },
        scrollToSection(sectionId) {
            this.mobileMenuOpen = false; // Close mobile menu when clicking a link
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        },
        handleScroll() {
            // Тень убрана, функция оставлена для совместимости
            this.navbarShadow = 'none';
        },
        handleSubmit() {
            // Form validation
            if (this.form.name && this.form.email && this.form.message) {
                alert(`Thank you, ${this.form.name}! Your message has been received. We'll get back to you soon.`);
                // Reset form
                this.form = {
                    name: '',
                    email: '',
                    message: ''
                };
            }
        },
        switchLanguage(lang) {
            if (lang === 'en') {
                window.location.href = 'index.html';
            } else if (lang === 'de') {
                window.location.href = 'index-de.html';
            }
        },
        observeServiceCards() {
            // Use nextTick to ensure DOM is fully rendered
            this.$nextTick(() => {
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }
                    });
                }, observerOptions);

                // Observe all service cards
                const cards = document.querySelectorAll('.service-card');
                cards.forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    observer.observe(card);
                });
            });
        }
    }
}).mount('#app');
}