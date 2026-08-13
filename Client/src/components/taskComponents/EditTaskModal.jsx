import React, { useState, useEffect, useRef } from "react";
import { LuX, LuChevronDown, LuSearch, LuCheck } from "react-icons/lu";

const ASSIGNEE_OPTIONS = [
  { name: "Faiz ur Rehman", avatarText: "FR", avatarBg: "bg-blue-100 text-blue-700" },
  { name: "Muhammad Junaid", avatarText: "MJ", avatarBg: "bg-amber-100 text-amber-700" },
  { name: "Sana Ullah", avatarText: "SU", avatarBg: "bg-purple-100 text-purple-700" },
  { name: "Idrees Ud Din", avatarText: "ID", avatarBg: "bg-blue-100 text-blue-700" },
  { name: "Bahadar Ali", avatarText: "BA", avatarBg: "bg-amber-100 text-amber-700" },
  { name: "Shayan Ahmad", avatarText: "SA", avatarBg: "bg-emerald-100 text-emerald-700" },
  { name: "Sir Ibrahim Khan", avatarText: "IK", avatarBg: "bg-purple-100 text-purple-700" },
];

// Removed SearchableAssigneeSelect component in favor of native select

// Helper to convert date strings to YYYY-MM-DD for input type="date"
const toDateInputValue = (dateStr) => {
  if (!dateStr) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  if (dateStr.toLowerCase() === "tomorrow") {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }
  if (dateStr.toLowerCase() === "yesterday") {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
  }
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().split("T")[0];
  }
  return "";
};

const EditTaskModal = ({ task, onClose, onSave, mode = "edit", dynamicAssignees }) => {
  const isCreate = mode === "create" || !task;

  const assigneeList = dynamicAssignees || ASSIGNEE_OPTIONS;

  const [title, setTitle] = useState(task?.title || "");
  const [subtitle, setSubtitle] = useState(task?.subtitle || "");
  const [status, setStatus] = useState(task?.status || "Pending");
  const [assignedToName, setAssignedToName] = useState(
    task?.assignedTo?.name || (assigneeList.length > 0 ? assigneeList[0].name : "")
  );
  const [dueDate, setDueDate] = useState(toDateInputValue(task?.dueDate));

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setSubtitle(task.subtitle || "");
      setStatus(task.status || "Pending");
      setAssignedToName(task.assignedTo?.name || (assigneeList.length > 0 ? assigneeList[0].name : ""));
      setDueDate(toDateInputValue(task.dueDate));
    } else {
      setTitle("");
      setSubtitle("");
      setStatus("Pending");
      setAssignedToName(assigneeList.length > 0 ? assigneeList[0].name : "");
      const today = new Date().toISOString().split("T")[0];
      setDueDate(today);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedAssignee =
      assigneeList.find((a) => a.name === assignedToName) || {
        name: assignedToName,
        avatarText: assignedToName.slice(0, 2).toUpperCase(),
        avatarBg: "bg-blue-100 text-blue-700",
      };

    const taskData = {
      id: task?.id || Date.now(),
      title,
      subtitle,
      status,
      updateStatus: status,
      assignedTo: selectedAssignee,
      dueDate: dueDate || new Date().toISOString().split("T")[0],
    };

    onSave(taskData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-[var(--color-surface)] rounded-2xl shadow-2xl border border-[var(--color-border)] w-[95%] sm:w-[600px] md:w-[650px] max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-[var(--color-border)] shrink-0">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-text)]">
            {isCreate ? "Create New Task" : "Edit Task"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-low)] rounded-lg transition-colors cursor-pointer"
          >
            <LuX className="h-5 w-5" />
          </button>
        </div>

        {/* Body (Form) */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 pt-5 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Task Title */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs sm:text-sm font-semibold text-[var(--color-text)]">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Update Syllabus: Web Dev Unit 1-4"
                  className="w-full px-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)]/70 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors"
                />
              </div>

              {/* Task Subtitle / Modules */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs sm:text-sm font-semibold text-[var(--color-text)]">
                  Description / Subtitle
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Curriculum / Modules / 2 weeks / Read & instructions..."
                  className="w-full px-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)]/70 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors"
                />
              </div>

              {/* Status */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-semibold text-[var(--color-text)]">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors appearance-none cursor-pointer pr-10"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <LuChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-muted)] pointer-events-none" />
                </div>
              </div>

              {/* Assigned To */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-semibold text-[var(--color-text)]">
                  Assigned To
                </label>
                <div className="relative">
                  <select
                    value={assignedToName}
                    onChange={(e) => setAssignedToName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors appearance-none cursor-pointer pr-10"
                  >
                    {assigneeList.map((opt) => (
                      <option key={opt.name} value={opt.name}>{opt.name}</option>
                    ))}
                  </select>
                  <LuChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-muted)] pointer-events-none" />
                </div>
              </div>

              {/* Due Date (HTML5 Date Input with calendar picker) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-semibold text-[var(--color-text)]">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 p-6 pt-4 border-t border-[var(--color-border)] shrink-0 bg-[var(--color-surface)]">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-low)] text-[var(--color-text)] text-sm font-semibold rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[var(--color-primary)] hover:opacity-90 text-[var(--color-on-primary)] text-sm font-semibold rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              {isCreate ? "Create Task" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
