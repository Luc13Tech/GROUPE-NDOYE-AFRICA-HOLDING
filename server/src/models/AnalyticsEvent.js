const mongoose = require('mongoose');

const analyticsEventSchema = new mongoose.Schema({
  event: { type: String, enum: ['page_view', 'ad_click', 'contact_request'], required: true },
  page: { type: String, maxlength: 300, default: '/' },
  properties: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('AnalyticsEvent', analyticsEventSchema);
