/**
 * data/teams.js
 * ---------------------------------------------------------------
 * Yeh file "data layer" hai — pura UI isi function ko call karta
 * hai, isliye backend integrate karte waqt sirf ISI file ko
 * touch karna hoga. Baaki koi component change nahi hoga.
 *
 * ABHI:  fetchTeams(), fetchTeamById(), createTeam() mock data
 *        (MOCK_TEAMS) use karte hain.
 * BAAD:  har function ke body ko real API call se replace kar
 *        dena, bas return shape same rakhni hai (neeche shape
 *        documented hai).
 *
 * ---------------------------------------------------------------
 * TEAM SHAPE (backward-compatible update)
 * ---------------------------------------------------------------
 * Pehle har team ke paas sirf EK `project` object tha. Ab har
 * team multiple `projects` rakh sakta hai (array). Purana
 * `project` field bhi rehne diya hai (readonly, sirf pehle
 * project se derive hota hai) taake koi purana component tootay
 * nahi.
 *
 * {
 *   id: string,
 *   name: string,
 *   status: "not_started" | "in_progress" | "completed",
 *   memberCount: number,          // members.length se derive hota hai
 *   members: [
 *     {
 *       id: string,
 *       name: string,
 *       role: string,
 *       email: string,
 *     },
 *     ...
 *   ],
 *   projects: [
 *     {
 *       id: string,
 *       title: string,
 *       description: string,
 *       deadline: string,          // ISO date string
 *       status: "not_started" | "in_progress" | "completed",
 *       progress: number,          // 0–100
 *     },
 *     ...
 *   ],
 *   project: Project | null,       // ⚠️ DEPRECATED — projects[0] hi hai,
 *                                  //    sirf backward-compat ke liye rakha
 * }
 */

const RAW_TEAMS = [
  {
    id: "team-alpha",
    name: "Team Alpha",
    status: "not_started",
    members: [],
    projects: [
      {
        id: "proj-alpha-1",
        title: "E-Commerce Platform",
        description:
          "Customer-facing online store: product catalog, cart, checkout aur order tracking.",
        deadline: "2026-09-15",
        status: "not_started",
        progress: 0,
      },
    ],
  },
  {
    id: "team-beta",
    name: "Team Beta",
    status: "completed",
    members: [
      {
        id: "mem-beta-1",
        name: "Ayesha Khan",
        role: "Project Lead",
        email: "ayesha.khan@example.com",
      },
      {
        id: "mem-beta-2",
        name: "Bilal Ahmed",
        role: "Backend Developer",
        email: "bilal.ahmed@example.com",
      },
      {
        id: "mem-beta-3",
        name: "Sana Tariq",
        role: "UI/UX Designer",
        email: "sana.tariq@example.com",
      },
    ],
    projects: [
      {
        id: "proj-beta-1",
        title: "Hospital Management System",
        description:
          "Patient records, appointment scheduling, aur billing ke liye ek unified system.",
        deadline: "2026-08-30",
        status: "completed",
        progress: 100,
      },
    ],
  },
  {
    id: "team-gamma",
    name: "Team Gamma",
    status: "completed",
    members: [
      {
        id: "mem-gamma-1",
        name: "Hassan Raza",
        role: "Frontend Developer",
        email: "hassan.raza@example.com",
      },
      {
        id: "mem-gamma-2",
        name: "Zainab Malik",
        role: "QA Engineer",
        email: "zainab.malik@example.com",
      },
    ],
    projects: [
      {
        id: "proj-gamma-1",
        title: "Portfolio Builder",
        description:
          "Drag-and-drop portfolio site builder, templates aur export ke saath.",
        deadline: "2026-08-10",
        status: "completed",
        progress: 100,
      },
    ],
  },
  {
    id: "team-delta",
    name: "Team Delta",
    status: "in_progress",
    members: [
      {
        id: "mem-delta-1",
        name: "Usman Farooq",
        role: "Full Stack Developer",
        email: "usman.farooq@example.com",
      },
    ],
    projects: [
      {
        id: "proj-delta-1",
        title: "Task Manager App",
        description:
          "Team task boards, deadlines aur notifications ke saath project tracking tool.",
        deadline: "2026-09-05",
        status: "in_progress",
        progress: 45,
      },
      {
        id: "proj-delta-2",
        title: "Internal Reporting Dashboard",
        description: "Weekly progress aur analytics dikhane wala internal dashboard.",
        deadline: "2026-10-01",
        status: "not_started",
        progress: 0,
      },
    ],
  },
];

import axios from "axios";

// Since axios instance might be configured somewhere else, let's just use axios for now or assume baseUrl is set.
// The backend runs at process.env.VITE_API_URL or relative if proxied. We'll use relative URL "/api/teams" assuming proxy or CORS setup.
const API_URL = "http://localhost:9000/api/teams";

export async function fetchTeams() {
  try {
    const res = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return res.data.teams || [];
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch teams");
  }
}

export async function fetchTeamById(teamId) {
  try {
    const res = await axios.get(`${API_URL}/${teamId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return res.data.team || null;
  } catch (error) {
    if (error.response?.status === 404) return null;
    throw new Error(error.response?.data?.message || "Failed to fetch team");
  }
}

export async function createTeam(team) {
  try {
    const res = await axios.post(API_URL, team, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return res.data.team;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create team");
  }
}