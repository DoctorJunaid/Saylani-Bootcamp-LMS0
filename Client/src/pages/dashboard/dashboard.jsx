import React, { useState, useMemo, useEffect } from "react";
import {
  GraduationCap,
  UserCheck,
  UserX,
  Users,
  ClipboardList,
  Calendar,
  ClipboardCheck,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  UserCheck2,
  LogOut,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  getStudentData,
  getTeamData,
  getTaskData,
} from "../../api/axios";

// Initial student attendance data for today (with timestamps for top ordering)
const initialAttendanceData = [
  {
    id: 1,
    rollNo: "100238",
    name: "Fatima Noor",
    course: "Web & App Dev",
    checkIn: "09:00 AM",
    checkOut: "05:00 PM",
    status: "Present",
    lastUpdated: 1770735600000,
  },
  {
    id: 2,
    rollNo: "100236",
    name: "Sana Malik",
    course: "AI & Data Science",
    checkIn: "09:15 AM",
    checkOut: "04:45 PM",
    status: "Present",
    lastUpdated: 1770736500000,
  },
  {
    id: 3,
    rollNo: "100235",
    name: "Bilal Ahmed",
    course: "Graphic Design",
    checkIn: "09:30 AM",
    checkOut: "--",
    status: "--",
    lastUpdated: 1770737400000,
  },
  {
    id: 4,
    rollNo: "123456",
    name: "Ayesha Khan",
    course: "Web & App Dev",
    checkIn: "08:55 AM",
    checkOut: "05:00 PM",
    status: "Present",
    lastUpdated: 1770735300000,
  },
  {
    id: 5,
    rollNo: "100239",
    name: "Usman Tariq",
    course: "Cyber Security",
    checkIn: "--",
    checkOut: "--",
    status: "--",
    lastUpdated: 1770700000000,
  },
  {
    id: 6,
    rollNo: "100240",
    name: "Zainab Abbas",
    course: "UI/UX Design",
    checkIn: "09:10 AM",
    checkOut: "05:15 PM",
    status: "Present",
    lastUpdated: 1770736200000,
  },
  {
    id: 7,
    rollNo: "100241",
    name: "Ali Raza",
    course: "MERN Stack",
    checkIn: "08:45 AM",
    checkOut: "05:00 PM",
    status: "Present",
    lastUpdated: 1770734700000,
  },
  {
    id: 8,
    rollNo: "100242",
    name: "Hira Mani",
    course: "Graphic Design",
    checkIn: "09:40 AM",
    checkOut: "--",
    status: "Leave",
    lastUpdated: 1770738000000,
  },
];

const tasks = [
  {
    title: "Wireframe portfolio builder",
    student: "Fatima Noor",
    rollNumber: "100238",
    dueDate: "Jul 30, 2026",
    status: "Completed",
  },
  {
    title: "Clean patient dataset",
    student: "Sana Malik",
    rollNumber: "100236",
    dueDate: "Jul 31, 2026",
    status: "In Progress",
  },
  {
    title: "Setup Express API",
    student: "Bilal Ahmed",
    rollNumber: "100235",
    dueDate: "Aug 01, 2026",
    status: "Pending",
  },
  {
    title: "Build product listing page",
    student: "Ayesha Khan",
    rollNumber: "123456",
    dueDate: "Aug 02, 2026",
    status: "In Progress",
  },
  {
    title: "Design system tokens",
    student: "Usman Tariq",
    rollNumber: "100239",
    dueDate: "Aug 03, 2026",
    status: "In Progress",
  },
];

const taskStatusStyles = {
  Completed:
    " text-[var(--color-success)] border border-[var(--color-success)]/20",
  "In Progress":
    "text-[var(--color-warning)] border border-[var(--color-warning)]/20",
  Pending:
    "text-[var(--color-secondary)] border border-[var(--color-secondary)]/20",
};

// Helper for formatted time (e.g., 09:37 AM)
const getCurrentTimeString = () => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
};

function StatCard({ label, value, icon: Icon, tone }) {
  return (
    <div className="flex items-start justify-between rounded-[var(--radius-xl)] border border-[var(--color-surface-high)] bg-[var(--color-surface)] p-[var(--spacing-lg)] shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-normal)] hover:shadow-[var(--shadow-md)]">
      <div>
        <p className="text-sm font-medium text-[var(--color-text-muted)]">
          {label}
        </p>
        <p className="mt-[var(--spacing-xs)] text-2xl font-bold text-[var(--color-text)]">
          {value}
        </p>
      </div>
      <div className={`rounded-lg  ${tone}`}>
        <Icon size={22} strokeWidth={2} />
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  if (status === "Present") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-[var(--color-success)] border border-[var(--color-success)]/20">
        <CheckCircle2 size={13} /> Present
      </span>
    );
  }
  if (status === "--") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-[var(--color-text-muted)] border border-[var(--color-surface-high)]/80">
        --
      </span>
    );
  }
  if (status === "Absent") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-[var(--color-error)] border border-[var(--color-error)]/20">
        <XCircle size={13} /> Absent
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-[var(--color-warning)] border border-[var(--color-warning)]/20">
      <AlertCircle size={13} /> Leave
    </span>
  );
}

function TaskRow({ title, student, rollNumber, dueDate, status }) {
  return (
    <div className="-mx-[var(--spacing-sm)] flex items-center justify-between rounded-[var(--radius-md)] border-b border-[var(--color-surface-high)] px-[var(--spacing-sm)] py-[var(--spacing-md)] transition-colors duration-[var(--duration-fast)] last:border-b-0 hover:bg-[var(--color-surface-low)]">
      <div className="space-y-0.5">
        <p className="text-sm font-semibold text-[var(--color-text)]">
          {title}
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">
          {student} &middot; {rollNumber} &middot; due {dueDate}
        </p>
      </div>
      <span
        className={`whitespace-nowrap rounded-full px-[var(--spacing-md)] py-[var(--spacing-xs)] text-xs font-semibold ${taskStatusStyles[status]}`}
      >
        {status}
      </span>
    </div>
  );
}

export default function Dashboard() {
  const [attendanceData, setAttendanceData] = useState(initialAttendanceData);
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // student data api fetching
  const [students, setStudents] = useState({ students: [] });
  const [teams, setTeams] = useState([]);
  const [task, setTask] = useState([]);

  //total students count
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage.");
          return;
        }
        const data = await getStudentData(token);
        setStudents(data ?? { students: [] });
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
  }, []);

  //total teams count
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage.");
          return;
        }
        const data = await getTeamData(token);
        setTeams(data?.data ?? []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeams();
  }, []);

  //pending tasks count
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage.");
          return;
        }
        const data = await getTaskData(token);
        setTask(data?.data ?? []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  // Dynamically calculated stats from state
  const totalStudents = students?.students?.length ?? 0;
  const totalTeams = teams.length;
  const totalTasks = task.length;
  const totalPendingTasks = task.filter(t => t.status === "Pending").length;
  const presentCount = useMemo(
    () => attendanceData.filter((s) => s.status === "Present").length,
    [attendanceData],
  );
  const absentCount = useMemo(
    () => attendanceData.filter((s) => s.status === "Absent").length,
    [attendanceData],
  );

  const statCards = [
    {
      label: "Total Students",
      value: totalStudents,
      icon: GraduationCap,
      tone: "text-[var(--color-primary)]",
    },
    {
      label: "Present Today",
      value: presentCount,
      icon: UserCheck,
      tone: "text-[var(--color-success)]",
    },
    {
      label: "Absent Today",
      value: absentCount,
      icon: UserX,
      tone: "text-[var(--color-error)]",
    },
    {
      label: "Total Teams",
      value: totalTeams,
      icon: Users,
      tone: "text-[var(--color-primary)]",
    },
    {
      label: "Pending Tasks",
      value: totalPendingTasks,
      icon: ClipboardList,
      tone: "text-[var(--color-text)]",
    },
  ];

  // Filter & sort students (newest checked-in / updated students ALWAYS placed at the TOP)
  const filteredStudents = useMemo(() => {
    let list = [...attendanceData];
    // Sort by lastUpdated descending so newest items stay at the TOP
    list.sort((a, b) => (b.lastUpdated || 0) - (a.lastUpdated || 0));

    if (!searchQuery.trim()) return list;
    const query = searchQuery.toLowerCase().trim();
    return list.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.rollNo.toLowerCase().includes(query) ||
        s.course.toLowerCase().includes(query),
    );
  }, [attendanceData, searchQuery]);

  // Mark student Present & update timestamp (moves them to the TOP)
  const markStudentPresent = (studentId) => {
    const timeNowStr = getCurrentTimeString();
    const timestamp = Date.now();
    let alreadyPresent = false;

    setAttendanceData((prevData) =>
      prevData.map((student) => {
        if (student.id === studentId) {
          if (student.status === "Present") {
            alreadyPresent = true;
            return student;
          }

          setFeedbackMessage(
            `Marked "${student.name}" (${student.rollNo}) as Present at ${timeNowStr}!`,
          );
          setTimeout(() => setFeedbackMessage(""), 3500);
          return {
            ...student,
            status: "Present",
            checkIn: student.checkIn === "--" ? timeNowStr : student.checkIn,
            lastUpdated: timestamp,
          };
        }
        return student;
      }),
    );

    if (alreadyPresent) {
      setFeedbackMessage(
        "This student is already marked Present and cannot be marked again.",
      );
      setTimeout(() => setFeedbackMessage(""), 3000);
    }
  };

  // Mark student Check Out & update timestamp (moves them to the TOP)
  const markStudentCheckOut = (studentId) => {
    const timeNowStr = getCurrentTimeString();
    const timestamp = Date.now();
    let alreadyCheckedOut = false;

    setAttendanceData((prevData) =>
      prevData.map((student) => {
        if (student.id === studentId) {
          if (student.checkOut !== "--") {
            alreadyCheckedOut = true;
            return student;
          }

          setFeedbackMessage(
            `Checked out "${student.name}" (${student.rollNo}) at ${timeNowStr}!`,
          );
          setTimeout(() => setFeedbackMessage(""), 3500);
          return {
            ...student,
            checkOut: timeNowStr,
            lastUpdated: timestamp,
          };
        }
        return student;
      }),
    );

    if (alreadyCheckedOut) {
      setFeedbackMessage("This student has already been checked out.");
      setTimeout(() => setFeedbackMessage(""), 3000);
    }
  };

  // Shortcut for Search Bar: Mark the first non-present matching student as Present
  const handleShortcutMarkPresent = (e) => {
    if (e) e.preventDefault();
    const studentToMark = filteredStudents.find(
      (student) => student.status !== "Present",
    );
    if (studentToMark) {
      markStudentPresent(studentToMark.id);
    } else {
      setFeedbackMessage(
        "No student selected to mark Present. All visible students are already Present.",
      );
      setTimeout(() => setFeedbackMessage(""), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-[var(--spacing-lg)] font-plus-jakarta-sans p-[var(--spacing-lg)] max-w-full">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-[var(--spacing-md)] sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Main Grid Section: Today's Attendance Table + Task Summary */}
      <div className="grid grid-cols-1 gap-[var(--spacing-lg)] lg:grid-cols-3">
        {/* Today's Attendance Student List Card (Spans 2 columns on lg) */}
        <div className="flex flex-col gap-[var(--spacing-md)] rounded-[var(--radius-xl)] border border-[var(--color-surface-high)] bg-[var(--color-surface)] p-[var(--spacing-lg)] shadow-[var(--shadow-sm)] transition-shadow duration-[var(--duration-normal)] hover:shadow-[var(--shadow-md)] lg:col-span-2">
          {/* Section Header */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--color-surface-high)] pb-[var(--spacing-md)]">
            <div className="flex items-center gap-[var(--spacing-sm)]">
              <div className="rounded-lg p-1 text-[var(--color-primary)]">
                <Calendar size={20} strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-base font-bold text-[var(--color-text)]">
                  Today&apos;s Attendance Summary
                </h2>
              </div>
            </div>

            <NavLink
              to="/attendance"
              className="text-sm font-semibold text-[var(--color-primary)] hover:underline self-start sm:self-auto"
            >
              Manage
            </NavLink>
          </div>

          {/* Search Bar (Integrated directly inside Today's Attendance Summary) */}
          <div className="flex flex-col gap-2">
            <form
              onSubmit={handleShortcutMarkPresent}
              className="flex flex-col sm:flex-row items-center gap-[var(--spacing-md)] w-full"
            >
              <div className="relative flex-1 w-full">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student by roll no, student name, or course..."
                  className="w-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-background)] pl-10 pr-[var(--spacing-xl)] py-2 text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] transition-all duration-[var(--duration-fast)] focus:border-[var(--color-primary)] focus:bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-container)]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text)] bg-[var(--color-surface-high)] rounded-full px-1 py-0.5"
                  >
                    <X />
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-4 py-2 text-xs font-semibold text-[var(--color-on-primary)] transition-all duration-[var(--duration-fast)] hover:opacity-90 active:scale-[0.98] shadow-sm whitespace-nowrap"
              >
                <UserCheck2 size={16} strokeWidth={2.2} />
                <span>Mark Present</span>
              </button>
            </form>

            {/* Feedback Notification Alert */}
            {feedbackMessage && (
              <div className="flex items-center gap-2 rounded-lg bg-[var(--color-success)]/10 px-3 py-1.5 text-xs font-semibold text-[var(--color-success)] border border-[var(--color-success)]/20 animate-fade-in">
                <CheckCircle2 size={14} />
                <span>{feedbackMessage}</span>
              </div>
            )}
          </div>

          {/* Table Container with Responsive Horizontal Scroll */}
          <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-surface-high)] mt-1">
            <table className="w-full text-left text-sm border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-[var(--color-surface-low)] text-xs uppercase font-semibold text-[var(--color-text-muted)] border-b border-[var(--color-surface-high)]">
                  <th className="px-4 py-3">Roll No</th>
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">Check-in</th>
                  <th className="px-4 py-3">Check-out</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-surface-high)] bg-[var(--color-surface)]">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-surface-low)]/80"
                    >
                      <td className="px-4 py-3.5 font-mono text-xs font-bold text-[var(--color-primary)]">
                        {student.rollNo}
                      </td>
                      <td className="px-4 py-3.5 font-medium text-[var(--color-text)] whitespace-nowrap">
                        {student.name}
                      </td>
                      <td className="px-4 py-3.5 text-[var(--color-text-muted)] whitespace-nowrap">
                        {student.course}
                      </td>
                      <td className="px-4 py-3.5 text-[var(--color-text-muted)] whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 font-mono text-xs">
                          {student.checkIn !== "--" && (
                            <Clock
                              size={12}
                              className="text-[var(--color-success)]"
                            />
                          )}
                          {student.checkIn}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-[var(--color-text-muted)] whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 font-mono text-xs">
                          {student.checkOut !== "--" && (
                            <Clock
                              size={12}
                              className="text-[var(--color-text-muted)]"
                            />
                          )}
                          {student.checkOut}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-center whitespace-nowrap">
                        <StatusBadge status={student.status} />
                      </td>
                      <td className="px-4 py-3.5 text-center whitespace-nowrap">
                        {student.status !== "Present" ? (
                          <button
                            type="button"
                            onClick={() => markStudentPresent(student.id)}
                            className="inline-flex items-center gap-1 rounded-md bg-[var(--color-success)]/10 hover:bg-[var(--color-success)]/20 px-2.5 py-1 text-xs font-semibold text-[var(--color-success)] transition-colors"
                          >
                            <CheckCircle2 size={12} /> Mark Present
                          </button>
                        ) : student.checkOut === "--" ? (
                          <button
                            type="button"
                            onClick={() => markStudentCheckOut(student.id)}
                            className="inline-flex items-center gap-1 rounded-md bg-[var(--color-secondary)]/10 hover:bg-[var(--color-secondary)]/20 px-2.5 py-1 text-xs font-semibold text-[var(--color-secondary)] transition-colors"
                          >
                            <LogOut size={12} /> Check Out
                          </button>
                        ) : (
                          <span className="text-xs text-[var(--color-text-muted)] font-medium">
                            Completed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-[var(--color-text-muted)]"
                    >
                      <p className="text-sm font-medium">
                        No student records found matching &quot;{searchQuery}
                        &quot;
                      </p>
                      <p className="text-xs mt-1">
                        Try searching with a different roll number, name, or
                        course.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Task summary */}
        <div className="flex flex-col rounded-[var(--radius-xl)] border border-[var(--color-surface-high)] bg-[var(--color-surface)] p-[var(--spacing-lg)] shadow-[var(--shadow-sm)] transition-shadow duration-[var(--duration-normal)] hover:shadow-[var(--shadow-md)] lg:col-span-1">
          <div className="flex items-center justify-between border-b border-[var(--color-surface-high)] pb-[var(--spacing-md)] mb-[var(--spacing-sm)]">
            <div className="flex items-center gap-[var(--spacing-sm)]">
              <div className="rounded-lg p-1 text-[var(--color-primary)]">
                <ClipboardCheck size={20} strokeWidth={2} />
              </div>
              <h2 className="text-base font-bold text-[var(--color-text)]">
                Today&apos;s Task Summary
              </h2>
            </div>
            <NavLink
              to="/tasks"
              className="text-sm font-semibold text-[var(--color-primary)] hover:underline"
            >
              Manage
            </NavLink>
          </div>

          <div className="flex-1">
            {tasks.map((task) => (
              <TaskRow key={task.title} {...task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
