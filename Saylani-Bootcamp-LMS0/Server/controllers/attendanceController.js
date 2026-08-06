const Attendance = require('../models/attendanceModel');

// @desc    Get all attendance records (with optional date filtering)
// @route   GET /api/attendance
exports.getAttendances = async (req, res) => {
  try {
    const filter = {};
    if (req.query.date) {
      // Allows filtering by a specific date (e.g., ?date=2023-10-27)
      const queryDate = new Date(req.query.date);
      const nextDay = new Date(queryDate);
      nextDay.setDate(nextDay.getDate() + 1);
      
      filter.date = {
        $gte: queryDate,
        $lt: nextDay
      };
    }
    
    const attendances = await Attendance.find(filter).populate('studentId');
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get attendance history for a specific student
// @route   GET /api/attendance/student/:studentId
exports.getStudentAttendance = async (req, res) => {
  try {
    const attendances = await Attendance.find({ studentId: req.params.studentId });
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark/Create attendance
// @route   POST /api/attendance
exports.markAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Edit/Update attendance
// @route   PUT /api/attendance/:id
exports.updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!attendance) return res.status(404).json({ message: 'Attendance record not found' });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete attendance record
// @route   DELETE /api/attendance/:id
exports.deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!attendance) return res.status(404).json({ message: 'Attendance record not found' });
    res.status(200).json({ message: 'Attendance record removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
