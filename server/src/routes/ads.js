const express = require('express');
const Campaign = require('../models/Campaign');
const requireAdmin = require('../middleware/requireAdmin');
const router = express.Router();
const fields = ['title', 'description', 'type', 'mediaUrl', 'targetUrl', 'cta', 'placement', 'startsAt', 'endsAt', 'active'];
const pickFields = (body) => Object.fromEntries(fields.filter((field) => body?.[field] !== undefined).map((field) => [field, body[field]]));

router.get('/', async (_req, res, next) => {
  try {
    const now = new Date();
    const items = await Campaign.find({ active: true, $and: [{ $or: [{ startsAt: null }, { startsAt: { $lte: now } }] }, { $or: [{ endsAt: null }, { endsAt: { $gte: now } }] }] }).sort({ createdAt: -1 }).lean();
    return res.json({ items });
  } catch (error) { return next(error); }
});
router.get('/manage', requireAdmin, async (_req, res, next) => {
  try { return res.json({ items: await Campaign.find().sort({ createdAt: -1 }).lean() }); }
  catch (error) { return next(error); }
});
router.post('/', requireAdmin, async (req, res, next) => {
  try {
    const item = await Campaign.create(pickFields(req.body));
    return res.status(201).json({ item });
  } catch (error) { return next(error); }
});
router.put('/:id', requireAdmin, async (req, res, next) => {
  try {
    const item = await Campaign.findByIdAndUpdate(req.params.id, { $set: pickFields(req.body) }, { new: true, runValidators: true });
    return item ? res.json({ item }) : res.status(404).json({ message: 'Annonce introuvable.' });
  } catch (error) { return next(error); }
});
router.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    const item = await Campaign.findByIdAndDelete(req.params.id);
    return item ? res.status(204).end() : res.status(404).json({ message: 'Annonce introuvable.' });
  } catch (error) { return next(error); }
});
module.exports = router;
