const express = require('express');
const rateLimit = require('express-rate-limit');
const AnalyticsEvent = require('../models/AnalyticsEvent');
const requireAdmin = require('../middleware/requireAdmin');
const router = express.Router();
const eventLimiter = rateLimit({ windowMs: 60 * 1000, limit: 60, standardHeaders: 'draft-7', legacyHeaders: false });
const allowedProperties = (input) => {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return {};
  return Object.fromEntries(Object.entries(input).filter(([key, value]) => ['campaignId', 'placement'].includes(key) && ['string', 'number'].includes(typeof value)).slice(0, 10));
};

router.post('/events', eventLimiter, async (req, res, next) => {
  try {
    const { event, page } = req.body || {};
    if (!['page_view', 'ad_click', 'contact_request'].includes(event)) return res.status(400).json({ message: 'Type d’événement invalide.' });
    await AnalyticsEvent.create({ event, page: typeof page === 'string' ? page.slice(0, 300) : '/', properties: allowedProperties(req.body?.properties) });
    return res.status(202).json({ accepted: true });
  } catch (error) { return next(error); }
});

router.get('/summary', requireAdmin, async (_req, res, next) => {
  try {
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const [totals, popularPages] = await Promise.all([
      AnalyticsEvent.aggregate([{ $match: { createdAt: { $gte: since } } }, { $group: { _id: '$event', count: { $sum: 1 } } }]),
      AnalyticsEvent.aggregate([{ $match: { event: 'page_view', createdAt: { $gte: since } } }, { $group: { _id: '$page', views: { $sum: 1 } } }, { $sort: { views: -1 } }, { $limit: 10 }]),
    ]);
    return res.json({ since, totals: Object.fromEntries(totals.map(({ _id, count }) => [_id, count])), popularPages });
  } catch (error) { return next(error); }
});
module.exports = router;
