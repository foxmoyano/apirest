// src/config/env.js
const dotenv = require('dotenv');

dotenv.config();

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`❌ Falta variable de entorno: ${name}`);
  return value;
}

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3000),
  mongoUri: requireEnv('MONGODB_URI'),
};

module.exports = { env };