const pool = require('../config/database');

const createTable = async () => {
  const createQuery = `
    CREATE TABLE IF NOT EXISTS urls (
      id INT AUTO_INCREMENT PRIMARY KEY,
      original_url VARCHAR(2048) NOT NULL,
      short_code VARCHAR(10) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await pool.query(createQuery);
};

module.exports = { createTable };