
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import StudentsList from "./pages/students/StudentsList";
import AttendanceList from "./pages/attendance/AttendanceList";
import Task from "./pages/task/Task";
import Team from "./pages/TeamPage/Team";
import TeamDetails from "./pages/TeamPage/TeamDeatils";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<StudentsList />} />
          <Route path="attendance" element={<AttendanceList />} />
          <Route path="teams" element={<Team />} />
          <Route path="/team/:id" element={<TeamDetails />} />
          <Route path="tasks" element={<Task />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
