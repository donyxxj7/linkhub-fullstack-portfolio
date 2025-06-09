// server.js
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

// 1. IMPORTAÇÕES E CONFIGURAÇÃO INICIAL
const express = require('express');
const db = require('./database.js'); // Importa a conexão com o banco de dados
const app = express();
const port = 3000; // Define a porta do servidor

// 2. MIDDLEWARES
app.use(express.json()); 
app.use(express.static('public')); 

// 3. ROTAS DA API

// --- ROTA DE AUTENTICAÇÃO ---
app.post('/api/login', (req, res) => {
    const { password } = req.body;

    // Compara a senha enviada com a senha guardada no arquivo .env
    if (password && password === process.env.ADMIN_PASSWORD) {
        // Se a senha estiver correta, envia uma resposta de sucesso.
        res.status(200).json({ success: true, message: 'Login bem-sucedido' });
    } else {
        // Se a senha estiver incorreta ou não for enviada, retorna um erro de 'Não autorizado'.
        res.status(401).json({ success: false, message: 'Senha incorreta' });
    }
});


// --- ROTAS CRUD PARA LINKS ---

// Rota para LER todos os links (Read)
app.get('/api/links', (req, res) => {
  db.all("SELECT * FROM links ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ links: rows });
  });
});

// Rota para CRIAR um novo link (Create)
app.post('/api/links', (req, res) => {
  const { title, url } = req.body;
  if (!title || !url) {
    return res.status(400).json({ error: 'Título e URL são obrigatórios.' });
  }
  db.run(`INSERT INTO links (title, url) VALUES (?, ?)`, [title, url], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, title, url });
  });
});

// Rota para ATUALIZAR um link (Update)
app.put('/api/links/:id', (req, res) => {
    const { id } = req.params;
    const { title, url } = req.body;

    if (!title || !url) {
        return res.status(400).json({ error: 'Título e URL são obrigatórios.' });
    }

    db.run(`UPDATE links SET title = ?, url = ? WHERE id = ?`, [title, url, id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Link atualizado com sucesso', changes: this.changes });
    });
});

// Rota para DELETAR um link (Delete)
app.delete('/api/links/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM links WHERE id = ?`, id, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Link deletado com sucesso', changes: this.changes });
  });
});

// 4. INICIA O SERVIDOR
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log('Acesse a página pública em http://localhost:3000');
  console.log('Acesse o painel de admin em http://localhost:3000/admin.html (após login)');
});