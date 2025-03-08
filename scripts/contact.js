// Função para criar partículas
function createParticles() {
    const particlesContainer = document.getElementById('contactParticles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Posição aleatória
    const posX = Math.random() * 100;
    const posY = Math.random() * 100 + 100; // Começa abaixo da viewport
    
    // Tamanho aleatório
    const size = Math.random() * 5 + 1;
    
    // Duração da animação aleatória
    const duration = Math.random() * 15 + 10;
    
    // Definir propriedades
    particle.style.left = `${posX}%`;
    particle.style.bottom = `${-posY}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.animationDuration = `${duration}s`;
    
    // Adicionar partícula ao container
    container.appendChild(particle);
    
    // Remover partícula após a animação
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, duration * 1000);
}

// Iniciar partículas quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
});

// Efeito de hover nos links sociais
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Animação de envio do formulário
const contactForm = document.querySelector('.contact-form');
const submitButton = document.querySelector('.contact-btn');

if (contactForm && submitButton) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        submitButton.textContent = 'Enviando...';
        
        // Simulação de envio de formulário
        setTimeout(() => {
            submitButton.textContent = 'Mensagem Enviada!';
            submitButton.style.backgroundColor = 'var(--contact-accent)';
            submitButton.style.color = '#000';
            
            // Resetar formulário
            contactForm.reset();
            
            // Retornar ao estado original após 3 segundos
            setTimeout(() => {
                submitButton.textContent = 'Enviar mensagem';
                submitButton.style.backgroundColor = 'transparent';
                submitButton.style.color = 'var(--contact-accent)';
            }, 3000);
        }, 1500);
    });
}