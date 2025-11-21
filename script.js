// Set dynamic copyright year
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Navigation scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
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
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .education-card, .timeline-item, .stat-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact form handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate form
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Create mailto link with formatted message
            const emailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
            const mailtoLink = `mailto:v.sanjay2000@gmail.com?subject=${encodeURIComponent(subject)}&body=${emailBody}`;
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Opening Email...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';
            
            // Open email client
            try {
                window.location.href = mailtoLink;
                
                // Show success message
                setTimeout(() => {
                    submitButton.textContent = '✓ Message Sent!';
                    submitButton.style.background = '#10b981';
                    submitButton.style.opacity = '1';
                    showFormMessage('Email client opened successfully!', 'success');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button after 4 seconds
                    setTimeout(() => {
                        submitButton.textContent = originalText;
                        submitButton.style.background = '';
                        submitButton.disabled = false;
                        submitButton.style.opacity = '1';
                    }, 4000);
                }, 500);
            } catch (error) {
                showFormMessage('Unable to open email client. Please email directly at v.sanjay2000@gmail.com', 'error');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            }
        });
    }
});

// Helper function to show form messages
function showFormMessage(message, type) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 8px;
        font-size: 0.9rem;
        animation: slideDown 0.3s ease;
        ${type === 'success' 
            ? 'background: #d1fae5; color: #065f46; border: 1px solid #10b981;' 
            : 'background: #fee2e2; color: #991b1b; border: 1px solid #ef4444;'}
    `;
    
    // Add animation
    const style = document.createElement('style');
    if (!document.getElementById('form-message-style')) {
        style.id = 'form-message-style';
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Insert message after form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.appendChild(messageDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.style.animation = 'slideDown 0.3s ease reverse';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }
}

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Add scroll reveal animations
const revealElements = document.querySelectorAll('.about-text, .contact-info, .contact-form');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.2
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Add CSS for reveal animation
const style = document.createElement('style');
style.textContent = `
    .about-text, .contact-info, .contact-form {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .about-text.revealed, .contact-info.revealed, .contact-form.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Skill tags hover effect
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Project cards tilt effect on hover
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

console.log('Portfolio website loaded successfully! 🚀');

