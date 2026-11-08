const express = require('express');
const Content = require('../models/Content');
const requireAdmin = require('../middleware/requireAdmin');
const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const entries = await Content.find().lean();
    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    return res.json({ content: Object.fromEntries(entries.map(({ key, value }) => [key, value])) });
  } catch (error) { return next(error); }
});

router.put('/:key', requireAdmin, async (req, res, next) => {
  try {
    const key = String(req.params.key || '').trim();
    if (!/^[a-zA-Z0-9._-]{1,120}$/.test(key) || req.body?.value === undefined) {
      return res.status(400).json({ message: 'Clé ou valeur de contenu invalide.' });
    }
    const entry = await Content.findOneAndUpdate({ key }, { $set: { value: req.body.value } }, { upsert: true, new: true, runValidators: true }).lean();
    return res.json({ key: entry.key, value: entry.value });
  } catch (error) { return next(error); }
});

module.exports = router;
