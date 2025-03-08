function createPS2PillarsEffect() {
    const heroParticles = document.getElementById('particles');
    if (!heroParticles) return;
    
    // Número reduzido de pilares para um efeito mais sutil
    const pillarsCount = window.innerWidth < 768 ? 15 : 25;
    
    // Cores inspiradas na estética PS2 - tons de azul mais escuros e sutis
    const colors = ['#20c997', '#1a6ab8', '#072a57', '#20c997'];
    
    for (let i = 0; i < pillarsCount; i++) {
        const pillar = document.createElement('div');
        pillar.classList.add('particle', 'ps2-pillar');
        
        // Distribuição horizontal uniforme com pequeno fator aleatório
        const xPos = (i / pillarsCount * 100) + (Math.random() * 10 - 5);
        
        // Altura do pilar (maior que largura)
        const width = Math.random() * 2 + 1;
        const height = Math.random() * 20 + 40;
        
        // Velocidade mais lenta para efeito mais suave
        const speed = Math.random() * 1.5 + 0.5;
        
        pillar.style.cssText = `
            left: ${xPos}%;
            bottom: -${height}px;
            width: ${width}px;
            height: ${height}px;
            background-color: ${colors[Math.floor(Math.random() * colors.length)]};
            opacity: 0.4;
            box-shadow: 0 0 ${width * 2}px ${colors[Math.floor(Math.random() * colors.length)]};
        `;
        
        heroParticles.appendChild(pillar);
        
        // Anima o pilar subindo e descendo
        animatePillar(pillar, height, speed);
    }
}

function animatePillar(pillar, height, speed) {
    // Determine uma altura máxima aleatória (entre 20% e 70% da altura do container)
    const maxHeight = 20 + Math.random() * 50;
    
    const keyframes = [
        { 
            transform: 'translateY(0)', 
            opacity: 0,
            offset: 0
        },
        { 
            transform: `translateY(-${maxHeight}vh)`, 
            opacity: 0.6,
            offset: 0.5
        },
        { 
            transform: `translateY(-${maxHeight * 0.7}vh)`, 
            opacity: 0.3,
            offset: 0.7
        },
        { 
            transform: 'translateY(0)', 
            opacity: 0,
            offset: 1
        }
    ];
    
    // Duração mais longa para movimento mais lento
    const duration = (7 / speed) * 1000;
    
    pillar.animate(keyframes, {
        duration: duration,
        iterations: 1,
        easing: 'ease-in-out',
        delay: Math.random() * 3000 // Delay maior para criar efeito mais variado
    }).onfinish = function() {
        pillar.remove();
    };
}

function startPS2Background() {
    // Inicializa com alguns pilares
    createPS2PillarsEffect();
    
    // Adiciona novos pilares periodicamente, mas com intervalo maior
    setInterval(createPS2PillarsEffect, 1500); // Intervalo maior para menos sobrecarga
}

document.addEventListener('DOMContentLoaded', function() {
    // Iniciar o efeito dos pilares
    startPS2Background();
    
    // Adicionar grid de fundo para efeito tecnológico
    createTechGrid();
});

function createTechGrid() {
    const heroSection = document.querySelector('.hero');
    const techGrid = document.createElement('div');
    techGrid.classList.add('tech-grid');
    heroSection.appendChild(techGrid);
}