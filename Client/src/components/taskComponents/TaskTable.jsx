import React, { useState, useRef, useEffect } from "react";
import {
  LuFileText,
  LuChevronDown,
  LuCheck,
  LuChevronLeft,
  LuChevronRight,
  LuListFilter,
  LuUser,
} from "react-icons/lu";

// Initial Mock Tasks Data
const initialTasks = [
  {
    id: 1,
    title: "Update Syllabus: Web Dev Unit 1-4",
    subtitle: "Curriculum / Modules / 2 weeks / Read & instructions...",
    priority: "High",
    status: "In Progress",
    assignedTo: {
      name: "Faiz ur Rehman",
      avatarText: "FR",
      avatarBg: "bg-blue-100 text-blue-700",
    },
    dueDate: "Tomorrow",
    updateStatus: "Pending",
  },
  {
    id: 2,
    title: "Finalize Post-Placement JD Design",
    subtitle: "UI Labs / Research / 2 weeks / 14 days left...",
    priority: "Medium",
    status: "Pending",
    assignedTo: {
      name: "Muhammad Junaid",
      avatarText: "MJ",
      avatarBg: "bg-amber-100 text-amber-700",
    },
    dueDate: "Oct 12, 2023",
    updateStatus: "In Progress",
  },
  {
    id: 3,
    title: "Grad Onboarding Details",
    subtitle: "Cohort Admin / Video Event 1...",
    priority: "Low",
    status: "Completed",
    assignedTo: {
      name: "Sana Ullah",
      avatarText: "SU",
      avatarBg: "bg-purple-100 text-purple-700",
    },
    dueDate: "Yesterday",
    updateStatus: "In Progress",
  },
  {
    id: 4,
    title: "React Query Migration & Setup",
    subtitle: "Frontend Architecture / Core Libs / Sprint 4...",
    priority: "High",
    status: "Pending",
    assignedTo: {
      name: "Idrees Ud Din",
      avatarText: "ID",
      avatarBg: "bg-blue-100 text-blue-700",
    },
    dueDate: "Oct 20, 2023",
    updateStatus: "Pending",
  },
  {
    id: 5,
    title: "Database Schema Optimization",
    subtitle: "Backend DB / Indexing / Performance...",
    priority: "Medium",
    status: "Completed",
    assignedTo: {
      name: "Bahadar Ali",
      avatarText: "BA",
      avatarBg: "bg-amber-100 text-amber-700",
    },
    dueDate: "Oct 18, 2023",
    updateStatus: "Completed",
  },
  {
    id: 6,
    title: "Student Feedback Form UI",
    subtitle: "Design System / Components / Student Portal...",
    priority: "Low",
    status: "Completed",
    assignedTo: {
      name: "Shayan Ahmad",
      avatarText: "SA",
      avatarBg: "bg-emerald-100 text-emerald-700",
    },
    dueDate: "Oct 15, 2023",
    updateStatus: "Completed",
  },
  {
    id: 7,
    title: "Security Compliance Review",
    subtitle: "Security / Auth Audit / OAuth 2.0...",
    priority: "High",
    status: "Pending",
    assignedTo: {
      name: "Sir Ibrahim Khan",
      avatarText: "IK",
      avatarBg: "bg-purple-100 text-purple-700",
    },
    dueDate: "Oct 25, 2023",
    updateStatus: "Pending",
  },
];

const UPDATE_OPTIONS = ["Pending", "In Progress", "Completed"];

// Update Dropdown matching Screenshot 3
const UpdateDropdown = ({ currentStatus, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center justify-between gap-2 px-3 py-1.5 w-32 text-xs sm:text-sm font-medium rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-outline)] shadow-[var(--shadow-sm)] transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="truncate">{currentStatus}</span>
        <LuChevronDown
          className={`h-4 w-4 shrink-0 text-[var(--color-text-muted)] transition-transform duration-[var(--duration-fast)] ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-30 mt-1 w-36 origin-top-right rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-md)] p-1 focus:outline-none animate-in fade-in zoom-in-95 duration-100">
          {UPDATE_OPTIONS.map((option) => {
            const isSelected = option === currentStatus;
            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onStatusChange(option);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm rounded-lg transition-colors cursor-pointer text-left ${isSelected
                  ? "bg-[#e5a83b] text-[#191c1e] font-semibold"
                  : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-low)] hover:text-[var(--color-text)] font-normal"
                  }`}
              >
                <span>{option}</span>
                {isSelected && (
                  <LuCheck className="h-4 w-4 shrink-0 text-[#191c1e]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Priority Badge Component
const PriorityBadge = ({ priority }) => {
  let badgeStyle = "bg-gray-100 text-gray-700 border-gray-200";
  if (priority === "High") {
    badgeStyle = "bg-[#fee2e2] text-[#ef4444] border-[#fca5a5]/40";
  } else if (priority === "Medium") {
    badgeStyle = "bg-[#fef3c7] text-[#d97706] border-[#fcd34d]/40";
  } else if (priority === "Low") {
    badgeStyle = "bg-[#dcfce7] text-[#16a34a] border-[#86efac]/40";
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeStyle}`}
    >
      {priority}
    </span>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  let badgeStyle = "bg-gray-100 text-gray-700 border-gray-200";
  if (status === "In Progress") {
    badgeStyle = "bg-[#f3e8ff] text-[#9333ea] border-[#d8b4fe]/40";
  } else if (status === "Pending" || status === "To Do") {
    badgeStyle = "bg-[#e0e7ff] text-[#4f46e5] border-[#a5b4fc]/40";
  } else if (status === "Completed" || status === "Done") {
    badgeStyle = "bg-[#d1fae5] text-[#059669] border-[#6ee7b7]/40";
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeStyle}`}
    >
      {status}
    </span>
  );
};

const TaskTable = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedIds, setSelectedIds] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [assigneeFilter, setAssigneeFilter] = useState("All Assignees");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Filter Dropdown States
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isAssigneeOpen, setIsAssigneeOpen] = useState(false);

  const statusDropdownRef = useRef(null);
  const assigneeDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(e.target)
      ) {
        setIsStatusOpen(false);
      }
      if (
        assigneeDropdownRef.current &&
        !assigneeDropdownRef.current.contains(e.target)
      ) {
        setIsAssigneeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter Tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "All Statuses" ||
      task.status === statusFilter ||
      task.updateStatus === statusFilter;
    const matchesAssignee =
      assigneeFilter === "All Assignees" ||
      task.assignedTo.name === assigneeFilter;
    return matchesStatus && matchesAssignee;
  });

  // Pagination logic
  const totalItems = 124; // Mocked total as shown in screenshots
  const totalPages = Math.ceil(filteredTasks.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentTasks = filteredTasks.slice(startIndex, startIndex + pageSize);

  // Checkbox handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(currentTasks.map((t) => t.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Update Status handler
  const handleUpdateStatus = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            updateStatus: newStatus,
            status: newStatus, // Sync status badge as well
          };
        }
        return task;
      })
    );
  };

  const isAllSelected =
    currentTasks.length > 0 &&
    currentTasks.every((t) => selectedIds.includes(t.id));

  // Extract unique assignees for filter
  const uniqueAssignees = [
    "All Assignees",
    ...new Set(tasks.map((t) => t.assignedTo.name)),
  ];

  return (
    <div className="flex flex-col">
      {/* Top Filter Bar (Inside Black Box) */}
      <div className="flex flex-wrap items-center gap-3 pb-4 border-b border-[var(--color-border)]">
        {/* Status Filter */}
        <div className="relative" ref={statusDropdownRef}>
          <button
            type="button"
            onClick={() => {
              setIsStatusOpen((prev) => !prev);
              setIsAssigneeOpen(false);
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-xs sm:text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-outline)] shadow-[var(--shadow-sm)] cursor-pointer"
          >
            <LuListFilter className="h-4 w-4 text-[var(--color-text-muted)]" />
            <span>{statusFilter}</span>
            <LuChevronDown
              className={`h-3.5 w-3.5 text-[var(--color-text-muted)] transition-transform duration-[var(--duration-fast)] ${isStatusOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          {isStatusOpen && (
            <div className="absolute left-0 z-30 mt-1 w-44 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-md)] py-1">
              {["All Statuses", "Pending", "In Progress", "Completed"].map(
                (opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setStatusFilter(opt);
                      setIsStatusOpen(false);
                      setCurrentPage(1);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm text-left cursor-pointer hover:bg-[var(--color-surface-low)] ${statusFilter === opt
                      ? "text-[var(--color-primary)] font-semibold"
                      : "text-[var(--color-text-muted)]"
                      }`}
                  >
                    <span>{opt}</span>
                    {statusFilter === opt && (
                      <LuCheck className="h-3.5 w-3.5" />
                    )}
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {/* Assignee Filter */}
        <div className="relative" ref={assigneeDropdownRef}>
          <button
            type="button"
            onClick={() => {
              setIsAssigneeOpen((prev) => !prev);
              setIsStatusOpen(false);
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-xs sm:text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-outline)] shadow-[var(--shadow-sm)] cursor-pointer"
          >
            <LuUser className="h-4 w-4 text-[var(--color-text-muted)]" />
            <span>{assigneeFilter}</span>
            <LuChevronDown
              className={`h-3.5 w-3.5 text-[var(--color-text-muted)] transition-transform duration-[var(--duration-fast)] ${isAssigneeOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          {isAssigneeOpen && (
            <div className="absolute left-0 z-30 mt-1 w-48 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-md)] py-1">
              {uniqueAssignees.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setAssigneeFilter(opt);
                    setIsAssigneeOpen(false);
                    setCurrentPage(1);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm text-left cursor-pointer hover:bg-[var(--color-surface-low)] ${assigneeFilter === opt
                    ? "text-[var(--color-primary)] font-semibold"
                    : "text-[var(--color-text-muted)]"
                    }`}
                >
                  <span>{opt}</span>
                  {assigneeFilter === opt && (
                    <LuCheck className="h-3.5 w-3.5" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-low)]/50">
              <th className="px-4 py-3.5 w-10">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-0 focus:ring-offset-0 cursor-pointer h-4 w-4"
                />
              </th>
              <th className="px-4 py-3.5 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                Task Name
              </th>
              <th className="px-4 py-3.5 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                Priority
              </th>
              <th className="px-4 py-3.5 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3.5 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                Assigned To
              </th>
              <th className="px-4 py-3.5 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-4 py-3.5 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider text-right pr-6">
                Update
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-surface-highest)] text-sm">
            {currentTasks.length > 0 ? (
              currentTasks.map((task) => {
                const isSelected = selectedIds.includes(task.id);
                return (
                  <tr
                    key={task.id}
                    className={`hover:bg-[var(--color-surface-low)] transition-colors ${isSelected ? "bg-[var(--color-surface-low)]/70" : ""
                      }`}
                  >
                    {/* Checkbox */}
                    <td className="px-4 py-4 w-10">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(task.id)}
                        className="rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-0 focus:ring-offset-0 cursor-pointer h-4 w-4"
                      />
                    </td>

                    {/* Task Name */}
                    <td className="px-4 py-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 text-[var(--color-text-muted)] shrink-0">
                          <LuFileText className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-[var(--color-text)] text-sm">
                            {task.title}
                          </div>
                          <div className="text-xs text-[var(--color-text-muted)] mt-0.5">
                            {task.subtitle}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Priority */}
                    <td className="px-4 py-4">
                      <PriorityBadge priority={task.priority} />
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <StatusBadge status={task.status} />
                    </td>

                    {/* Assigned To */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${task.assignedTo.avatarBg}`}
                        >
                          {task.assignedTo.avatarText}
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-[var(--color-text)]">
                          {task.assignedTo.name}
                        </span>
                      </div>
                    </td>

                    {/* Due Date */}
                    <td className="px-4 py-4 text-xs sm:text-sm text-[var(--color-text-muted)]">
                      {task.dueDate}
                    </td>

                    {/* Update Dropdown (Replaces Action) */}
                    <td className="px-4 py-4 text-right pr-6">
                      <UpdateDropdown
                        currentStatus={task.updateStatus}
                        onStatusChange={(newStatus) =>
                          handleUpdateStatus(task.id, newStatus)
                        }
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-4 py-8 text-center text-sm text-[var(--color-text-muted)]"
                >
                  No tasks found matching the filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--color-border)] mt-2">
        <div className="text-xs sm:text-sm text-[var(--color-text-muted)]">
          Showing{" "}
          <span className="font-medium text-[var(--color-text)]">
            {filteredTasks.length > 0 ? startIndex + 1 : 0}
          </span>{" "}
          to{" "}
          <span className="font-medium text-[var(--color-text)]">
            {Math.min(startIndex + pageSize, filteredTasks.length)}
          </span>{" "}
          of{" "}
          <span className="font-medium text-[var(--color-text)]">
            {totalItems}
          </span>{" "}
          tasks
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-outline)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            aria-label="Previous page"
          >
            <LuChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs font-medium px-2 py-1 rounded bg-[var(--color-surface-low)] text-[var(--color-text)]">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-outline)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            aria-label="Next page"
          >
            <LuChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskTable;
