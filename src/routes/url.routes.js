const express = require('express');
const router = express.Router();
const urlController = require('../controllers/url.controller');

// Endpoint para crear una URL corta
router.post('/shorten', urlController.createShortUrl);

// Endpoint para redireccionar según el shortCode
router.get('/:shortCode', urlController.redirectShortUrl);

module.exports = router;
