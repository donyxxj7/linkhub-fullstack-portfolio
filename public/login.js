// public/login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const passwordInput = document.getElementById('password');
    const feedbackDiv = document.getElementById('login-feedback');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const password = passwordInput.value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: password }),
            });

            // Se a resposta for OK (status 200), o login foi um sucesso
            if (response.ok) {
                // Guardamos uma "prova" no navegador de que o login foi feito
                sessionStorage.setItem('isAuthenticated', 'true');
                // Redirecionamos para o painel de administração
                window.location.href = '/admin.html';
            } else {
                // Se a senha estiver errada (status 401)
                feedbackDiv.textContent = 'Senha incorreta. Tente novamente.';
                feedbackDiv.className = 'feedback error';
            }
        } catch (error) {
            console.error('Erro ao tentar fazer login:', error);
            feedbackDiv.textContent = 'Erro de conexão com o servidor.';
            feedbackDiv.className = 'feedback error';
        }
    });
});