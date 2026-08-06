const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Team name is required'] 
  },
  projectId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Project' 
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
}, { timestamps: true });

// Note: To get the number of members (as required in requirements), 
// you would query the Student model where teamId equals this team's _id.
module.exports = mongoose.model('Team', teamSchema);
