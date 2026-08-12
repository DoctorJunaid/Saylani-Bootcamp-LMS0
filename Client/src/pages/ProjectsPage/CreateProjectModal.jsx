import { useState, useEffect } from "react";
import { fetchTeams } from "../../Data/teams";

const STATUS_OPTIONS = [
  { value: "Not Started", label: "Not Started" },
  { value: "In Progress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
];

const EMPTY_FORM = {
  title: "",
  description: "",
  dueDate: "",
  status: "Not Started",
  teamId: "", // Empty means unassigned
};

export default function CreateProjectModal({ isOpen, onClose, onCreate }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Fetch teams to populate the dropdown
      fetchTeams().then(data => setTeams(data)).catch(err => console.error("Failed to load teams", err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleClose() {
    setFormData(EMPTY_FORM);
    setError(null);
    onClose();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError("Project title is required.");
      return;
    }

    const newProject = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: formData.status,
    };
    
    if (formData.dueDate) newProject.dueDate = formData.dueDate;
    if (formData.teamId) newProject.teamId = formData.teamId; // Optional team assignment

    try {
      setIsSubmitting(true);
      setError(null);
      await onCreate(newProject);
      handleClose();
    } catch (err) {
      setError(err.message ?? "Failed to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-lg"
      onClick={handleClose}
    >
      <div
        className="bg-surface rounded-xl shadow-md w-full max-w-[480px] p-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-weight-semibold text-text mb-lg">
          Create Project
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-md">
          <div>
            <label className="text-sm font-weight-medium text-text mb-xs block">
              Project Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. E-Commerce Platform"
              className="w-full bg-surface border border-border rounded-lg px-md py-sm text-sm text-text focus:outline-none focus:border-primary transition-colors duration-fast"
            />
          </div>

          <div>
            <label className="text-sm font-weight-medium text-text mb-xs block">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Project description..."
              className="w-full bg-surface border border-border rounded-lg px-md py-sm text-sm text-text focus:outline-none focus:border-primary transition-colors duration-fast"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-weight-medium text-text mb-xs block">
              Assign Team (Optional)
            </label>
            <select
              name="teamId"
              value={formData.teamId}
              onChange={handleChange}
              className="w-full bg-surface border border-border rounded-lg px-md py-sm text-sm text-text focus:outline-none focus:border-primary transition-colors duration-fast"
            >
              <option value="">-- Unassigned --</option>
              {teams.map((team) => (
                <option key={team._id || team.id} value={team._id || team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-weight-medium text-text mb-xs block">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full bg-surface border border-border rounded-lg px-md py-sm text-sm text-text focus:outline-none focus:border-primary transition-colors duration-fast"
            />
          </div>

          <div>
            <label className="text-sm font-weight-medium text-text mb-xs block">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-surface border border-border rounded-lg px-md py-sm text-sm text-text focus:outline-none focus:border-primary transition-colors duration-fast"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-sm text-error">{error}</p>}

          <div className="flex justify-end gap-sm mt-md">
            <button
              type="button"
              onClick={handleClose}
              className="px-lg py-sm rounded-lg text-sm font-weight-medium text-text-muted bg-surface-container hover:bg-surface-high transition-colors duration-fast"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-lg py-sm rounded-lg text-sm font-weight-medium text-on-primary bg-primary hover:opacity-90 disabled:opacity-60 transition-opacity duration-fast"
            >
              {isSubmitting ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
