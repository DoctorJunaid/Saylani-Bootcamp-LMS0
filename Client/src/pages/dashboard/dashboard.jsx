import React from "react";
import {
  GraduationCap,
  UserCheck,
  UserX,
  Users,
  ClipboardList,
  Calendar,
  ClipboardCheck,
} from "lucide-react";

const statCards = [
  { label: "Total Students", value: 9, icon: GraduationCap, tone: "text-primary" },
  { label: "Present Today", value: 0, icon: UserCheck, tone: "text-success" },
  { label: "Absent Today", value: 0, icon: UserX, tone: "text-error" },
  { label: "Total Teams", value: 3, icon: Users, tone: "text-primary" },
  { label: "Pending Tasks", value: 6, icon: ClipboardList, tone: "text-text" },
];

const attendanceSummary = [
  { label: "Present", value: 0, tone: "success" },
  { label: "Absent", value: 0, tone: "error" },
  { label: "Leave", value: 0, tone: "warning" },
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

const statusStyles = {
  Completed: "bg-success/10 text-success",
  "In Progress": "bg-warning/10 text-warning",
  Pending: "bg-secondary/10 text-secondary",
};

const attendanceTone = {
  success: "bg-success/10 text-success hover:bg-success/15",
  error: "bg-error/10 text-error hover:bg-error/15",
  warning: "bg-warning/10 text-warning hover:bg-warning/15",
};

function StatCard({ label, value, icon: Icon, tone }) {
  return (
    <div className="flex items-start justify-between rounded-xl border border-surface-high bg-surface p-lg shadow-sm transition-shadow duration-normal hover:shadow-md">
      <div>
        <p className="text-sm text-text-muted">{label}</p>
        <p className="mt-xs text-2xl font-bold text-text">{value}</p>
      </div>
      <Icon size={22} strokeWidth={2} className={tone} />
    </div>
  );
}

function AttendanceBox({ label, value, tone }) {
  return (
    <div
      className={`flex flex-1 cursor-default flex-col items-center rounded-lg py-lg transition-colors duration-fast ${attendanceTone[tone]}`}
    >
      <span className="text-2xl font-bold">{value}</span>
      <span className="mt-xs text-sm font-medium">{label}</span>
    </div>
  );
}

function TaskRow({ title, student, rollNumber, dueDate, status }) {
  return (
    <div className="-mx-sm flex items-center justify-between rounded-md border-b border-surface-high px-sm py-md transition-colors duration-fast last:border-b-0 hover:bg-surface-low">
      <div>
        <p className="text-sm font-medium text-text">{title}</p>
        <p className="mt-xs text-xs text-text-muted">
          {student} &middot; {rollNumber} &middot; due {dueDate}
        </p>
      </div>
      <span
        className={`whitespace-nowrap rounded-full px-md py-xs text-xs font-medium ${statusStyles[status]}`}
      >
        {status}
      </span>
    </div>
  );
}

export default function Dashboard() {
  const markedCount = attendanceSummary.reduce((sum, item) => sum + item.value, 0);
  const totalStudents = statCards[0].value;

  return (
    <div className="flex flex-col gap-lg font-plus-jakarta-sans">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Attendance + Task summary */}
      <div className="grid grid-cols-1 gap-lg lg:grid-cols-2">
        {/* Attendance summary */}
        <div className="rounded-xl border border-surface-high bg-surface p-lg shadow-sm transition-shadow duration-normal hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-sm">
              <Calendar size={18} strokeWidth={2} className="text-primary" />
              <h2 className="text-base font-semibold text-text">
                Today&apos;s Attendance Summary
              </h2>
            </div>
            <button
              type="button"
              className="text-sm font-medium text-primary underline-offset-2 transition-colors duration-fast hover:underline"
            >
              Manage
            </button>
          </div>

          <div className="mt-lg flex gap-md">
            {attendanceSummary.map((item) => (
              <AttendanceBox key={item.label} {...item} />
            ))}
          </div>

          <p className="mt-md text-sm text-text-muted">
            {markedCount} of {totalStudents} students marked today.
          </p>
        </div>

        {/* Task summary */}
        <div className="rounded-xl border border-surface-high bg-surface p-lg shadow-sm transition-shadow duration-normal hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-sm">
              <ClipboardCheck size={18} strokeWidth={2} className="text-primary" />
              <h2 className="text-base font-semibold text-text">
                Today&apos;s Task Summary
              </h2>
            </div>
            <button
              type="button"
              className="text-sm font-medium text-primary underline-offset-2 transition-colors duration-fast hover:underline"
            >
              Manage
            </button>
          </div>

          <div className="mt-sm">
            {tasks.map((task) => (
              <TaskRow key={task.title} {...task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}