const Enquiry = require('../models/Enquiry');
const nodemailer = require('nodemailer');

const mailer = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

// POST /api/enquiry  — public
exports.submitEnquiry = async (req, res) => {
  try {
    const { firstName, lastName, email, institution, interest, message } = req.body;
    if (!firstName || !lastName || !email || !institution || !interest)
      return res.status(400).json({ success: false, message: 'All fields are required' });

    const enquiry = await Enquiry.create({ firstName, lastName, email, institution, interest, message });

    // 1. Email to the User (Confirmation)
    mailer.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Thank you for your enquiry — OCTA',
      html: `<h2 style="color:#2d6b65">Thank you, ${firstName}!</h2>
             <p>We received your enquiry about <strong>${interest}</strong> and will reply within 48 hours.</p>
             <p style="color:#888;font-size:12px">OCTA Healthcare Training · IMC · NMCI · NABH 6th Ed.</p>`
    }).catch(e => console.warn('User confirmation email error:', e.message));

    // 2. Email to Admin (Specific recipient: priyagoud246@gmail.com)
    mailer.sendMail({
      from: process.env.EMAIL_FROM,
      to: 'priyagoud246@gmail.com', 
      subject: `New Enquiry — ${firstName} ${lastName} · ${institution}`,
      html: `<h3>New Enquiry</h3>
             <p><b>Name:</b> ${firstName} ${lastName}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Institution:</b> ${institution}</p>
             <p><b>Interest:</b> ${interest}</p>
             <p><b>Message:</b> ${message || '—'}</p>`
    }).catch(e => console.warn('Admin notification email error:', e.message));

    res.status(201).json({
      success: true,
      message: "Enquiry submitted! We'll be in touch within 48 hours.",
      id: enquiry._id
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/enquiry  — admin only
exports.getAllEnquiries = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const skip   = (page - 1) * limit;
    const [enquiries, total] = await Promise.all([
      Enquiry.find(filter).sort('-createdAt').skip(skip).limit(Number(limit)),
      Enquiry.countDocuments(filter)
    ]);
    res.json({ success: true, total, pages: Math.ceil(total / limit), enquiries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH /api/enquiry/:id  — admin only
exports.updateEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!enquiry) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, enquiry });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};