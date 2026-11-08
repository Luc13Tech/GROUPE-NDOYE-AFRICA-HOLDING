const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: { type: mongoose.Schema.Types.Mixed, required: true },
  description: { type: mongoose.Schema.Types.Mixed, default: {} },
  type: { type: String, enum: ['banner', 'image', 'video', 'post'], default: 'banner' },
  mediaUrl: { type: String, default: '' },
  targetUrl: { type: String, default: '' },
  cta: { type: mongoose.Schema.Types.Mixed, default: {} },
  placement: { type: String, default: 'home' },
  startsAt: { type: Date, default: null },
  endsAt: { type: Date, default: null },
  active: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Campaign', campaignSchema);
