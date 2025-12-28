const { createApp } = Vue;

createApp({
    data() {
        return {
            mobileMenuOpen: false,
            navbarShadow: 'none',
            services: [
                {
                    icon: '🎨',
                    title: 'Web Design',
                    description: 'Beautiful, responsive designs that work on all devices'
                },
                {
                    icon: '⚡',
                    title: 'Performance',
                    description: 'Fast-loading websites optimized for speed'
                },
                {
                    icon: '📱',
                    title: 'Mobile First',
                    description: 'Responsive designs that look great on any screen'
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
