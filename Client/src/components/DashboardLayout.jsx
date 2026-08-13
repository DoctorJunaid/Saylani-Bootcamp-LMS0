import { Outlet, useLocation } from "react-router-dom";
import { Plus, CalendarCheck, UsersRound, ClipboardList } from "lucide-react";
import SideNavBar from "./sideNavbar";
import TopBar from "./TopBar";

// Shared "Coming soon" notification array – you can replace per page later
const comingSoonNotif = [
  {
    id: "coming-soon",
    title: "Coming soon",
    description: "Notification features are under development.",
    time: "Just now",
  },
];

const topBarConfig = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Overview of your bootcamp",
    showNotification: true,
    showButton: false,
    notifications: comingSoonNotif,
  },
  "/students": {
    title: "Students",
    subtitle: "Manage all enrolled students",
    showNotification: true,
    showButton: true,
    buttonText: "Add Student",
    buttonIcon: Plus,
    onButtonClick: () => window.dispatchEvent(new CustomEvent('openAddStudent')),
    notifications: comingSoonNotif,
  },
  "/attendance": {
    title: "Attendance",
    subtitle: "Track daily attendance records",
    showNotification: true,
    showButton: true,
    buttonText: "Take Attendance",
    buttonIcon: CalendarCheck,
    onButtonClick: () => window.dispatchEvent(new CustomEvent('openTakeAttendance')),
    notifications: comingSoonNotif,
  },
  "/teams": {
    title: "Teams",
    subtitle: "View and manage project teams",
    showNotification: false,   // bell hidden on Teams page
    showButton: true,
    buttonText: "Create Team",
    buttonIcon: UsersRound,
    onButtonClick: () => window.dispatchEvent(new CustomEvent("openCreateTeamModal")),
    notifications: comingSoonNotif,
  },
  "/tasks": {
    title: "Tasks",
    subtitle: "Assign and review student tasks",
    showNotification: true,
    showButton: true,
    buttonText: "New Task",
    buttonIcon: ClipboardList,
    onButtonClick: () => alert("New Task clicked"),
    notifications: comingSoonNotif,
  },
  // Add more routes if you want custom top bar for new pages:
  // "/projects": { ... },
  // "/students/:id" is tricky because of dynamic param, but fallback will handle it
};

export default function DashboardLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  const config = topBarConfig[currentPath] ||
    (currentPath.startsWith("/team") ? topBarConfig["/teams"] : null) || {
      title: "Bootcamp LMS",
      subtitle: "",
      showNotification: false,
      showButton: false,
      notifications: [],
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
          notifications={config.notifications || []}
        />
        <main className="flex-1 overflow-auto bg-[var(--color-background)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}