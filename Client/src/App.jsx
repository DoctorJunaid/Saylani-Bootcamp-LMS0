import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentsList from "./pages/students/StudentsList";
import AttendanceList from "./pages/attendance/AttendanceList";
import Task from "./pages/task/Task";
import Team from '../src/pages/TeamPage/Team'

function App() {
  return (
    <>
      <SideNavBar />
    <BrowserRouter>
      <Routes>
        {/* We use DashboardLayout to wrap the modules */}
        <Route path="/">
          {/* Redirect the base URL to /students since the dashboard is out of scope */}
          <Route index element={<Navigate to="/students" replace />} />
          <Route path="students" element={<StudentsList />} />
          <Route path="attendance" element={<AttendanceList />} />
          <Route path="task" element={<Task />} />
          <Route path="team" element={<Team />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

</>)}
export default App;
