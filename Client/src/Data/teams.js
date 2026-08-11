/**
 * data/teams.js
 * ---------------------------------------------------------------
 * Yeh file "data layer" hai — pura UI isi function ko call karta
 * hai, isliye backend integrate karte waqt sirf ISI file ko
 * touch karna hoga. Baaki koi component change nahi hoga.
 *
 * ABHI:  fetchTeams() mock data return karta hai.
 * BAAD:  fetchTeams() ko real API call se replace kar dena,
 *        bas return shape same rakhni hai.
 */

const MOCK_TEAMS = [
  {
    id: "team-alpha",
    name: "Team Alpha",
    memberCount: 0,
    status: "not_started",
    project: {
      title: "E-Commerce Platform",
      deadline: "2026-09-15",
    },
  },
  {
    id: "team-beta",
    name: "Team Beta",
    memberCount: 0,
    status: "completed",
    project: {
      title: "Hospital Management System",
      deadline: "2026-08-30",
    },
  },
  {
    id: "team-gamma",
    name: "Team Gamma",
    memberCount: 0,
    status: "completed",
    project: {
      title: "Portfolio Builder",
      deadline: "2026-08-10",
    },
  },
  {
    id: "team-delta",
    name: "Team Delta",
    memberCount: 0,
    status: "in_progress",
    project: {
      title: "Task Manager App",
      deadline: "2026-09-05",
    },
  },
];

/**
 * fetchTeams
 * ---------------------------------------------------------------
 * Jab backend ready ho jaye, is function ke body ko replace kar
 * dena, e.g.:
 *
 *   export async function fetchTeams() {
 *     const res = await fetch("/api/teams");
 *     if (!res.ok) throw new Error("Failed to fetch teams");
 *     return res.json();
 *   }
 *
 * Return shape hamesha yeh honi chahiye: Array<Team>
 * (Team shape TeamCard.jsx me documented hai)
 */
export async function fetchTeams() {
  // Real network jaisa feel dene ke liye chhota delay (optional, hata sakte hain)
  await new Promise((resolve) => setTimeout(resolve, 300));

  return MOCK_TEAMS;
}