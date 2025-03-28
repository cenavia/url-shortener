const express = require("express");
const router = express.Router();
const urlController = require("../controllers/url.controller");

// Endpoint para crear una URL corta
/**
 * @swagger
 * /api/urls/shorten:
 *   post:
 *     summary: Acorta una URL
 *     description: Recibe una URL larga y devuelve una versión acortada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 example: 'https://www.ejemplo.com'
 *     responses:
 *       200:
 *         description: URL acortada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shortUrl:
 *                   type: string
 *                   example: 'http://localhost:8000/api/urls/abc123'
 *       400:
 *         description: Solicitud inválida
 */
router.post("/shorten", urlController.createShortUrl);

// Endpoint para redireccionar según el shortCode
/**
 * @swagger
 * /api/urls/{shortCode}:
 *   get:
 *     summary: Redirige a la URL original
 *     description: Redirige al usuario a la URL original basada en el código corto proporcionado.
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *         description: El código corto de la URL.
 *     responses:
 *       302:
 *         description: Redirección exitosa a la URL original.
 *       404:
 *         description: URL no encontrada.
 */
router.get("/:shortCode", urlController.redirectShortUrl);

// Endpoint para obtener todas las URLs (opcional)
/**
 * @swagger
 * /api/urls:
 *   get:
 *     summary: Obtiene todas las URLs acortadas
 *     description: Devuelve una lista de todas las URLs acortadas.
 *     responses:
 *       200:
 *         description: Lista de URLs acortadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   originalUrl:
 *                     type: string
 *                   shortCode:
 *                     type: string
 */
router.get("/", urlController.getAllUrls);
// Endpoint para eliminar una URL (opcional)
/**
 * @swagger
 * /api/urls/{id}:
 *   delete:
 *     summary: Elimina una URL acortada
 *     description: Elimina una URL acortada por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID de la URL a eliminar.
 *     responses:
 *       204:
 *         description: URL eliminada con éxito.
 *       404:
 *         description: URL no encontrada.
 */
router.delete("/:id", urlController.deleteUrl);

module.exports = router;
