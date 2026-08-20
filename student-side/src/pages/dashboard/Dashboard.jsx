import React, { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { tasksService } from "../../services/tasks.service";

export const Dashboard = () => {
  const { user } = useAuth();
  const { setPageTitle } = useOutletContext();
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);

  useEffect(() => {
    setPageTitle("Dashboard");
    loadDashboardData();
  }, [setPageTitle]);

  const loadDashboardData = async () => {
    try {
      const allTasks = await tasksService.getTasks();
      const pending = allTasks
        .filter((t) => t.status !== "completed")
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 3);
      setUpcomingTasks(pending);
    } catch (err) {
      // Silently fail — dashboard should still render
      console.warn("Could not load tasks for dashboard:", err);
    } finally {
      setLoadingTasks(false);
    }
  };

  const attendanceRate = 92;
  const tasksDue = upcomingTasks.length;

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'short', day: 'numeric'
  });

  return (
    <div className="inner-page active fade-in">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-text">
          <p className="welcome-greeting">Good morning, Student 👋</p>
          <h1 className="welcome-name">{user?.name || "Muhammad Junaid"}</h1>
          <p className="welcome-summary">
            Batch {user?.batch || "11"} · {user?.course || "MERN Stack Development"} · Roll No. <span className="mono-inline">{user?.rollNumber || "100234"}</span>
          </p>
          <p className="welcome-summary" style={{ marginTop: ".3rem" }}>
            {tasksDue} tasks pending &mdash; <span className="accent-text">{attendanceRate}% attendance</span> this month · <span style={{ color: "var(--success)" }}>On track 🟢</span>
          </p>
        </div>
        <div className="welcome-meta">
          <div className="welcome-date">
            <span className="welcome-day">{new Date().getDate()}</span>
            <span className="welcome-date-text">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short' })}
            </span>
          </div>
          <div className="welcome-tags">
            <span className="wtag">MERN Stack</span>
            <span className="wtag">Batch {user?.batch || "11"}</span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stat-row">
        <div className="stat-card big">
          <span className="stat-label">Attendance Rate</span>
          <span className="stat-number huge">{attendanceRate}%</span>
          <span className="stat-trend up">Safe · Above 75% minimum</span>
        </div>
        <div className="stat-card big">
          <span className="stat-label">Pending Assignments</span>
          <span className="stat-number huge">{tasksDue}</span>
          <span className="stat-trend warn">{tasksDue > 0 ? "Due this week" : "All caught up 🎉"}</span>
        </div>
        <div className="stat-card big">
          <span className="stat-label">Active Projects</span>
          <span className="stat-number huge">2</span>
          <span className="stat-trend neutral">In progress</span>
        </div>
        <div className="stat-card big">
          <span className="stat-label">Team Members</span>
          <span className="stat-number huge">5</span>
          <span className="stat-trend neutral">Alpha Coders</span>
        </div>
      </div>

      {/* Two-Column Grid */}
      <div className="dashboard-grid">
        <div className="dashboard-col-main">
          {/* Today's Schedule */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Today's Schedule</h3>
              <span className="card-badge">{todayStr}</span>
            </div>
            <div className="schedule-timeline">
              <div className="schedule-item">
                <span className="schedule-time">09:00</span>
                <div className="schedule-dot active"></div>
                <div>
                  <span className="schedule-class">MERN Stack Development</span>
                  <span className="schedule-room">Room 3-B · 2h</span>
                </div>
              </div>
              <div className="schedule-item">
                <span className="schedule-time">11:30</span>
                <div className="schedule-dot"></div>
                <div>
                  <span className="schedule-class">Project Review Session</span>
                  <span className="schedule-room">Room 1-A · 1h</span>
                </div>
              </div>
              <div className="schedule-item">
                <span className="schedule-time">14:00</span>
                <div className="schedule-dot"></div>
                <div>
                  <span className="schedule-class">Team Standup</span>
                  <span className="schedule-room">Lab 2 · 30m</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="card" style={{ marginTop: "1.5rem" }}>
            <div className="card-header">
              <h3 className="card-title">Upcoming Tasks</h3>
              <Link to="/tasks" className="card-link">View all →</Link>
            </div>
            <div className="task-checklist">
              {loadingTasks ? (
                <div style={{ padding: "1.5rem", textAlign: "center", color: "var(--text-muted)", fontSize: "13px" }}>Loading...</div>
              ) : upcomingTasks.length > 0 ? (
                upcomingTasks.map(task => (
                  <div className="task-row" key={task._id}>
                    <div className="task-info">
                      <span className="task-name">{task.title}</span>
                      <div className="task-meta">
                        <span className={`tag tag-${task.category === 'Design' ? 'clay' : 'green'}`}>{task.category}</span>
                        <span className="task-due">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: "1.5rem", textAlign: "center", color: "var(--text-muted)", fontSize: "13px" }}>No upcoming tasks! 🎉</div>
              )}
            </div>
          </div>
        </div>

        <div className="dashboard-col-side">
          {/* Attendance Ring */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Attendance</h3>
              <Link to="/attendance" className="card-link">Details →</Link>
            </div>
            <div className="attendance-ring-wrap">
              <svg className="attendance-ring" viewBox="0 0 120 120" width="120" height="120">
                <circle className="ring-bg" cx="60" cy="60" r="50" />
                <circle className="ring-fill" cx="60" cy="60" r="50" strokeDasharray="314" strokeDashoffset={314 - (314 * attendanceRate) / 100} />
                <text className="ring-text" x="60" y="65" textAnchor="middle">{attendanceRate}%</text>
              </svg>
              <div className="ring-legend">
                <div className="legend-item"><span className="legend-dot present"></span> Present <b>23</b></div>
                <div className="legend-item"><span className="legend-dot absent"></span> Absent <b>2</b></div>
              </div>
            </div>
          </div>

          {/* Team Activity */}
          <div className="card" style={{ marginTop: "1.5rem" }}>
            <div className="card-header">
              <h3 className="card-title">Team Activity</h3>
              <Link to="/team" className="card-link">View Hub →</Link>
            </div>
            <div className="activity-feed">
              <div className="activity-item">
                <div className="activity-avatar">SA</div>
                <div className="activity-body">
                  <span className="activity-text"><b>Sana</b> pushed 3 commits</span>
                  <span className="activity-time">12m ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-avatar">BA</div>
                <div className="activity-body">
                  <span className="activity-text"><b>Bahadar</b> completed "Team Page UI"</span>
                  <span className="activity-time">1h ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/tasks" className="quick-pill" style={{ textDecoration: 'none' }}>📝 View Assignments</Link>
        <Link to="/attendance" className="quick-pill" style={{ textDecoration: 'none' }}>📅 My Attendance</Link>
        <Link to="/project" className="quick-pill" style={{ textDecoration: 'none' }}>🚀 Active Projects</Link>
        <Link to="/team" className="quick-pill" style={{ textDecoration: 'none' }}>👥 Team Hub</Link>
      </div>
    </div>
  );
};
