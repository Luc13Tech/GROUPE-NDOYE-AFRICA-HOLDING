const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');
const adsRoutes = require('./routes/ads');
const newsRoutes = require('./routes/news');
const analyticsRoutes = require('./routes/analytics');
const mediaRoutes = require('./routes/media');

const app = express();
const port = Number(process.env.PORT) || 4000;

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: (process.env.CLIENT_ORIGIN || 'http://localhost:3000').split(',').map((origin) => origin.trim()), credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: 'draft-7', legacyHeaders: false }), authRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'gnah-api' }));
app.use('/api/content', contentRoutes);
app.use('/api/ads', adsRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/media', mediaRoutes);

app.use((req, res) => res.status(404).json({ message: `Route inconnue: ${req.method} ${req.path}` }));
app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(error.status || 500).json({ message: error.status ? error.message : 'Erreur interne du serveur.' });
});

async function start() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI doit être défini.');
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) throw new Error('JWT_SECRET doit contenir au moins 32 caractères.');
  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(port, () => console.log(`GNAH API disponible sur le port ${port}`));
}

if (require.main === module) {
  start().catch((error) => {
    console.error('Démarrage de l’API impossible:', error.message);
    process.exit(1);
  });
}

module.exports = app;
