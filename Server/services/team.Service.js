import { Team } from "../models/team.Model.js";
import Student from "../models/student.Model.js";
import Project from "../models/project.Model.js";

// @desc get all teams

export const getAllTeamsService = async () => {
    const teams = await Team.find().populate("members").lean();
    const projects = await Project.find({ teamId: { $in: teams.map(t => t._id) } }).lean();
    
    const projectsByTeam = {};
    projects.forEach(p => {
        const tid = p.teamId.toString();
        if(!projectsByTeam[tid]) projectsByTeam[tid] = [];
        projectsByTeam[tid].push(p);
    });

    teams.forEach(t => {
        t.projects = projectsByTeam[t._id.toString()] || [];
    });
    return teams;
}

// @desc get team by id

export const getTeamByIdService = async (id) => {
    const team = await Team.findById(id).populate("members").lean();
    if (team) {
        team.projects = await Project.find({ teamId: team._id }).lean();
    }
    return team;
}

// @desc create team

export const createTeamService = async (teamData) => {
    return await Team.create(teamData);
}

// @desc update team

export const updateTeamService = async (id, teamData) => {
    return await Team.findByIdAndUpdate(id, teamData, { new: true, runValidators: true });
}

// @desc delete team

export const deleteTeamService = async (id) => {
    return await Team.findByIdAndDelete(id);
}

// @desc add members to team
export const addMemberToTeamService = async (teamId, studentId) => {
    return await Team.findByIdAndUpdate(
        teamId,
        {
            $addToSet: {
                members: studentId
            }
        },
        {
            new: true,
            runValidators: true
        }
    ).populate("members");
};


// @desc remove member from team

export const removeMemberFromTeamService = async (teamId, studentId) => {
    return await Team.findByIdAndUpdate(
        teamId,
        {
            $pull: {
                members: studentId
            }
        },
        {
            new: true,
            runValidators: true
        }
    ).populate("members");
};

// @desc    remove  selected   members from team

export const removeSelectedMembersFromTeamService = async (teamId, studentIds) => {
    return await Team.findByIdAndUpdate(
        teamId,
        {
            $pull: {
                members: { $in: studentIds }
            }
        },
        {
            new: true,
            runValidators: true
        }
    ).populate("members");
};

// @desc    get team by project id

export const getTeamByProjectIdService = async (projectId) => {
    return await Team.findOne({ projectId }).populate("members");
}

// @desc    get unassigned teams

export const getUnassignedTeamsService = async () => {
    return await Team.find({ members: { $size: 0 } }).populate("members");
}

// @desc    get unassigned students from all teams

export const getUnassignedStudentsService = async () => {
    const teams = await Team.find().select("members");

    const assignedStudentIds = teams.flatMap(team => team.members);

    return await Student.find({
        _id: { $nin: assignedStudentIds }
    });
};