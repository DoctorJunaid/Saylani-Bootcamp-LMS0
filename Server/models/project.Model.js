import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Project name is required'] 
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    description:{
        type: String
    },
    dueDate:{
        type: Date,
    },
    status:{
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
        default: 'Not Started'
    },
},{timestamps:true})


export default mongoose.model("Project", projectSchema)
