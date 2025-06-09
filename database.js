// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./linkhub.db'); // O arquivo do banco de dados

db.serialize(() => {
  // Cria a tabela 'links' se ela não existir
  db.run(`
    CREATE TABLE IF NOT EXISTS links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      url TEXT NOT NULL
    )
  `);
});

module.exports = db;