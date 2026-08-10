import { Outlet, useLocation } from "react-router-dom";
import { Plus, CalendarCheck, UsersRound, ClipboardList } from "lucide-react";
import SideNavBar from "./sideNavbar";
import TopBar from "./TopBar";

const topBarConfig = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Overview of your bootcamp",
    showNotification: true,
    showButton: false,
  },
  "/students": {
    title: "Students",
    subtitle: "Manage all enrolled students",
    showNotification: true,
    showButton: true,
    buttonText: "Add Student",
    buttonIcon: Plus,
    onButtonClick: () => alert("Add Student clicked"),
  },
  "/attendance": {
    title: "Attendance",
    subtitle: "Track daily attendance records",
    showNotification: true,
    showButton: true,
    buttonText: "Take Attendance",
    buttonIcon: CalendarCheck,
    onButtonClick: () => window.dispatchEvent(new CustomEvent('openTakeAttendance')),
  },
  "/teams": {
    title: "Teams",
    subtitle: "View and manage project teams",
    showNotification: false,
    showButton: true,
    buttonText: "Create Team",
    buttonIcon: UsersRound,
    onButtonClick: () => alert("Create Team clicked"),
  },
  "/tasks": {
    title: "Tasks",
    subtitle: "Assign and review student tasks",
    showNotification: true,
    showButton: true,
    buttonText: "New Task",
    buttonIcon: ClipboardList,
    onButtonClick: () => alert("New Task clicked"),
  },
};

export default function DashboardLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  const config = topBarConfig[currentPath] || {
    title: "Bootcamp LMS",
    subtitle: "",
    showNotification: false,
    showButton: false,
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SideNavBar />
      <div className="flex flex-1 flex-col overflow-auto">
        <TopBar
          title={config.title}
          subtitle={config.subtitle}
          showNotification={config.showNotification}
          onNotificationClick={() => console.log("Notification clicked")}
          showButton={config.showButton}
          buttonText={config.buttonText}
          buttonIcon={config.buttonIcon}
          onButtonClick={config.onButtonClick}
        />
        <main className="flex-1 overflow-auto bg-[var(--color-background)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}