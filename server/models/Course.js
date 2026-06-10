const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  badge:       { type: String },
  description: { type: String, required: true },
  duration:    { type: String },
  category: {
    type: String,
    required: true,
    enum: ['Clinical','Pharmacy','Technical','Empathy','Analytics','Emergency']
  },
  naabhChapter: { type: String },
  isActive:     { type: Boolean, default: true },
  order:        { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);