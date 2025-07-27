// Initialize all functions
document.addEventListener(\'DOMContentLoaded\', function() {
    initMobileMenu();
    initSmoothScrolling();
    initStudentCounter();
    initScrollAnimations();
    initParticleEffects();
    initTypingEffect();
    initInteractiveCards();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animated Student Counter
function initStudentCounter() {
    const counter = document.getElementById('students-counter');
    if (!counter) return;
    
    const targetNumber = 1250; // Target number of students
    const duration = 3000; // Animation duration in milliseconds
    const increment = targetNumber / (duration / 16); // 60 FPS
    let currentNumber = 0;
    
    const updateCounter = () => {
        currentNumber += increment;
        if (currentNumber >= targetNumber) {
            counter.textContent = targetNumber.toLocaleString();
            return;
        }
        counter.textContent = Math.floor(currentNumber).toLocaleString();
        requestAnimationFrame(updateCounter);
    };
    
    // Start counter when element is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(counter);
}

// Scroll Animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.module-card, .feature-card, .step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Dynamic Particle Effects
function initParticleEffects() {
    const particleContainer = document.querySelector('.neon-particles');
    if (!particleContainer) return;
    
    // Create additional floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${getRandomNeonColor()};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
            box-shadow: 0 0 10px currentColor;
        `;
        particleContainer.appendChild(particle);
    }
}

// Typing Effect for Hero Title
function initTypingEffect() {
    const titleElement = document.querySelector('.hero-title .neon-text');
    if (!titleElement) return;
    
    const originalText = titleElement.textContent;
    titleElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            titleElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Floating Elements Animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-card, .module-card, .feature-card');
    
    floatingElements.forEach((element, index) => {
        const delay = index * 0.2;
        const duration = 3 + Math.random() * 2;
        const amplitude = 10 + Math.random() * 10;
        
        element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        element.style.setProperty('--float-amplitude', `${amplitude}px`);
    });
}

// Interactive Cards with 3D Effect
function initInteractiveCards() {
    const cards = document.querySelectorAll('.module-card, .feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg) rotateY(5deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
}

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.header');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background, .neon-particles');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Dynamic Color lity Functions
function getRandomNeonColor() {
    const colors = ['#00ffff', '#ff00ff', '#00ff00', '#ffff00', '#ff0080'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Loading Animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loading animation styles
    const style = document.createElement('style');
    style.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body:not(.loaded)::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        body:not(.loaded)::after {
            content: 'جاري التحميل...';
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #00ffff;
            font-size: 2rem;
            font-weight: 700;
            z-index: 10000;
            text-shadow: 0 0 20px #00ffff;
            animation: loadingPulse 1.5s ease-in-out infinite;
        }
        
        @keyframes loadingPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// WhatsApp Button Animation
function initWhatsAppAnimation() {
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (!whatsappBtn) return;
    
    // Add click ripple effect
    whatsappBtn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize WhatsApp animation
initWhatsAppAnimation();

// Intersection Observer for Advanced Animations
function initAdvancedAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.section-title, .hero-stats, .pricing-card').forEach(el => {
        observer.observe(el);
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .section-title {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .section-title.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hero-stats {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease 0.3s;
        }
        
        .hero-stats.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .pricing-card {
            opacity: 0;
            transform: scale(0.9);
            transition: all 0.8s ease;
        }
        
        .pricing-card.animate-in {
            opacity: 1;
            transform: scale(1);
        }
    `;
    document.head.appendChild(style);
}

// Initialize advanced animations
initAdvancedAnimations();

// Performance Optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        if (img.src) {
            img.dataset.src = img.src;
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InRyYW5zcGFyZW50Ii8+PC9zdmc+';
            imageObserver.observe(img);
        }
    });
}

// Initialize performance optimizations
optimizePerformance();

