document.addEventListener('DOMContentLoaded', () => {
    const linksContainer = document.getElementById('links-container');

    async function loadLinks() {
        try {
            const response = await fetch('/api/links');
            if (!response.ok) throw new Error('Falha ao carregar links');
            const data = await response.json();

            linksContainer.innerHTML = '';

            data.links.forEach((link, index) => {
                const linkButton = document.createElement('a');
                linkButton.href = link.url;
                linkButton.textContent = link.title;
                linkButton.target = '_blank';
                linkButton.classList.add('link-button');
                linkButton.style.animationDelay = `${index * 0.1}s`;
                linksContainer.appendChild(linkButton);
            });

        } catch (error) {
            console.error('Erro ao carregar os links:', error);
            linksContainer.innerHTML = '<p style="color: #ff8a80;">Não foi possível carregar os links. Tente adicionar um no painel de administração.</p>';
        }
    }

    loadLinks();
});