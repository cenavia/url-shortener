const pool = require('../config/database');

const generateShortCode = () => {
  // Genera un código aleatorio de 6 caracteres (puedes mejorar el algoritmo)
  return Math.random().toString(36).substring(2, 8);
};

const shortenUrl = async (originalUrl) => {
  const shortCode = generateShortCode();
  const query = 'INSERT INTO urls (original_url, short_code) VALUES (?, ?)';
  const [result] = await pool.execute(query, [originalUrl, shortCode]);
  return { id: result.insertId, originalUrl, shortCode };
};

const getOriginalUrl = async (shortCode) => {
  const query = 'SELECT original_url FROM urls WHERE short_code = ?';
  const [rows] = await pool.execute(query, [shortCode]);
  if (rows.length === 0) {
    throw new Error('URL no encontrada');
  }
  return rows[0].original_url;
};

module.exports = { shortenUrl, getOriginalUrl };