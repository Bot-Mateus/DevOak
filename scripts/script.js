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

  // Skills Animation - Melhorado
  const progressBars = document.querySelectorAll('.progress-bar');
  
  // Inicializa as barras de progresso com a largura original
  progressBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = width;
    bar.style.transform = 'scaleX(0)';
  });
  
  // Observer para animar as barras de progresso quando visíveis
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        
        // Corrigido: Busca o container dentro da própria categoria
        const skillsContainer = entry.target.querySelector('.skills-container') || 
                              entry.target.closest('.skill-category')?.querySelector('.skills-container');
        
        if (!skillsContainer) return;
        
        skillItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
          }, index * 150);
        });
      }
    });
  }, { threshold: 0.2 });
  
  // Observa as categorias de skills
  document.querySelectorAll('.skill-category').forEach(category => {
    observer.observe(category);
    
    // Prepara as skills para animação
    const items = category.querySelectorAll('.skill-item');
    items.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
      item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(item);
    });
  });
  
  // Tooltip melhorado
  skillItems.forEach(item => {
    let hoverTimeout;
    
    item.addEventListener('mouseenter', function(e) {
      clearTimeout(hoverTimeout);
      // Fecha todos os tooltips
      skillItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      // Abre o tooltip atual
      hoverTimeout = setTimeout(() => {
        this.classList.add('active');
      }, 200);
    });
  
    item.addEventListener('mouseleave', function() {
      clearTimeout(hoverTimeout);
      this.classList.remove('active');
    });

    
    // Remove animação quando o tooltip é fechado
    item.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.skill-icon');
      if (icon) icon.style.animation = '';
    });
    
    // Efeito hover para dispositivos com mouse
    if (window.matchMedia('(hover: hover)').matches) {
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
      });
      
      item.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
          this.style.transform = '';
        }
      });
    }
  });
  
  // Animação das categorias de habilidades quando visíveis
  const skillCategories = document.querySelectorAll('.skill-category');
  
  const categoryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  skillCategories.forEach((category, index) => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(30px)';
    category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    category.style.transitionDelay = `${index * 0.15}s`;
    categoryObserver.observe(category);
  });
  
  // Efeito de digitação para os títulos das categorias
  const categoryTitles = document.querySelectorAll('.category-header h3');
  
  function typeEffect(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--skill-accent)';
    
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
        element.style.borderRight = 'none';
      }
    }, 50);
  }
  
  const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          typeEffect(entry.target);
        }, 300);
        titleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  categoryTitles.forEach(title => {
    titleObserver.observe(title);
  });
  
  // Adiciona partículas específicas na seção de skills
  function createSkillParticles() {
    const skillsSection = document.querySelector('.skills');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'skill-particles';
    particlesContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
      z-index: 1;
    `;
    
    skillsSection.appendChild(particlesContainer);
    
    const particleCount = window.innerWidth < 768 ? 20 : 40;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 5 + 2;
      
      particle.style.cssText = `
        position: absolute;
        background: var(--skill-accent);
        border-radius: 50%;
        opacity: ${Math.random() * 0.5 + 0.1};
        width: ${size}px;
        height: ${size}px;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        filter: blur(${Math.random() < 0.5 ? 1 : 0}px);
        pointer-events: none;
        transform: translate3d(0, 0, 0);
        box-shadow: 0 0 ${size * 2}px var(--skill-accent);
      `;
      
      particlesContainer.appendChild(particle);
      
      // Animação das partículas
      animateParticle(particle);
    }
  }
  
  function animateParticle(particle) {
    const duration = Math.random() * 10 + 10;
    const startY = parseFloat(particle.style.top);
    const startX = parseFloat(particle.style.left);
    
    const keyframes = [
      { 
        transform: `translate3d(0, 0, 0)`,
        opacity: particle.style.opacity
      },
      { 
        transform: `translate3d(${(Math.random() - 0.5) * 50}px, ${-Math.random() * 100}px, 0)`,
        opacity: 0
      }
    ];
    
    const animation = particle.animate(keyframes, {
      duration: duration * 1000,
      easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      fill: 'forwards'
    });
    
    animation.onfinish = () => {
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.opacity = `${Math.random() * 0.5 + 0.1}`;
      animateParticle(particle);
    };
  }
  
  // Inicia as partículas da seção de skills
  createSkillParticles();
  
  // Adiciona classe ao corpo para as animações personalizadas
  document.body.classList.add('has-animations');


  
});

// Observer para animar as categorias de habilidades
const skillCategories = document.querySelectorAll('.skill-category');
  
const categoryObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      
      // Ativa os itens de habilidade com um pequeno atraso sequencial
      const items = entry.target.querySelectorAll('.skill-item');
      items.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        }, index * 150);
      });
    }
  });
}, { threshold: 0.2 });
  
// Configura os elementos para animação e começa a observá-los
skillCategories.forEach((category, index) => {
  category.style.opacity = '0';
  category.style.transform = 'translateY(30px)';
  category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  category.style.transitionDelay = `${index * 0.15}s`;
  
  // Prepara os itens para animação
  const items = category.querySelectorAll('.skill-item');
  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  categoryObserver.observe(category);
});
  
// Melhora o comportamento do hover em dispositivos móveis
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
  item.addEventListener('touchstart', function() {
    // Remove a classe active de todos os outros itens
    skillItems.forEach(i => {
      if (i !== item) i.classList.remove('active');
    });
    
    // Adiciona ou remove a classe active no item atual
    this.classList.toggle('active');
  });
});