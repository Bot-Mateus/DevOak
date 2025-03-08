// Adicione este código ao seu arquivo script.js ou crie um novo arquivo chamado projects.js

document.addEventListener('DOMContentLoaded', function() {
    // Animação para dots flutuantes
    const projectsSection = document.querySelector('.projects');
    
    if (projectsSection) {
        const dotElements = projectsSection.querySelectorAll('.dot');
        
        // Posicionamento aleatório inicial para os dots
        dotElements.forEach(dot => {
            const randomX = Math.floor(Math.random() * 100);
            const randomY = Math.floor(Math.random() * 100);
            const randomSize = Math.floor(Math.random() * 3) + 2;
            const randomDuration = Math.floor(Math.random() * 10) + 15;
            
            dot.style.left = `${randomX}%`;
            dot.style.top = `${randomY}%`;
            dot.style.width = `${randomSize}px`;
            dot.style.height = `${randomSize}px`;
            dot.style.animationDuration = `${randomDuration}s`;
        });
    }
    
    // Efeito paralaxe suave ao rolar a página
    window.addEventListener('scroll', function() {
        const laptopDisplay = document.querySelector('.laptop-display');
        const projectIntro = document.querySelector('.project-intro');
        
        if (laptopDisplay && projectIntro) {
            const scrollPosition = window.scrollY;
            const viewportHeight = window.innerHeight;
            const projectsPosition = projectsSection.offsetTop;
            
            // Verifica se a seção está visível
            if (scrollPosition + viewportHeight > projectsPosition && 
                scrollPosition < projectsPosition + projectsSection.offsetHeight) {
                
                const scrollRatio = (scrollPosition - projectsPosition + viewportHeight) / viewportHeight;
                
                // Aplica efeito de paralaxe suave
                laptopDisplay.style.transform = `translateY(${scrollRatio * 20}px)`;
                projectIntro.style.transform = `translateY(${scrollRatio * -20}px)`;
            }
        }
    });
    
    // Adiciona hover effect aos cards de projeto
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            projectCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.style.opacity = '0.7';
                    otherCard.style.transform = 'scale(0.98)';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            projectCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
                otherCard.style.transform = '';
            });
        });
    });
});