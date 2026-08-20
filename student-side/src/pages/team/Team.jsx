import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export const Team = () => {
  const { setPageTitle } = useOutletContext();

  useEffect(() => {
    setPageTitle("Team");
  }, [setPageTitle]);

  return (
    <div className="inner-page active fade-in">
      <div className="page-header-row">
        <div>
          <h1 className="page-headline">Alpha Coders</h1>
          <p className="page-sub">
            Team A · Batch 11 · MERN Stack Development
          </p>
        </div>
        {/* Removed "+ Invite Member" — students cannot invite */}
      </div>

      <div className="team-grid">
        {/* You */}
        <div className="team-member-card card you-card">
          <div className="tm-avatar you">MJ</div>
          <div className="tm-info">
            <span className="tm-name">Muhammad Junaid <span className="you-chip">You</span></span>
            <span className="tm-role">💻 Full Stack Developer</span>
          </div>
          <div className="tm-status"><span className="status-dot online"></span><span>Online</span></div>
          <div className="tm-actions">
            <button className="icon-btn" title="Message">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Sana */}
        <div className="team-member-card card">
          <div className="tm-avatar" style={{ background: "var(--accent-lite)", color: "var(--accent)" }}>SA</div>
          <div className="tm-info">
            <span className="tm-name">Sana Ullah</span>
            <span className="tm-role">⚙️ Team Lead & Backend</span>
          </div>
          <div className="tm-status"><span className="status-dot online"></span><span>Online</span></div>
          <div className="tm-actions">
            <button className="icon-btn" title="Message">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bahadar */}
        <div className="team-member-card card">
          <div className="tm-avatar" style={{ background: "#e8d5c4", color: "#6b4c2a" }}>BA</div>
          <div className="tm-info">
            <span className="tm-name">Bahadar Ali</span>
            <span className="tm-role">🎨 Frontend Developer</span>
          </div>
          <div className="tm-status"><span className="status-dot away"></span><span>Away</span></div>
          <div className="tm-actions">
            <button className="icon-btn" title="Message">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Shayan */}
        <div className="team-member-card card">
          <div className="tm-avatar" style={{ background: "#d4e4d4", color: "#2d5a2d" }}>SH</div>
          <div className="tm-info">
            <span className="tm-name">Shayan Ahmad</span>
            <span className="tm-role">🎨 Frontend Developer</span>
          </div>
          <div className="tm-status"><span className="status-dot offline"></span><span>Offline</span></div>
          <div className="tm-actions">
            <button className="icon-btn" title="Message">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Idrees */}
        <div className="team-member-card card">
          <div className="tm-avatar" style={{ background: "#f0ddd4", color: "#8b3a1f" }}>ID</div>
          <div className="tm-info">
            <span className="tm-name">Idrees Ud Din</span>
            <span className="tm-role">🎨 Frontend Developer</span>
          </div>
          <div className="tm-status"><span className="status-dot online"></span><span>Online</span></div>
          <div className="tm-actions">
            <button className="icon-btn" title="Message">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Team Activity Feed */}
      <div className="card" style={{ marginTop: "1.5rem" }}>
        <div className="card-header">
          <h3 className="card-title">Team Activity</h3>
        </div>
        <div className="activity-feed">
          <div className="activity-item">
            <div className="activity-avatar">SA</div>
            <div className="activity-body">
              <span className="activity-text"><b>Sana Ullah</b> pushed 3 commits to main branch</span>
              <span className="activity-time">12 minutes ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-avatar" style={{ background: "#e8d5c4", color: "#6b4c2a" }}>BA</div>
            <div className="activity-body">
              <span className="activity-text"><b>Bahadar Ali</b> completed task "Team Page UI Design"</span>
              <span className="activity-time">1 hour ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-avatar" style={{ background: "#d4e4d4", color: "#2d5a2d" }}>SH</div>
            <div className="activity-body">
              <span className="activity-text"><b>Shayan Ahmad</b> opened pull request #14</span>
              <span className="activity-time">3 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-avatar you">MJ</div>
            <div className="activity-body">
              <span className="activity-text"><b>You</b> merged pull request #13 — "Attendance API"</span>
              <span className="activity-time">Yesterday</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
