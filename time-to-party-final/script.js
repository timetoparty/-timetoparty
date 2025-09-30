// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class to body for fade-in animation
    document.body.classList.add('loaded');
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call
    
    // Header Background on Scroll
    const header = document.querySelector('.header');
    
    function updateHeaderBackground() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', updateHeaderBackground);
    
    // Tabs Functionality for Extras Section
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Form Submission Handler
    const contactForm = document.querySelector('.form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Simple validation
            const requiredFields = ['name', 'email'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                if (!formObject[field] || formObject[field].trim() === '') {
                    input.style.borderColor = '#e74c3c';
                    isValid = false;
                } else {
                    input.style.borderColor = 'var(--border-color)';
                }
            });
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailInput = this.querySelector('[name="email"]');
            if (formObject.email && !emailRegex.test(formObject.email)) {
                emailInput.style.borderColor = '#e74c3c';
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                const submitButton = this.querySelector('.form-button');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Mensagem Enviada!';
                submitButton.style.background = '#27ae60';
                submitButton.disabled = true;
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    this.reset();
                    submitButton.textContent = originalText;
                    submitButton.style.background = 'var(--gradient-accent)';
                    submitButton.disabled = false;
                }, 3000);
                
                // In a real application, you would send the data to a server here
                console.log('Form submitted:', formObject);
            } else {
                // Show error message
                const submitButton = this.querySelector('.form-button');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Por favor, preencha todos os campos obrigatórios';
                submitButton.style.background = '#e74c3c';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.background = 'var(--gradient-accent)';
                }, 3000);
            }
        });
    }
    
    // Intersection Observer for Animations
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .extra-item, .gallery-item, .stat-item, .included-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Counter Animation for Stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = element.textContent;
        const isNumber = /^\d+/.test(target);
        
        if (isNumber) {
            const finalNumber = parseInt(target);
            let current = 0;
            const increment = finalNumber / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= finalNumber) {
                    element.textContent = target; // Restore original text (e.g., "100+")
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + (target.includes('+') ? '+' : '');
                }
            }, 30);
        }
    }
    
    // Observe stat numbers for counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Gallery Image Loading
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Add loading placeholder
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
    
    // Floating Elements Animation Enhancement
    const floatingElements = document.querySelectorAll('.element');
    
    floatingElements.forEach((element, index) => {
        // Add random movement variation
        const randomDelay = Math.random() * 2;
        const randomDuration = 6 + Math.random() * 4;
        
        element.style.animationDelay = `${randomDelay}s`;
        element.style.animationDuration = `${randomDuration}s`;
    });
    
    // Parallax Effect for Hero Section
    const heroPattern = document.querySelector('.hero-pattern');
    
    if (heroPattern) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroPattern.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Contact Method Click Handlers
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        const link = method.querySelector('a');
        if (link) {
            method.addEventListener('click', function(e) {
                if (e.target === this || e.target.closest('.contact-icon') || e.target.closest('.contact-details')) {
                    link.click();
                }
            });
            
            method.style.cursor = 'pointer';
        }
    });
    
    // Service Card Click Enhancement
    const serviceButtons = document.querySelectorAll('.service-button');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Focus on the event type field and pre-select based on service
                setTimeout(() => {
                    const eventTypeSelect = document.querySelector('#event-type');
                    const messageTextarea = document.querySelector('#message');
                    
                    if (eventTypeSelect) {
                        eventTypeSelect.focus();
                    }
                    
                    if (messageTextarea) {
                        const serviceCard = this.closest('.service-card');
                        const serviceName = serviceCard.querySelector('h3').textContent;
                        messageTextarea.value = `Gostaria de saber mais sobre o serviço: ${serviceName}`;
                    }
                }, 1000);
            }
        });
    });
    
    // Keyboard Navigation Support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
    
    // Performance: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debouncing to scroll handlers
    const debouncedHeaderUpdate = debounce(updateHeaderBackground, 10);
    const debouncedNavUpdate = debounce(updateActiveNavLink, 10);
    
    window.removeEventListener('scroll', updateHeaderBackground);
    window.removeEventListener('scroll', updateActiveNavLink);
    
    window.addEventListener('scroll', debouncedHeaderUpdate);
    window.addEventListener('scroll', debouncedNavUpdate);
    
    console.log('Time to Party website loaded successfully! 🎉');
});

// Service Worker Registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment the following lines if you want to add a service worker
        /*
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
        */
    });
}
