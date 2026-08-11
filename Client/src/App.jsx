
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import StudentsList from "./pages/students/StudentsList";
import StudentProfile from "./pages/students/StudentProfile";
import AttendanceList from "./pages/attendance/AttendanceList";
import Task from "./pages/task/Task";
import TeamsPage from "./pages/TeamPage/Team";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<StudentsList />} />
          <Route path="students/:id" element={<StudentProfile />} />
          <Route path="attendance" element={<AttendanceList />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="/team/:id" element={<div className="p-6 text-sm text-text">Team details will open here.</div>} />
          <Route path="tasks" element={<Task />} />

        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
