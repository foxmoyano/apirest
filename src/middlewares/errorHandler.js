// src/middlewares/errorHandler.js
function notFound(req, res, next) {
  res.status(404).json({
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
}

function errorHandler(err, req, res, next) {
  console.error('🔥 Error:', err);

  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || 'Error interno del servidor',
  });
}

module.exports = { notFound, errorHandler };