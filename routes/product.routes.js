// src/routes/product.routes.js
const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

// Health del módulo (reemplaza /test)
router.get('/health', productController.health);

// CRUD REST
router.post('/', productController.create);
router.get('/:id', productController.getById);
router.put('/:id', productController.updateById);
router.delete('/:id', productController.deleteById);

module.exports = router;