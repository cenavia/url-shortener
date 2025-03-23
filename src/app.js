const express = require('express');
const app = express();
const { port } = require('./config/env');
const urlRoutes = require('./routes/url.routes');
const { createTable } = require('./models/url.model');

app.use(express.json());

// Ruta base para la API de acortamiento de URL
app.use('/api/urls', urlRoutes);

// Inicializar la tabla si no existe
createTable().then(() => {
  console.log('Tabla "urls" verificada/creada');
}).catch(err => console.error(err));

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
