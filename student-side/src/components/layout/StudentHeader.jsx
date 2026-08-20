import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { ChevronLeft, ChevronRight, Bell, CheckCircle2, Info, BookOpen } from "lucide-react";

const MOCK_NOTIFS = [
  { id: 1, title: "New Assignment", desc: "Build REST API endpoints", time: "10m ago", read: false, type: "task" },
  { id: 2, title: "Attendance Update", desc: "Your attendance rate is 92%", time: "2h ago", read: true, type: "system" },
  { id: 3, title: "Grade Posted", desc: "React Basics Quiz scored", time: "1d ago", read: true, type: "grade" },
];

export const StudentHeader = ({ onToggleSidebar, title, collapsed }) => {
  const { user } = useAuth();
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifs, setNotifs] = useState(MOCK_NOTIFS);
  const dropdownRef = useRef(null);

  // Helper to get initials
  const getInitials = (name) => {
    if (!name) return "ST";
    const parts = name.split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifs(false);
      }
    };
    if (showNotifs) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifs]);

  const unreadCount = notifs.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  };

  const getIconForType = (type) => {
    switch(type) {
      case 'task': return <BookOpen className="w-4 h-4 text-accent" />;
      case 'grade': return <CheckCircle2 className="w-4 h-4 text-success" />;
      default: return <Info className="w-4 h-4 text-text-muted" />;
    }
  };

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button
          className="sidebar-toggle-btn"
          aria-label="Toggle sidebar"
          onClick={onToggleSidebar}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
        <h2 className="topbar-title">{title}</h2>
        
        <div className="topbar-actions">
          {/* Notifications Wrapper */}
          <div className="relative" ref={dropdownRef} style={{ position: "relative" }}>
            <button 
              className="topbar-icon-btn" 
              aria-label="Notifications"
              onClick={() => setShowNotifs(!showNotifs)}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && <span className="notif-dot"></span>}
            </button>

            {showNotifs && (
              <div className="notif-dropdown">
                <div className="notif-header">
                  <span className="notif-title">Notifications</span>
                  {unreadCount > 0 && (
                    <button className="notif-clear-btn" onClick={handleMarkAllRead}>
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="notif-body">
                  {notifs.length === 0 ? (
                    <div className="notif-empty">You're all caught up!</div>
                  ) : (
                    notifs.map(n => (
                      <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`}>
                        <div className="notif-icon-wrap">
                          {getIconForType(n.type)}
                        </div>
                        <div className="notif-content">
                          <div className="notif-item-title">
                            {!n.read && <span className="unread-dot"></span>}
                            {n.title}
                          </div>
                          <div className="notif-item-desc">{n.desc}</div>
                          <div className="notif-item-time">{n.time}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div
            className="hidden sm:block"
            style={{
              fontSize: "12px",
              background: "var(--bg)",
              padding: ".2rem .6rem",
              borderRadius: "var(--radius-pill)",
              border: "1px solid var(--border)",
              color: "var(--text-muted)",
              fontWeight: 500,
            }}
          >
            Batch {user?.batch || "11"}
          </div>
          <button className="topbar-avatar" aria-label="Go to profile">
            {getInitials(user?.name)}
          </button>
        </div>
      </div>
    </header>
  );
};
