const router = require('express').Router();
const { getCourses, createCourse, updateCourse, deleteCourse, seedCourses } = require('../controllers/coursesController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/',        getCourses);
router.post('/seed',   protect, adminOnly, seedCourses);
router.post('/',       protect, adminOnly, createCourse);
router.put('/:id',     protect, adminOnly, updateCourse);
router.delete('/:id',  protect, adminOnly, deleteCourse);

module.exports = router;