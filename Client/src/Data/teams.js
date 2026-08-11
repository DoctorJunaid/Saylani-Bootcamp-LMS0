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

/**
 * withDerivedFields
 * ---------------------------------------------------------------
 * Har team object ko `memberCount` aur deprecated `project` field
 * ke saath enrich karta hai, taake purane components bina badlaav
 * ke chalte rahein.
 */
function withDerivedFields(team) {
  return {
    ...team,
    memberCount: team.members?.length ?? 0,
    // ⚠️ DEPRECATED: naye code me `projects` array use karein
    project: team.projects?.[0] ?? null,
  };
}

const MOCK_TEAMS = RAW_TEAMS.map(withDerivedFields);

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
 */
export async function fetchTeams() {
  // Real network jaisa feel dene ke liye chhota delay (optional, hata sakte hain)
  await new Promise((resolve) => setTimeout(resolve, 300));

  return MOCK_TEAMS;
}

/**
 * fetchTeamById
 * ---------------------------------------------------------------
 * Ek specific team ka pura data (projects + members ke saath)
 * uska `id` de kar laata hai. TeamDetails.jsx isi function ko
 * use karta hai.
 *
 * Jab backend ready ho, replace kar dena:
 *
 *   export async function fetchTeamById(teamId) {
 *     const res = await fetch(`/api/teams/${teamId}`);
 *     if (res.status === 404) return null;
 *     if (!res.ok) throw new Error("Failed to fetch team");
 *     return res.json();
 *   }
 *
 * Return shape: Team object, ya `null` agar team nahi mili.
 */
export async function fetchTeamById(teamId) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const team = MOCK_TEAMS.find((t) => t.id === teamId);
  return team ?? null;
}

/**
 * createTeam
 * ---------------------------------------------------------------
 * Abhi yeh sirf mock array me push karta hai (in-memory only —
 * refresh karne par gayab ho jayega).
 *
 * Jab backend ready ho, is function ke body ko replace kar dena:
 *
 *   export async function createTeam(team) {
 *     const res = await fetch("/api/teams", {
 *       method: "POST",
 *       headers: { "Content-Type": "application/json" },
 *       body: JSON.stringify(team),
 *     });
 *     if (!res.ok) throw new Error("Failed to create team");
 *     return res.json(); // backend se assigned real `id` wapas aayegi
 *   }
 *
 * Return shape hamesha ek single Team object honi chahiye.
 */
export async function createTeam(team) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const enrichedTeam = withDerivedFields({
    members: [],
    projects: [],
    ...team,
  });

  MOCK_TEAMS.unshift(enrichedTeam);
  return enrichedTeam;
}