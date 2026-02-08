// controllers/product.controller.js
const mongoose = require('mongoose');
const Product = require('../models/product');

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

exports.health = (req, res) => {
  res.status(200).json({ ok: true, module: 'products' });
};

exports.create = async (req, res, next) => {
  try {
    const { name, price } = req.body ?? {};

    // Validación mínima (puedes moverla al schema de Mongoose también)
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'El campo "name" es requerido y debe ser string.' });
    }
    if (price === undefined || Number.isNaN(Number(price))) {
      return res.status(400).json({ message: 'El campo "price" es requerido y debe ser numérico.' });
    }

    const product = await Product.create({
      name: name.trim(),
      price: Number(price),
    });

    return res.status(201).json(product);
  } catch (err) {
    return next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'El id no es un ObjectId válido.' });
    }

    const product = await Product.findById(id).lean();

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    return res.status(200).json(product);
  } catch (err) {
    return next(err);
  }
};

exports.updateById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'El id no es un ObjectId válido.' });
    }

    // Opcional: limitar campos permitidos (evita que actualicen cualquier cosa)
    const allowed = ['name', 'price'];
    const update = {};
    for (const key of allowed) {
      if (req.body?.[key] !== undefined) update[key] = req.body[key];
    }

    if (Object.keys(update).length === 0) {
      return res.status(400).json({ message: 'No hay campos válidos para actualizar (name, price).' });
    }

    if (update.name !== undefined) {
      if (typeof update.name !== 'string' || !update.name.trim()) {
        return res.status(400).json({ message: 'El campo "name" debe ser string no vacío.' });
      }
      update.name = update.name.trim();
    }

    if (update.price !== undefined) {
      const p = Number(update.price);
      if (Number.isNaN(p)) {
        return res.status(400).json({ message: 'El campo "price" debe ser numérico.' });
      }
      update.price = p;
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, runValidators: true }
    ).lean();

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    return res.status(200).json(product);
  } catch (err) {
    return next(err);
  }
};

exports.deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'El id no es un ObjectId válido.' });
    }

    const deleted = await Product.findByIdAndDelete(id).lean();

    if (!deleted) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    return res.status(200).json({ message: 'Eliminación satisfactoria', id });
  } catch (err) {
    return next(err);
  }
};