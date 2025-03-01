// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    // Toggle menu on button click
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
    
    // Close menu when clicking on a nav link
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnMenuBtn && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
});

// Particles Background
const particles = document.getElementById('particles');
const colors = ['#20c997', '#4285f4', '#34a853'];

function createParticles() {
    particles.innerHTML = '';
    const particlesCount = window.innerWidth < 768 ? 50 : 100;
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 6 + 2;
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Apply styles
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        
        particles.appendChild(particle);
        
        // Animation
        setTimeout(() => {
            const moveX = (Math.random() - 0.5) * 20;
            const moveY = (Math.random() - 0.5) * 20;
            particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
            particle.style.opacity = '0';
            particle.style.transition = `transform ${Math.random() * 5 + 5}s ease, opacity ${Math.random() * 5 + 5}s ease`;
        }, 100);
    }
    
    // Recreate particles after some time
    setTimeout(createParticles, 8000);
}

// Initialize
window.addEventListener('load', () => {
    createParticles();
});

// Recreate on resize
window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        document.querySelectorAll('.timeline-item').forEach(item => {
            item.classList.remove('timeline-left', 'timeline-right');
        });
    }
});

// Detectar scroll para mudar o estilo do header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


