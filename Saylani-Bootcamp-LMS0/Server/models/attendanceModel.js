const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student',
    required: [true, 'Student ID is required']
  },
  date: { 
    type: Date, 
    default: Date.now,
    required: [true, 'Date is required']
  },
  status: { 
    type: String, 
    enum: ['Present', 'Absent', 'Leave'],
    required: [true, 'Status is required']
  }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
