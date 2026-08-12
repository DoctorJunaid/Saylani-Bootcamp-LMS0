import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  UsersRound,
  ClipboardList,
  LogOut,
  ChevronLeft,
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    tone: "text-primary",
  },
  { label: "Students", icon: Users, path: "/students", tone: "text-secondary" },
  {
    label: "Attendance",
    icon: CalendarDays,
    path: "/attendance",
    tone: "text-warning",
  },
  {
    label: "Teams",
    icon: UsersRound,
    path: "/teams",
    tone: "text-success",
  },
  {
    label: "Projects",
    icon: ClipboardList, // Using a generic icon for now, since we import it anyway
    path: "/projects",
    tone: "text-info", // Custom tone or just default, wait, I can use text-primary
  },
  { label: "Tasks", icon: ClipboardList, path: "/tasks", tone: "text-error" },
];

export default function SideNavBar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`relative flex h-screen flex-col border-r border-border bg-surface font-sans transition-all duration-normal ease-in-out ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo + collapse toggle */}
      <div
        className={`flex h-21 items-center border-b border-surface-high px-md transition-all duration-normal ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!collapsed && (
          <div className="flex items-center overflow-hidden">
            <img
              src="/logo.png"
              alt="SMIT logo"
              className="h-16 w-auto max-w-[160px] object-contain block transition-all duration-200"
            />
          </div>
        )}

        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-text-muted transition-colors duration-fast hover:bg-surface-low hover:text-text cursor-pointer"
        >
          <ChevronLeft
            size={18}
            strokeWidth={2}
            className={`transition-transform duration-normal ease-in-out ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-sm">
        <ul className="flex flex-col gap-xs px-sm">
          {NAV_ITEMS.map(({ label, icon: Icon, path, tone }) => (
            <li key={label} className="relative">
              <NavLink
                to={path}
                className={({ isActive }) =>
                  [
                    "group relative flex items-center rounded-lg py-2.5 text-sm transition-colors duration-fast",
                    collapsed ? "justify-center px-sm" : "gap-sm px-md",
                    isActive
                      ? "bg-primary-container/15 font-medium text-primary"
                      : "text-text-muted hover:bg-surface-low hover:text-text",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={20}
                      strokeWidth={2}
                      className={`shrink-0 ${isActive ? "text-primary" : tone}`}
                    />
                    {!collapsed ? (
                      <span className="whitespace-nowrap">{label}</span>
                    ) : (
                      <div className="pointer-events-none absolute left-full ml-3 hidden rounded-md bg-gray-900 px-2.5 py-1 text-xs font-medium text-white shadow-md group-hover:block z-50 whitespace-nowrap">
                        {label}
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-surface-high px-sm py-md">
        <Link
          to="/login"
          className={`group relative flex w-full items-center rounded-lg py-2.5 text-sm text-error transition-colors duration-fast hover:bg-error/10 ${
            collapsed ? "justify-center px-sm" : "gap-sm px-md"
          }`}
        >
          <LogOut size={20} strokeWidth={2} className="shrink-0" />
          {!collapsed ? (
            <span className="whitespace-nowrap">Logout</span>
          ) : (
            <div className="pointer-events-none absolute left-full ml-3 hidden rounded-md bg-gray-900 px-2.5 py-1 text-xs font-medium text-white shadow-md group-hover:block z-50 whitespace-nowrap">
              Logout
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
}
