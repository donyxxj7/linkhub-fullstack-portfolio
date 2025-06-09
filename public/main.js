// public/main.js

document.addEventListener('DOMContentLoaded', () => {
    const linksContainer = document.getElementById('links-container');

    async function loadLinks() {
        try {
            // Pede ao nosso back-end a lista de links
            const response = await fetch('/api/links');
            const data = await response.json();

            // Limpa qualquer conteúdo existente
            linksContainer.innerHTML = '';

            // Cria um botão para cada link recebido
            data.links.forEach(link => {
                const linkButton = document.createElement('a');
                linkButton.href = link.url;
                linkButton.textContent = link.title;
                linkButton.target = '_blank'; // Abre o link em uma nova aba
                linkButton.classList.add('link-button');
                
                linksContainer.appendChild(linkButton);
            });

        } catch (error) {
            console.error('Erro ao carregar os links:', error);
            linksContainer.innerHTML = '<p>Não foi possível carregar os links.</p>';
        }
    }

    // Chama a função para carregar os links assim que a página abre
    loadLinks();
});