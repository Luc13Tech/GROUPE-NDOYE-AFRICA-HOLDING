const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: mongoose.Schema.Types.Mixed, required: true },
  summary: { type: mongoose.Schema.Types.Mixed, default: {} },
  body: { type: mongoose.Schema.Types.Mixed, default: {} },
  imageUrl: { type: String, default: '' },
  publishedAt: { type: Date, default: null },
  active: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('News', newsSchema);
