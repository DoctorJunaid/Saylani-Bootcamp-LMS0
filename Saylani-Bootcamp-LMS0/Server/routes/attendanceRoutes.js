const express = require('express');
const router = express.Router();
const {
  getAttendances,
  getStudentAttendance,
  markAttendance,
  updateAttendance,
  deleteAttendance
} = require('../controllers/attendanceController');

// Routes for main attendance actions
router.route('/')
  .get(getAttendances)
  .post(markAttendance);

// Routes for specific attendance record by ID
router.route('/:id')
  .put(updateAttendance)
  .delete(deleteAttendance);

// Route for specific student's attendance history
router.route('/student/:studentId')
  .get(getStudentAttendance);

module.exports = router;
