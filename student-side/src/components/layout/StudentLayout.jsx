import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { StudentSidebar } from "./StudentSidebar";
import { StudentHeader } from "./StudentHeader";

export const StudentLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  // Optional: keep track of current page title for the header, or handle it in the header component
  const [pageTitle, setPageTitle] = useState("Dashboard");

  return (
    <div className="app-shell">
      <StudentSidebar collapsed={collapsed} />

      <div className="main-wrap">
        <StudentHeader
          title={pageTitle}
          collapsed={collapsed}
          onToggleSidebar={() => setCollapsed(!collapsed)}
        />

        <main className="content-area">
          <Outlet context={{ setPageTitle }} />
        </main>
      </div>
    </div>
  );
};
