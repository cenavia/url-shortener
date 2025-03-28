const express = require('express');
const app = express();
const { port } = require('./config/env');
const urlRoutes = require('./routes/url.routes');
const { createTable } = require('./models/url.model');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use(express.json());

// Ruta base para la API de acortamiento de URL
app.use('/api/urls', urlRoutes);

// Inicializar la tabla si no existe
createTable().then(() => {
  console.log('Tabla "urls" verificada/creada');
}).catch(err => console.error(err));

// Configuración de opciones para swagger-jsdoc
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Acortador de URLs',
      version: '1.0.0',
      description: 'API para acortar URLs',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Ruta a tus archivos de rutas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
