// server.js
const { env } = require('./src/config/env');
const { connectMongo } = require('./src/db/mongo');
const { createApp } = require('./app');

async function bootstrap() {
  await connectMongo(env.mongoUri);

  const app = createApp();

  app.listen(env.port, () => {
    console.log(`🚀 Servidor activo en puerto ${env.port} (${env.nodeEnv})`);
  });
}

bootstrap().catch((err) => {
  console.error('❌ Error al iniciar la app:', err);
  process.exit(1);
});