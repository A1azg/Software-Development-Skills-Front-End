// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Image Slider Functionality
class ImageSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        this.init();
    }
    
    init() {
        this.showSlide(this.currentSlide);
        this.startAutoSlide();
        
        // Event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Pause auto-slide on hover
        const slider = document.querySelector('.slider');
        slider.addEventListener('mouseenter', () => this.stopAutoSlide());
        slider.addEventListener('mouseleave', () => this.startAutoSlide());
    }
    
    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(this.currentSlide);
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(this.currentSlide);
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.showSlide(this.currentSlide);
    }
    
    startAutoSlide() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoSlide() {
        clearInterval(this.slideInterval);
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ImageSlider();
});

// Parallax Effect
class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('.parallax-element');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            this.updateParallax();
        });
    }
    
    updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        this.elements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Initialize parallax effect
document.addEventListener('DOMContentLoaded', () => {
    new ParallaxEffect();
});

// Form Validation and Submission
class FormHandler {
    constructor() {
        this.form = document.querySelector('.contact-form form');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            this.addInputValidation();
        }
    }
    
    addInputValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateInput(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }
    
    validateInput(input) {
        const value = input.value.trim();
        const type = input.type;
        const required = input.hasAttribute('required');
        
        if (required && !value) {
            this.showError(input, 'This field is required');
            return false;
        }
        
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showError(input, 'Please enter a valid email address');
                return false;
            }
        }
        
        this.clearError(input);
        return true;
    }
    
    showError(input, message) {
        this.clearError(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        
        input.parentNode.appendChild(errorDiv);
        input.style.borderColor = '#ef4444';
    }
    
    clearError(input) {
        const errorMessage = input.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        input.style.borderColor = '#e2e8f0';
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateInput(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            this.submitForm();
        }
    }
    
    submitForm() {
        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            this.showSuccessMessage();
            this.form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
    
    showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div style="background: #10b981; color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                Thank you! Your message has been sent successfully.
            </div>
        `;
        
        this.form.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
}

// Initialize form handler
document.addEventListener('DOMContentLoaded', () => {
    new FormHandler();
});

// Intersection Observer for Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }
    
    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, this.observerOptions);
        
        this.observeElements();
    }
    
    observeElements() {
        const elements = document.querySelectorAll('.feature-card, .about-text, .about-image, .contact-form, .contact-info');
        elements.forEach(element => {
            this.observer.observe(element);
        });
    }
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .feature-card,
    .about-text,
    .about-image,
    .contact-form,
    .contact-info {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .error-message {
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Counter Animation for Stats
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat h3');
        this.init();
    }
    
    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.counters.forEach(counter => {
            this.observer.observe(counter);
        });
    }
    
    animateCounter(element) {
        const originalText = element.textContent.trim();

        // Skip counters like "24/7" — do not animate
        if (originalText.includes('/')) {
            element.textContent = originalText;
            return;
        }

        let targetValue = 0;
        let formatter = (v) => String(Math.floor(v));

        // Handle "10K+" format
        if (originalText.toUpperCase().includes('K+')) {
            const num = parseFloat(originalText); // e.g., "10K+" -> 10
            targetValue = isNaN(num) ? 0 : num * 1000;
            formatter = (v) => Math.floor(v / 1000) + 'K+';
        }
        // Handle percentages, including decimals like "99.9%"
        else if (originalText.includes('%')) {
            const numStr = originalText.replace('%', '').trim();
            const decimals = (numStr.split('.')[1] || '').length;
            const num = parseFloat(numStr);
            targetValue = isNaN(num) ? 0 : num;
            formatter = (v) => {
                const value = v >= targetValue ? targetValue : v;
                return (decimals > 0 ? value.toFixed(decimals) : Math.floor(value)) + '%';
            };
        } else {
            // Plain integer fallback
            const num = parseInt(originalText.replace(/[^\d]/g, ''), 10);
            targetValue = isNaN(num) ? 0 : num;
            formatter = (v) => String(Math.floor(v));
        }

        const duration = 2000;
        const frames = Math.max(1, Math.floor(duration / 16));
        const increment = targetValue / frames;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= targetValue) {
                current = targetValue;
                clearInterval(timer);
            }
            element.textContent = formatter(current);
        }, 16);
    }
}

// Initialize counter animation
document.addEventListener('DOMContentLoaded', () => {
    new CounterAnimation();
});

// Floating Cards Animation Enhancement
class FloatingCards {
    constructor() {
        this.cards = document.querySelectorAll('.floating-card');
        this.init();
    }
    
    init() {
        this.cards.forEach((card, index) => {
            // Add random movement
            setInterval(() => {
                const randomX = (Math.random() - 0.5) * 20;
                const randomY = (Math.random() - 0.5) * 20;
                card.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }, 3000 + index * 1000);
        });
    }
}

// Initialize floating cards
document.addEventListener('DOMContentLoaded', () => {
    new FloatingCards();
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can be added here
}, 16));
