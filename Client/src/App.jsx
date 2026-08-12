
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import StudentsList from "./pages/students/StudentsList";
import StudentProfile from "./pages/students/StudentProfile";
import AttendanceList from "./pages/attendance/AttendanceList";
import Task from "./pages/task/Task";
import TeamsPage from "./pages/TeamPage/Team";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Root path -> seedha login pe bhejo */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<StudentsList />} />
          <Route path="students/:id" element={<StudentProfile />} />
          <Route path="attendance" element={<AttendanceList />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="tasks" element={<Task />} />

        </Route>

        {/* Koi bhi unknown route bhi login pe bhejo */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
