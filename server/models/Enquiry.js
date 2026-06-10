const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  firstName:   { type: String, required: true, trim: true },
  lastName:    { type: String, required: true, trim: true },
  email:       { type: String, required: true, lowercase: true },
  institution: { type: String, required: true, trim: true },
  interest: {
    type: String,
    required: true,
    enum: [
      'NABH 6th Edition Compliance Training',
      'Clinical Safety & Infection Prevention',
      'OSCE/OSPE Simulation',
      'Empathy & Communication Modules',
      'Co-Branded Academy Partnership',
      'Full Platform Demo'
    ]
  },
  message: { type: String, trim: true, maxlength: 2000 },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in-progress', 'closed'],
    default: 'new'
  },
  adminNotes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', enquirySchema);