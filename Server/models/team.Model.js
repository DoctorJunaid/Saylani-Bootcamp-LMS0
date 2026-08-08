import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Team name is required"],
        },

        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
        },

        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
            },
        ],
    },
    { timestamps: true }
);

export const Team = mongoose.model("Team", teamSchema);     