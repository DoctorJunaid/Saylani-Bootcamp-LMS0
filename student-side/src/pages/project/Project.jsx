import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const MOCK_PROJECTS = [
  {
    id: "proj-1",
    title: "Saylani Bootcamp LMS",
    description: "Full-stack Learning Management System for Saylani bootcamp — attendance, teams, tasks.",
    longDescription: "Full-stack Learning Management System built for Saylani SMIT bootcamp. Includes student registration, attendance tracking, team formation, task assignment, and project monitoring.",
    category: "MERN Stack",
    progress: 65,
    startDate: "2026-07-01",
    dueDate: "2026-09-15",
    course: "MERN Stack Development",
    status: "In Progress",
    thumbGradient: "linear-gradient(135deg,#d8ead2,#a8c8a0)",
    tagClass: "tag-green",
    barColor: "var(--accent)",
    team: [
      { init: "SA", name: "Sana Ullah" },
      { init: "MJ", name: "Muhammad Junaid" },
      { init: "BA", name: "Bahadar Ali" },
      { init: "SH", name: "Shayan Ahmad" }
    ],
    milestones: [
      { name: "Backend API Architecture", done: true },
      { name: "Admin Authentication", done: true },
      { name: "Student Portal", active: true },
      { name: "Deployment & Testing", done: false }
    ]
  },
  {
    id: "proj-2",
    title: "Personal Portfolio",
    description: "Minimalist developer portfolio showcasing projects, skills, and work experience.",
    longDescription: "A statically generated Next.js portfolio leveraging Tailwind CSS and Framer Motion for micro-interactions. Includes a headless CMS for blog posts.",
    category: "UI/UX",
    progress: 30,
    startDate: "2026-08-01",
    dueDate: "2026-10-01",
    course: "UI/UX Design",
    status: "In Progress",
    thumbGradient: "linear-gradient(135deg,#f0e4d4,#e0c8b0)",
    tagClass: "tag-clay",
    barColor: "var(--clay)",
    team: [
      { init: "MJ", name: "Muhammad Junaid" }
    ],
    milestones: [
      { name: "Design System & Wireframes", done: true },
      { name: "Homepage & Routing", active: true },
      { name: "Blog CMS Integration", done: false },
      { name: "Deployment", done: false }
    ]
  }
];

export const Project = () => {
  const { setPageTitle } = useOutletContext();
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeDetailTab, setActiveDetailTab] = useState("overview");

  useEffect(() => {
    setPageTitle("Projects");
  }, [setPageTitle]);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setActiveDetailTab("overview");
  };

  const handleBack = () => {
    setSelectedProject(null);
  };

  // ─── PROJECT DETAIL VIEW (inline, replaces the grid) ───
  if (selectedProject) {
    return (
      <div className="inner-page active fade-in">
        <button className="back-btn" onClick={handleBack}>← Back to Projects</button>

        <div className="project-detail-header">
          <div>
            <h2 className="project-detail-title">{selectedProject.title}</h2>
            <div style={{ display: "flex", gap: ".5rem", alignItems: "center", marginTop: ".5rem" }}>
              <span className={`tag ${selectedProject.tagClass}`}>{selectedProject.category}</span>
              <span className="tag tag-amber">{selectedProject.status}</span>
            </div>
          </div>
        </div>

        <div className="project-detail-progress">
          <span className="pd-pct-label">{selectedProject.progress}% complete</span>
          <div className="progress-bar-wrap" style={{ marginTop: ".5rem" }}>
            <div className="progress-bar" style={{ "--pct": `${selectedProject.progress}%` }}></div>
          </div>
        </div>

        <div className="tab-bar" style={{ marginTop: "1.5rem" }}>
          <button
            className={`tab-btn ${activeDetailTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveDetailTab("overview")}
          >Overview</button>
          <button
            className={`tab-btn ${activeDetailTab === "team" ? "active" : ""}`}
            onClick={() => setActiveDetailTab("team")}
          >Team</button>
          <button
            className={`tab-btn ${activeDetailTab === "activity" ? "active" : ""}`}
            onClick={() => setActiveDetailTab("activity")}
          >Activity</button>
        </div>

        {/* Overview Tab */}
        {activeDetailTab === "overview" && (
          <div className="card" style={{ marginTop: "1rem", padding: "1.75rem" }}>
            <p className="detail-desc">{selectedProject.longDescription}</p>

            <div className="detail-dates">
              <div className="detail-date-item">
                <span className="detail-date-label">Start Date</span>
                <span className="detail-date-val">
                  {new Date(selectedProject.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <div className="detail-date-item">
                <span className="detail-date-label">Due Date</span>
                <span className="detail-date-val">
                  {new Date(selectedProject.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <div className="detail-date-item">
                <span className="detail-date-label">Course</span>
                <span className="detail-date-val">{selectedProject.course}</span>
              </div>
            </div>

            <div className="milestone-list">
              {selectedProject.milestones.map((m, idx) => (
                <div key={idx} className={`milestone-item ${m.done ? 'done' : ''} ${m.active ? 'active' : ''}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    {m.done && <path d="m9 12 2 2 4-4" />}
                  </svg>
                  {m.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeDetailTab === "team" && (
          <div className="card" style={{ marginTop: "1rem", padding: "1.75rem" }}>
            <div className="team-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
              {selectedProject.team.map((member, idx) => (
                <div key={idx} className="team-member-card card" style={{ padding: "1.25rem" }}>
                  <div className="tm-avatar">{member.init}</div>
                  <div className="tm-info">
                    <span className="tm-name">{member.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeDetailTab === "activity" && (
          <div className="card" style={{ marginTop: "1rem", padding: "1.75rem" }}>
            <div className="activity-feed" style={{ padding: 0 }}>
              <div className="activity-item">
                <div className="activity-avatar">MJ</div>
                <div className="activity-body">
                  <span className="activity-text"><b>Muhammad Junaid</b> updated project progress to {selectedProject.progress}%</span>
                  <span className="activity-time">2 days ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-avatar">SA</div>
                <div className="activity-body">
                  <span className="activity-text"><b>Sana Ullah</b> completed milestone "Backend API Architecture"</span>
                  <span className="activity-time">1 week ago</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ─── PROJECT GRID VIEW (default) ───
  return (
    <div className="inner-page active fade-in">
      <div className="page-header-row">
        <div>
          <h1 className="page-headline">Projects</h1>
          <p className="page-sub">Track, build, and ship together</p>
        </div>
      </div>

      <div className="project-grid">
        {MOCK_PROJECTS.map((project) => (
          <div
            key={project.id}
            className="project-card card"
            onClick={() => handleCardClick(project)}
          >
            <div className="project-card-top">
              <div>
                <span className={`tag ${project.tagClass}`}>{project.category}</span>
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-desc">{project.description}</p>
              </div>
            </div>
            <div className="project-progress-row">
              <span className="project-pct">{project.progress}%</span>
              <div className="subject-bar-wrap" style={{ flex: 1, height: "6px", marginLeft: "10px" }}>
                <div className="subject-bar" style={{ width: `${project.progress}%`, background: project.barColor }}></div>
              </div>
            </div>
            <div className="project-card-bottom">
              <div className="avatar-stack">
                {project.team.map((member, idx) => (
                  <div key={idx} className="avatar xs stack-av" title={member.name}>{member.init}</div>
                ))}
              </div>
              <span className="project-due">Due {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
