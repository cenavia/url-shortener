const urlService = require('../services/url.service');

const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) {
      return res.status(400).json({ error: 'La URL original es requerida' });
    }
    const result = await urlService.shortenUrl(originalUrl);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const redirectShortUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const originalUrl = await urlService.getOriginalUrl(shortCode);
    res.redirect(originalUrl);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { createShortUrl, redirectShortUrl };
