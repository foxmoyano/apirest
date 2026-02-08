// app.js
const express = require('express');
const productRoutes = require('./routes/product.routes');

const { notFound, errorHandler } = require('./src/middlewares/errorHandler');

function createApp() {
  const app = express();

  // Middlewares base (reemplaza body-parser)
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health general (útil en Kubernetes / monitoreo)
  app.get('/health', (req, res) => {
    res.json({ ok: true });
  });

  // Rutas
  app.use('/products', productRoutes);

  // Errores
  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };