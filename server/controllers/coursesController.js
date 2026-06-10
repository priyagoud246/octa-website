const Course = require('../models/Course');

const DEFAULT_COURSES = [
  { title:'Patient Safety & Infection Prevention', badge:'🏥 Clinical',   description:'Evidence-based protocols for infection control, hand hygiene compliance, and patient safety.',    duration:'8 hrs',  category:'Clinical',   naabhChapter:'NABH Ch.2',   order:1 },
  { title:'Medication Management & Safety',         badge:'💊 Pharmacy',   description:'Safe medication administration, high-alert drug protocols, and adverse event reporting.',         duration:'6 hrs',  category:'Pharmacy',   naabhChapter:'NABH Aligned',order:2 },
  { title:'OSCE/OSPE Simulation Training',          badge:'🧪 Technical',  description:'Realistic clinical scenarios with hands-on simulations and immersive case studies.',              duration:'12 hrs', category:'Technical',  naabhChapter:'Simulation',  order:3 },
  { title:'Empathy-Centered Communication',         badge:'❤️ Empathy',    description:'Communication modules with compassion focus — building trust and patient-centred care.',         duration:'4 hrs',  category:'Empathy',    naabhChapter:'Soft Skills', order:4 },
  { title:'Clinical Governance & Audit',            badge:'📊 Analytics',  description:'Continuous quality improvement, audit documentation, and clinical governance frameworks.',       duration:'5 hrs',  category:'Analytics',  naabhChapter:'Leadership',  order:5 },
  { title:'Emergency Response & Drills',            badge:'🚨 Emergency',  description:'SOP-aligned emergency protocols and real-world scenario practice for rapid decision-making.',    duration:'10 hrs', category:'Emergency',  naabhChapter:'SOPs',        order:6 },
];

// GET /api/courses  — public
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true }).sort('order');
    res.json({ success: true, courses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/courses  — admin
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, course });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT /api/courses/:id  — admin
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, course });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE /api/courses/:id  — admin (soft delete)
exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'Course removed' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/courses/seed  — admin (run once to populate DB)
exports.seedCourses = async (req, res) => {
  try {
    await Course.deleteMany({});
    const courses = await Course.insertMany(DEFAULT_COURSES);
    res.status(201).json({ success: true, message: `${courses.length} courses seeded`, courses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};