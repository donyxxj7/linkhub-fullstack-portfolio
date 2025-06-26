<h1 align="center">🔗 LinkHub - Fullstack Portfolio</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-blue" alt="Status">
  <img src="https://img.shields.io/badge/Front--end-React.js-blue?logo=react" alt="React">
  <img src="https://img.shields.io/badge/Back--end-Node.js-green?logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/Estilo-Tailwind%20CSS-teal?logo=tailwindcss" alt="Tailwind">
</p>

<p align="center">
   <a href="https://imgur.com/a/MHtdT3F">Foto Do LinkHub</a>
</p>

---

## 📌 Sobre o Projeto

O **LinkHub** é uma aplicação web fullstack criada para servir como um portfólio de links interativo, onde usuários podem cadastrar e divulgar seus principais canais online: redes sociais, sites, contatos e muito mais.

> Ideal para criadores de conteúdo, freelancers e profissionais que desejam centralizar seus links em um só lugar com visual moderno e responsivo.

---

## 🔧 Tecnologias Utilizadas

### 💻 Front-end
- React.js
- Tailwind CSS
- Vite

### 🛠️ Back-end
- Node.js
- Express.js
- MongoDB + Mongoose

---

## 🎯 Funcionalidades

✅ Cadastro e autenticação de usuários  
✅ Criação e edição de perfil personalizado  
✅ Adição, exclusão e ordenação de links  
✅ Página pública com visual limpo e responsivo  
✅ Deploy-ready com integração front + back

---

## 🧪 Como rodar localmente

```bash
# Clone o projeto
git clone https://github.com/donyxxj7/linkhub-fullstack-portfolio.git
cd linkhub-fullstack-portfolio

# Instale o back-end
cd server
npm install

# Configure o .env no back-end
PORT=5000
MONGO_URI=sua_string_do_mongo
JWT_SECRET=sua_chave

# Inicie o back-end
npm run dev

# Instale o front-end
cd ../client
npm install

# Inicie o front-end
npm run dev
