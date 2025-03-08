document.addEventListener('DOMContentLoaded', function() {
    // Adiciona código binário randomico aos itens da timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        // Configurar atributos de dados binários personalizados
        const binaryCodes = ["01000101", "01000100", "01010111", "01001111", "01010010", "01001011"];
        item.setAttribute('data-binary', binaryCodes[index % binaryCodes.length]);
        
        // Para a animação de entrada
        setTimeout(() => {
            item.classList.add('animate');
        }, 300 * (index + 1));
    });
    
    // Observer para animar os itens quando entrarem na viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Uma vez animado, pare de observar
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    // Observa cada item da timeline
    timelineItems.forEach(item => {
        observer.observe(item);
    });
    
    // Efeito de particulas na linha da timeline
    const timelineLine = document.querySelector('.timeline-line');
    if (timelineLine) {
        // Adiciona partículas à linha da timeline
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.classList.add('timeline-particle');
            
            // Estilo randômico para cada partícula
            const size = Math.random() * 4 + 2;
            const speed = Math.random() * 3 + 2;
            const delay = Math.random() * 5;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = '50%';
            particle.style.animationDuration = `${speed}s`;
            particle.style.animationDelay = `${delay}s`;
            
            timelineLine.appendChild(particle);
        }
    }
    
    // Adiciona CSS para as partículas da timeline
    const style = document.createElement('style');
    style.textContent = `
        .timeline-particle {
            position: absolute;
            background-color: var(--timeline-accent);
            border-radius: 50%;
            transform: translateX(-50%);
            opacity: 0;
            z-index: 2;
            animation: particleFlow ease-in-out infinite;
        }
        
        @keyframes particleFlow {
            0% {
                opacity: 0;
                transform: translate(-50%, 0);
            }
            50% {
                opacity: 0.7;
            }
            100% {
                opacity: 0;
                transform: translate(-50%, 100%);
            }
        }
        
        .timeline-content {
            position: relative;
            overflow: hidden;
        }
        
        .timeline-content::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            height: 2px;
            width: 0;
            background: var(--timeline-accent);
            transition: width 0.8s ease;
        }
        
        .timeline-item:hover .timeline-content::before {
            width: 100%;
        }
        
        .timeline-item.animate {
            animation: fadeInUp 0.8s forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Efeito de hover com scanline
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Cria um efeito de scanline
            const scanline = document.createElement('div');
            scanline.classList.add('timeline-scanline');
            const content = item.querySelector('.timeline-content');
            
            if (content && !content.querySelector('.timeline-scanline')) {
                content.appendChild(scanline);
                
                // Remove o scanline após a animação
                setTimeout(() => {
                    if (scanline.parentNode) {
                        scanline.parentNode.removeChild(scanline);
                    }
                }, 1500);
            }
        });
    });
    
    // Adiciona mais CSS para efeitos
    const additionalStyle = document.createElement('style');
    additionalStyle.textContent = `
        .timeline-scanline {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, transparent, var(--timeline-accent), transparent);
            z-index: 10;
            animation: scanEffect 1.5s linear;
        }
        
        @keyframes scanEffect {
            0% { top: 0; }
            100% { top: 100%; }
        }
        
        .timeline-container.animate {
            opacity: 1;
        }
    `;
    document.head.appendChild(additionalStyle);
    
    // Adiciona animação ao container da timeline (originalmente em script.js)
    setTimeout(() => {
        const container = document.querySelector('.timeline-container');
        if (container) {
            container.classList.add('animate');
        }
    }, 300);
});