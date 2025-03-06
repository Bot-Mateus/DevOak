// Adicionando esta parte ao seu JavaScript existente
document.addEventListener('DOMContentLoaded', function() {
    // Corrigido o efeito glow-on-hover para garantir que termine corretamente
    const glowItems = document.querySelectorAll('.glow-on-hover');
    
    glowItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        // Resetar posição do efeito antes de iniciar a animação novamente
        const glowElement = this.querySelector('::before');
        if (glowElement) {
          glowElement.style.left = '-100%';
        }
        
        // Adiciona uma classe temporária para controlar a animação
        this.classList.add('animate-glow');
        
        // Remove a classe após a animação terminar
        setTimeout(() => {
          this.classList.remove('animate-glow');
        }, 1000); // Tempo um pouco maior que a duração da animação
      });
    });
    
    // Animação para os textos das descrições de categoria
    const categoryDescriptions = document.querySelectorAll('.category-description p');
    
    const descriptionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            // Adiciona uma classe para animar o texto
            entry.target.classList.add('terminal-typing');
          }, 300);
          descriptionObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    categoryDescriptions.forEach(desc => {
      descriptionObserver.observe(desc);
    });
    
    // Adicionando classe temporária para efeito de terminal
    categoryDescriptions.forEach(desc => {
      // Preparar o texto para animação
      const text = desc.textContent;
      desc.innerHTML = '';
      
      const typeWriter = function(text, i, callback) {
        if (i < text.length) {
          desc.innerHTML += text.charAt(i);
          setTimeout(function() {
            typeWriter(text, i + 1, callback);
          }, 20); // velocidade da digitação
        } else if (typeof callback === 'function') {
          callback();
        }
      };
      
      // Trigger da animação quando elemento for visível
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              typeWriter(text, 0, function() {
                // Adiciona cursor piscando ao final
                desc.innerHTML += '<span class="terminal-cursor">|</span>';
                
                // Anima o cursor
                const cursor = desc.querySelector('.terminal-cursor');
                if (cursor) {
                  setInterval(() => {
                    cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
                  }, 500);
                }
              });
            }, 500);
            observer.unobserve(desc);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(desc);
    });
    
    // Adicione este CSS para o cursor do terminal
    const style = document.createElement('style');
    style.textContent = `
      .terminal-cursor {
        display: inline-block;
        font-weight: bold;
        color: var(--skill-accent);
        animation: blink 1s infinite;
      }
      
      @keyframes blink {
        0%, 49% { opacity: 1; }
        50%, 100% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  });