import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  UsersRound,
  ClipboardList,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Students", icon: Users },
  { label: "Attendance", icon: CalendarDays },
  { label: "Teams", icon: UsersRound },
  { label: "Tasks", icon: ClipboardList },
];

export default function SideNavBar() {
  const [active, setActive] = useState("Dashboard");

  return (
    <aside className="flex h-screen w-64 flex-col bg-primary text-slate-200">
      {/* Brand */}
      <div className="px-6 pb-6 pt-7">
        <h1 className="text-lg font-bold leading-tight text-white">
          Bootcamp LMS
        </h1>
        <p className="mt-1 text-sm text-slate-300">Administrator Console</p>
      </div>

      {/* Nav items */}
      <nav className="flex-1">
        <ul>
          {NAV_ITEMS.map(({ label, icon: Icon }) => {
            const isActive = active === label;
            return (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => setActive(label)}
                  className={[
                    "group relative flex w-full items-center gap-3 border-l-4 py-3 pl-5 pr-4 text-left text-sm transition-colors duration-150",
                    isActive
                      ? "border-emerald-400 bg-slate-800/60 text-emerald-400 font-medium"
                      : "border-transparent text-slate-300 hover:bg-slate-800/30 hover:text-slate-100",
                  ].join(" ")}
                >
                  <Icon
                    size={18}
                    strokeWidth={2}
                    className={
                      isActive
                        ? "text-emerald-400"
                        : "text-slate-300 group-hover:text-slate-100"
                    }
                  />
                  <span>{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="px-2 pb-6">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-sm text-slate-300 transition-colors duration-150 hover:bg-slate-800/30 hover:text-slate-100"
        >
          <LogOut size={18} strokeWidth={2} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
