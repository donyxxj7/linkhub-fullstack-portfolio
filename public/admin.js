// public/admin.js

document.addEventListener('DOMContentLoaded', () => {
    // Proteção da página: se não estiver logado, redireciona para o login.
    if (sessionStorage.getItem('isAuthenticated') !== 'true') {
        window.location.href = '/login.html';
        return; // Impede que o resto do script seja executado
    }

    const form = document.getElementById('add-link-form');
    const linksList = document.getElementById('links-list');
    const feedbackMessage = document.getElementById('feedback-message');

    function showFeedback(message, type = 'success') {
        feedbackMessage.textContent = message;
        feedbackMessage.className = `feedback ${type}`;
        setTimeout(() => {
            feedbackMessage.textContent = '';
            feedbackMessage.className = 'feedback';
        }, 3000);
    }

    async function fetchLinks() {
        try {
            const res = await fetch('/api/links');
            if (!res.ok) throw new Error('Falha ao carregar links.');
            const data = await res.json();
            linksList.innerHTML = '';
            data.links.forEach(link => {
                const li = document.createElement('li');
                // Adicionamos um id único para cada item da lista para facilitar a edição
                li.id = `link-${link.id}`; 
                // Adicionamos o botão "Editar"
                li.innerHTML = `
                    <span>
                        <strong>${link.title}</strong> - 
                        <a href="${link.url}" target="_blank">${link.url}</a>
                    </span>
                    <div class="link-buttons">
                        <button onclick="editLink(${link.id}, '${link.title}', '${link.url}')" class="edit-btn">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteLink(${link.id})" class="delete-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                linksList.appendChild(li);
            });
        } catch (error) {
            showFeedback(error.message, 'error');
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const url = document.getElementById('url').value;
        try {
            const res = await fetch('/api/links', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, url }),
            });
            if (!res.ok) throw new Error('Falha ao adicionar link.');
            form.reset();
            showFeedback('Link adicionado com sucesso!');
            fetchLinks();
        } catch (error) {
            showFeedback(error.message, 'error');
        }
    });

    // --- NOVAS FUNÇÕES PARA EDIÇÃO ---

    window.editLink = function(id, currentTitle, currentUrl) {
        const linkItem = document.getElementById(`link-${id}`);
        linkItem.innerHTML = `
            <div class="edit-form">
                <input type="text" id="edit-title-${id}" value="${currentTitle}">
                <input type="url" id="edit-url-${id}" value="${currentUrl}">
            </div>
            <div class="link-buttons">
                <button onclick="saveLink(${id})" class="save-btn">
                    <i class="fas fa-save"></i>
                </button>
                <button onclick="cancelEdit()" class="cancel-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    }

    window.saveLink = async function(id) {
        const newTitle = document.getElementById(`edit-title-${id}`).value;
        const newUrl = document.getElementById(`edit-url-${id}`).value;
        try {
            const res = await fetch(`/api/links/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTitle, url: newUrl })
            });
            if (!res.ok) throw new Error('Falha ao atualizar o link.');
            showFeedback('Link atualizado com sucesso!');
            fetchLinks();
        } catch (error) {
            showFeedback(error.message, 'error');
        }
    }

    window.cancelEdit = function() {
        fetchLinks(); // Simplesmente recarrega a lista para cancelar a edição
    }

    // --- FIM DAS NOVAS FUNÇÕES ---

    window.deleteLink = async function(id) {
        if (confirm('Tem certeza que deseja deletar este link?')) {
            try {
                const res = await fetch(`/api/links/${id}`, { method: 'DELETE' });
                if (!res.ok) throw new Error('Falha ao deletar link.');
                showFeedback('Link deletado com sucesso!');
                fetchLinks();
            } catch (error) {
                showFeedback(error.message, 'error');
            }
        }
    }

    fetchLinks();
});