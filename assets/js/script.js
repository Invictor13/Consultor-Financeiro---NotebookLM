document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica de Navegação Elegante (Tabs)
    const navButtons = document.querySelectorAll('.nav-btn, .nav-btn-cta');
    const navButtonsHeader = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');

            // Remove classe ativa de todos os botões de header e seções
            navButtonsHeader.forEach(btn => btn.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active'));

            // Adiciona classe ativa no botão do header correspondente
            const headerBtn = document.querySelector(`.nav-btn[data-target="${targetId}"]`);
            if(headerBtn) {
                headerBtn.classList.add('active');
            }

            // Exibe a seção correspondente
            document.getElementById(targetId).classList.add('active');

            // Rola para o topo suavemente
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 2. Lógica de Copiar URL (Clipboard API)
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const url = button.getAttribute('data-url');
            const icon = button.querySelector('i');

            try {
                await navigator.clipboard.writeText(url);
                
                // Feedback visual sutil (Troca o ícone)
                icon.classList.remove('fa-copy');
                icon.classList.add('fa-check');
                icon.style.color = 'var(--accent)'; // Cor dourada de sucesso

                setTimeout(() => {
                    icon.classList.remove('fa-check');
                    icon.classList.add('fa-copy');
                    icon.style.color = ''; // Reseta a cor
                }, 2000);
            } catch (err) {
                console.error('Falha ao copiar:', err);
            }
        });
    });

    // 3. Lógica do Accordion (Sanfonas)
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            // Toggle da classe active para mudar o ícone (+ / -)
            this.classList.toggle('active-acc');

            // Controla a abertura/fechamento do painel
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });
});

// 4. Animação de Canvas (Background: Neural Network / Moléculas de Cifrão)
const initCanvasAnimation = () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particlesArray = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initParticles();
    });

    class Particle {
        constructor(x, y, directionX, directionY, size) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.opacity = Math.random() * 0.5 + 0.1; // Opacidade inicial
            this.fadeDirection = Math.random() > 0.5 ? 1 : -1; // 1 para aparecer, -1 para sumir
            this.fadeSpeed = 0.005;
        }

        draw() {
            ctx.font = `${this.size}px Arial`;
            ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`; // Dourado
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('$', this.x, this.y);
        }

        update() {
            // Movimento
            if (this.x > width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            this.x += this.directionX;
            this.y += this.directionY;

            // Fade in / Fade out orgânico
            this.opacity += this.fadeSpeed * this.fadeDirection;
            if (this.opacity >= 0.8) {
                this.fadeDirection = -1; // Começa a sumir
            } else if (this.opacity <= 0.1) {
                this.fadeDirection = 1; // Começa a aparecer
                // Reposiciona levemente pra dar a impressão de nascer em outro lugar
                this.x = Math.random() * width;
                this.y = Math.random() * height;
            }

            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        // Quantidade de partículas baseada no tamanho da tela
        const numberOfParticles = (width * height) / 15000;
        for (let i = 0; i < numberOfParticles; i++) {
            const size = Math.random() * 15 + 10; // Tamanho entre 10 e 25
            const x = Math.random() * width;
            const y = Math.random() * height;
            const directionX = (Math.random() * 0.8) - 0.4;
            const directionY = (Math.random() * 0.8) - 0.4;
            particlesArray.push(new Particle(x, y, directionX, directionY, size));
        }
    }

    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    // Linhas conectando os cifrões, opacidade baseada na distância e opacidade das partículas
                    opacityValue = 1 - (distance / 150);
                    const avgOpacity = (particlesArray[a].opacity + particlesArray[b].opacity) / 2;
                    ctx.strokeStyle = `rgba(16, 185, 129, ${opacityValue * avgOpacity})`; // Verde vibrante
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    initParticles();
    animate();
};

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa a animação
    initCanvasAnimation();
});