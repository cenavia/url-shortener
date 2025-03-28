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

// Ejemplo de función para obtener todas las URLs (opcional)
 const getAllUrls = async (req, res) => {
   try {  
     const urls = await urlService.getAllUrls();
     res.json(urls);
   } catch (error) {
    res.status(500).json({ error: error.message });
   }
};

//
// Ejemplo de función para eliminar una URL (opcional)
 const deleteUrl = async (req, res) => {
   try {
     const { id } = req.params;
    await urlService.deleteUrl(id);
    res.status(204).send();
   } catch (error) {
    res.status(500).json({ error: error.message });
   }
};


module.exports = { createShortUrl, redirectShortUrl, getAllUrls, deleteUrl };
