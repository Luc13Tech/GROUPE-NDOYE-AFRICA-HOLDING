const express = require('express');
const News = require('../models/News');
const requireAdmin = require('../middleware/requireAdmin');
const router = express.Router();
const fields = ['title', 'summary', 'body', 'imageUrl', 'publishedAt', 'active'];
const pickFields = (body) => Object.fromEntries(fields.filter((field) => body?.[field] !== undefined).map((field) => [field, body[field]]));

router.get('/', async (_req, res, next) => {
  try { return res.json({ items: await News.find({ active: true, publishedAt: { $lte: new Date() } }).sort({ publishedAt: -1 }).lean() }); }
  catch (error) { return next(error); }
});
router.get('/manage', requireAdmin, async (_req, res, next) => {
  try { return res.json({ items: await News.find().sort({ updatedAt: -1 }).lean() }); }
  catch (error) { return next(error); }
});
router.post('/', requireAdmin, async (req, res, next) => {
  try { return res.status(201).json({ item: await News.create(pickFields(req.body)) }); }
  catch (error) { return next(error); }
});
router.put('/:id', requireAdmin, async (req, res, next) => {
  try {
    const item = await News.findByIdAndUpdate(req.params.id, { $set: pickFields(req.body) }, { new: true, runValidators: true });
    return item ? res.json({ item }) : res.status(404).json({ message: 'Actualité introuvable.' });
  } catch (error) { return next(error); }
});
router.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    const item = await News.findByIdAndDelete(req.params.id);
    return item ? res.status(204).end() : res.status(404).json({ message: 'Actualité introuvable.' });
  } catch (error) { return next(error); }
});
module.exports = router;
