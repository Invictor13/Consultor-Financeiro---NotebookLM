document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica de Navegação Elegante (Tabs)
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove classe ativa de todos os botões e seções
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active'));

            // Adiciona classe ativa no botão clicado
            button.classList.add('active');

            // Exibe a seção correspondente
            const targetId = button.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
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
                icon.style.color = '#10b981'; // Cor verde de sucesso

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
});