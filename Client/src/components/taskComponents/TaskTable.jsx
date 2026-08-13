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
import { getTasks, updateTask } from "../../api/task.api";

const UPDATE_OPTIONS = ["Pending", "In Progress", "Completed"];

// Update Dropdown matching Screenshot 3
const UpdateDropdown = ({ currentStatus, onStatusChange }) => {
  return (
    <div className="relative inline-block w-32 text-left">
      <select
        value={currentStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="w-full px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-outline)] shadow-[var(--shadow-sm)] transition-colors cursor-pointer appearance-none outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
      >
        {UPDATE_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <LuChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-muted)] pointer-events-none" />
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  let badgeStyle = "bg-gray-100 text-gray-700 border-gray-200";
  if (status === "In Progress") {
    badgeStyle = "bg-blue-50 text-blue-700 border-blue-200";
  } else if (status === "Pending" || status === "To Do") {
    badgeStyle = "bg-gray-100 text-gray-700 border-gray-200";
  } else if (status === "Completed" || status === "Done") {
    badgeStyle = "bg-green-50 text-green-700 border-green-200";
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeStyle}`}
    >
      {status}
    </span>
  );
};

const TaskTable = ({ externalTasks, loading, fetchTasks, onEditTask, onDeleteTasks }) => {
  const tasks = externalTasks || [];
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
  const totalItems = filteredTasks.length;
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
  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status", error);
    }
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
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--color-border)]">
        <div className="flex flex-wrap items-center gap-3">
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

        {/* Bulk Actions */}
        {selectedIds.length > 0 && (
          <button
            type="button"
            onClick={() => {
              if (onDeleteTasks) {
                onDeleteTasks(selectedIds)
                  .then(() => setSelectedIds([]))
                  .catch(() => {
                    // Action was cancelled or failed, keep selection
                  });
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[var(--color-error)] text-white text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity shadow-[var(--shadow-sm)] cursor-pointer"
          >
            Delete Selected ({selectedIds.length})
          </button>
        )}
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
                      <div 
                        className="flex flex-col cursor-pointer group"
                        onClick={() => onEditTask && onEditTask(task)}
                      >
                        <div className="font-medium text-[var(--color-text)] group-hover:text-[var(--color-primary)] text-sm transition-colors">
                          {task.title}
                        </div>
                        <div className="text-xs text-[var(--color-text-muted)] mt-0.5">
                          {task.subtitle}
                        </div>
                      </div>
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
                  colSpan="6"
                  className="px-4 py-8 text-center text-sm text-[var(--color-text-muted)]"
                >
                  {loading ? "Loading tasks..." : "No tasks found matching the filter criteria."}
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
