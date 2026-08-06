const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Project name is required'] 
  },
  description: { 
    type: String 
  },
  deadline: { 
    type: Date 
  },
  status: { 
    type: String, 
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started'
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
