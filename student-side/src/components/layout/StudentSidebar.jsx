import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "../../constants/navigation";
import { useAuth } from "../../hooks/useAuth";
import { LogOut, GraduationCap } from "lucide-react";

export const StudentSidebar = ({ collapsed }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-logo">
        <img src="/smit-logo.png" alt="SMIT" className="sidebar-smit-logo" />
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
              title={collapsed ? item.title : undefined}
            >
              <Icon className="w-5 h-5" />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <button className="nav-item nav-logout w-full text-left" onClick={handleLogout}>
          <LogOut className="w-5 h-5" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};
