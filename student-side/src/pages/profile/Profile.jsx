import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useOutletContext } from "react-router-dom";
import { ChangePasswordModal } from "../../components/profile/ChangePasswordModal";
import { Mail, Phone, ExternalLink } from "lucide-react";

export const Profile = () => {
  const { user, logout } = useAuth();
  const { setPageTitle } = useOutletContext();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    setPageTitle("Profile");
  }, [setPageTitle]);

  const getInitials = (name) => {
    if (!name) return "ST";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out of all devices?")) {
      logout();
    }
  };

  return (
    <div className="inner-page active fade-in">
      <div className="page-header-row">
        <div>
          <h1 className="page-headline">My Profile</h1>
          <p className="page-sub">Saylani SMIT Bootcamp · Student Account</p>
        </div>
        <button className="btn-outline" onClick={() => setIsPasswordModalOpen(true)}>
          🔑 Change Password
        </button>
      </div>

      <div className="profile-cover">
        <div className="profile-cover-smit">
          <img src="/smit-logo.png" alt="SMIT" className="profile-cover-logo" />
        </div>
        <div className="profile-header-row">
          <div className="profile-avatar-lg">{getInitials(user?.name || "Student")}</div>
          <div className="profile-identity">
            <h2 className="profile-name">{user?.name || "Muhammad Junaid"}</h2>
            <p className="profile-meta">
              {user?.course || "MERN Stack Development"} · Batch {user?.batch || "11"} · Roll No. {user?.rollNumber || "100234"}
            </p>
            <p className="profile-meta" style={{ opacity: 0.8, fontSize: "13.5px" }}>
              {user?.email || "junaid@bootcamp.dev"} · 🟢 Active Student
            </p>
          </div>
        </div>
      </div>

      <div className="stat-row profile-stats">
        <div className="stat-card big">
          <span className="stat-label">Attendance</span>
          <span className="stat-number huge">92%</span>
          <span className="stat-trend up">Safe · 23 of 25 classes</span>
        </div>
        <div className="stat-card big">
          <span className="stat-label">Tasks Done</span>
          <span className="stat-number huge">14</span>
          <span className="stat-trend neutral">This semester</span>
        </div>
        <div className="stat-card big">
          <span className="stat-label">Active Projects</span>
          <span className="stat-number huge">2</span>
          <span className="stat-trend neutral">In progress</span>
        </div>
        <div className="stat-card big">
          <span className="stat-label">Team</span>
          <span className="stat-number huge" style={{ fontSize: "1.4rem" }}>Alpha Coders</span>
          <span className="stat-trend neutral">Batch 11 · Team A</span>
        </div>
      </div>

      <div className="tab-bar">
        <button 
          className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          About
        </button>
        <button 
          className={`tab-btn ${activeTab === 'academic' ? 'active' : ''}`}
          onClick={() => setActiveTab('academic')}
        >
          Academic
        </button>
        <button 
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      {activeTab === 'about' && (
        <div className="profile-tab active card" style={{ marginTop: "1rem", padding: "1.75rem" }}>
          <div className="about-grid">
            <div>
              <h4 className="about-section-title">Bio</h4>
              <p className="about-bio">
                Full stack developer passionate about building clean, scalable web applications.
                Currently learning {user?.course || "MERN Stack"} at Saylani SMIT Bootcamp, Batch {user?.batch || "11"}.
              </p>
            </div>
            <div>
              <h4 className="about-section-title">Contact</h4>
              <div className="contact-list">
                <div className="contact-item">
                  <Mail className="w-4 h-4 text-[var(--accent)]" />
                  {user?.email || "junaid@bootcamp.dev"}
                </div>
                <div className="contact-item">
                  <Phone className="w-4 h-4 text-[var(--accent)]" />
                  +92-300-1234567
                </div>
              </div>
            </div>
            <div>
              <h4 className="about-section-title">Skills</h4>
              <div className="skills-wrap">
                <span className="tag tag-green">Node.js</span>
                <span className="tag tag-green">React</span>
                <span className="tag tag-green">MongoDB</span>
                <span className="tag tag-clay">Express</span>
                <span className="tag tag-clay">REST APIs</span>
                <span className="tag tag-amber">JWT Auth</span>
              </div>
            </div>
            <div>
              <h4 className="about-section-title">Links</h4>
              <div className="contact-list">
                <a href="#" className="contact-item hover:text-[var(--accent)] transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  github.com/DoctorJunaid
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'academic' && (
        <div className="profile-tab active card" style={{ marginTop: "1rem", padding: "1.75rem" }}>
          <div className="academic-grid">
            <div className="academic-item">
              <span className="academic-label">Course</span>
              <span className="academic-val">{user?.course || "MERN Stack Development"}</span>
            </div>
            <div className="academic-item">
              <span className="academic-label">Batch</span>
              <span className="academic-val">Batch {user?.batch || "11"} (2026)</span>
            </div>
            <div className="academic-item">
              <span className="academic-label">Roll Number</span>
              <span className="academic-val font-mono">{user?.rollNumber || "100234"}</span>
            </div>
            <div className="academic-item">
              <span className="academic-label">Overall Attendance</span>
              <span className="academic-val">92% — <span className="tag tag-green" style={{ display: "inline" }}>Safe</span></span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="profile-tab active card" style={{ marginTop: "1rem", padding: "1.75rem" }}>
          <div className="settings-list">
            <div className="settings-row">
              <div className="settings-label-group">
                <span className="settings-label">Email Notifications</span>
                <span className="settings-desc">Get emailed when tasks are assigned</span>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-track"><span className="toggle-thumb"></span></span>
              </label>
            </div>
            <div className="settings-row">
              <div className="settings-label-group">
                <span className="settings-label">Attendance Alerts</span>
                <span className="settings-desc">Notify when attendance drops below 80%</span>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-track"><span className="toggle-thumb"></span></span>
              </label>
            </div>
            <div className="settings-row">
              <div className="settings-label-group">
                <span className="settings-label">Team Activity Feed</span>
                <span className="settings-desc">Show team updates in your dashboard</span>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="toggle-track"><span className="toggle-thumb"></span></span>
              </label>
            </div>
          </div>

          <div className="danger-zone">
            <button className="danger-link" onClick={handleLogout}>Log out of all devices</button>
            <span className="danger-sep">·</span>
            <button className="danger-link delete">Delete account</button>
          </div>
        </div>
      )}

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
};
