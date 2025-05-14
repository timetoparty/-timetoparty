// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Apply glass effect to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('glass-effect');
    }
    
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(function() {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });
    }
    
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');
            
            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }
    
    // Scroll to sections when clicking on nav links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Account for fixed header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Scroll reveal animations
    const revealElements = document.querySelectorAll('.section-header, .about-content, .timeline-item, .education-card, .skill-item, .contact-item');
    
    function checkReveal() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Add CSS for reveal animations
    const style = document.createElement('style');
    style.textContent = `
        .section-header, .about-content, .timeline-item, .education-card, .skill-item, .contact-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .toggle .line1 {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .toggle .line2 {
            opacity: 0;
        }
        
        .toggle .line3 {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    `;
    
    document.head.appendChild(style);
    
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('load', checkReveal);
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // The form is now handled by FormSubmit service
        // The form will be submitted to the email address specified in the action attribute
        // and the user will be redirected to the thank-you page
        
        // Add a loading state when the form is submitted
        contactForm.addEventListener('submit', function() {
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitButton.disabled = true;
            }
            
            // Log the submission attempt
            console.log('Form submission initiated. FormSubmit will handle the email delivery.');
        });
    }
    
    // Create and add data animation delay for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Create and add data animation delay for education cards
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Create and add data animation delay for skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollY = 0;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            header.style.height = '60px';
        } else {
            header.style.boxShadow = '0 5px 20px rgba(17, 24, 39, 0.05)';
            header.style.height = '70px';
        }
        
        lastScrollY = currentScrollY;
    });
});

// Preload animations
window.addEventListener('load', () => {
    // Add a class to body when page is loaded
    document.body.classList.add('loaded');
    
    // Animate skill bars after page load
    const skillBars = document.querySelectorAll('.skill-progress');
    
    setTimeout(() => {
        skillBars.forEach(bar => {
            bar.style.width = bar.parentElement.parentElement.dataset.progress || bar.style.width;
        });
    }, 1000);
});
