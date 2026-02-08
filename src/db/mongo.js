// src/db/mongo.js
const mongoose = require('mongoose');

async function connectMongo(mongoUri) {
  mongoose.set('strictQuery', true);

  await mongoose.connect(mongoUri);

  mongoose.connection.on('connected', () => {
    console.log('✅ MongoDB conectado');
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ Error de conexión MongoDB:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB desconectado');
  });
}

module.exports = { connectMongo };