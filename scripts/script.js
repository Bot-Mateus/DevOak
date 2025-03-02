document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  
  mobileMenuBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
  });
  
  // Fecha menu ao clicar nos links
  navLinks.querySelectorAll('a').forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    });
  });
  
  // Fecha menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      navLinks.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    }
  });
  
  // Timeline Animation
  setTimeout(() => {
    document.querySelector('.timeline-container').classList.add('animate');
  }, 300);
  
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= window.innerHeight * 0.85;
  }
  
  function animateVisibleItems() {
    timelineItems.forEach(item => {
      if (isElementInViewport(item) && !item.classList.contains('show')) {
        item.classList.add('show');
      }
    });
  }
  
  setTimeout(animateVisibleItems, 500);
  window.addEventListener('scroll', animateVisibleItems);
  
  // Skill Tooltips - Código corrigido
  const skillItems = document.querySelectorAll('.skill-item');
  
  skillItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.stopPropagation();
      const wasActive = this.classList.contains('active');
      
      // Fecha todos os tooltips
      skillItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Abre apenas se não estava ativo antes
      if (!wasActive) {
        this.classList.add('active');
      }
    });
  });
  
  // Fecha tooltips ao clicar fora
  document.addEventListener('click', () => {
    skillItems.forEach(item => {
      item.classList.remove('active');
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
      
      particle.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background-color: ${colors[Math.floor(Math.random() * colors.length)]};
            `;
      
      particles.appendChild(particle);
      
      setTimeout(() => {
        particle.style.cssText += `
                    transform: translate(${(Math.random() - 0.5) * 20}px, ${(Math.random() - 0.5) * 20}px);
                    opacity: 0;
                    transition: transform ${Math.random() * 5 + 5}s ease, opacity ${Math.random() * 5 + 5}s ease;
                `;
      }, 100);
    }
    
    setTimeout(createParticles, 8000);
  }
  
  // Header Scroll Effect
  window.addEventListener('scroll', () => {
    document.querySelector('header').classList.toggle('scrolled', window.scrollY > 50);
  });
  
  // Inicializações
  createParticles();
  animateVisibleItems();
});