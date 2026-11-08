const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, trim: true, maxlength: 120 },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Content', contentSchema);
