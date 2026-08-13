import { useEffect, useState } from "react";
import { X } from "lucide-react";
import StatusBadge from "../../components/team/StatusBadge";
import { fetchProjectById, updateProject } from "../../Data/projects";
import { fetchTeams } from "../../Data/teams";


const STATUS_OPTIONS = [
  { value: "Not Started", label: "Not Started" },
  { value: "In Progress", label: "In Progress" },
  { value: "Under Review", label: "Under Review" },
  { value: "Completed", label: "Completed" },
];


export default function ProjectDetailsModal({ projectId, onClose, onUpdate }) {
  const [project, setProject] = useState(null);
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdatingTeam, setIsUpdatingTeam] = useState(false);
  

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setIsLoading(true);
      setError(null);
      try {
        const [projectData, teamsData] = await Promise.all([
          fetchProjectById(projectId),
          fetchTeams()
        ]);
        if (isMounted) {
          setProject(projectData);
          setTeams(teamsData);
        }
      } catch (err) {
        if (isMounted) setError(err.message ?? "Unknown error");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    if (projectId) {
      loadData();
    }
    
    return () => {
      isMounted = false;
    };
  }, [projectId]);

  async function handleTeamChange(e) {
    const newTeamId = e.target.value;
    setIsUpdatingTeam(true);
    try {
      const updatedProject = await updateProject(projectId, { teamId: newTeamId || null });
      setProject(updatedProject);
      if (onUpdate) onUpdate(); // Refresh the parent list
    } catch (err) {
      alert("Failed to update team assignment: " + err.message);
    } finally {
      setIsUpdatingTeam(false);
    }
  }

  function formatDeadline(isoDate) {
    if (!isoDate) return "No deadline set";
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return isoDate;
    return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(date);
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-lg"
      onClick={onClose}
    >
      <div
        className="bg-surface rounded-xl shadow-md w-full max-w-[600px] flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-xl overflow-y-auto">

          {!isLoading && error && (
            <div className="bg-error/10 text-error p-md rounded-lg text-sm mb-lg border border-error/20">
              Failed to load project: {error}
            </div>
          )}

          {!isLoading && !error && !project && (
            <div className="text-center py-12">
              <p className="text-sm text-text-muted">
                Project not found.
              </p>
            </div>
          )}

          {!isLoading && !error && project && (
            <>
              {/* Project header */}
              <div className="bg-surface border border-border rounded-xl shadow-md p-lg mb-lg">
                <div className="flex flex-wrap items-start justify-between gap-md">
                  <div>
                    <h1 className="text-2xl font-weight-bold text-text">
                      {project.title}
                    </h1>
                    <p className="text-sm text-text-muted mt-xs">
                      Due: {formatDeadline(project.dueDate)}
                    </p>
                  </div>
                  <StatusBadge status={project.status} />
                </div>
              </div>

              {/* Description section */}
              <section className="mb-lg">
                <h2 className="text-lg font-weight-semibold text-text mb-sm">
                  Description
                </h2>
                <p className="text-sm text-text-muted bg-surface-low p-md rounded-lg border border-border min-h-[80px]">
                  {project.description || "No description provided."}
                </p>
              </section>

              {/* Team Assignment section */}
              <section className="mb-lg">
                <h2 className="text-lg font-weight-semibold text-text mb-sm">
                  Assigned Team
                </h2>
                <div className="bg-surface-low border border-border rounded-lg p-md">
                  <div className="flex items-center gap-md">
                    <select
                      value={project.teamId?._id || project.teamId || ""}
                      onChange={handleTeamChange}
                      disabled={isUpdatingTeam}
                      className="w-full bg-surface border border-border rounded-lg px-md py-sm text-sm text-text focus:outline-none focus:border-primary transition-colors duration-fast disabled:opacity-60"
                    >
                      <option value="">-- Unassigned --</option>
                      {teams.map(team => (
                        <option key={team._id || team.id} value={team._id || team.id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                    {isUpdatingTeam && <span className="text-xs text-text-muted">Saving...</span>}
                  </div>
                  <p className="text-xs text-text-muted mt-2">
                    Changing the team will automatically update the project lists for both the old and new teams.
                  </p>
                </div>
              </section>

             

               {/* Project Status */}
          <section className="mb-lg">
            <h2 className="text-lg font-weight-semibold text-text mb-sm">
              Project Status
            </h2>

            <div className="bg-surface-low border border-border rounded-lg p-md">
              <div className="flex items-center gap-md">
                <select
                  value={project.status}
                  disabled={isUpdatingTeam}
                  onChange={async (e) => {
                    const newStatus = e.target.value;

                    setProject((prev) => ({
                      ...prev,
                      status: newStatus,
                    }));

                    try {
                      await updateProject(projectId, {
                        status: newStatus,
                      });

                      if (onUpdate) onUpdate();
                    } catch (err) {
                      console.error(err);
                      alert("Failed to update project status.");
                    }
                  }}
                  className="w-full bg-surface border border-border rounded-lg px-md py-sm text-sm text-text focus:outline-none focus:border-primary transition-colors duration-fast"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option
                      key={status.value}
                      value={status.value}
                    >
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              <p className="text-xs text-text-muted mt-2">
                Select the current status of this project.
              </p>
            </div>
          </section>

              {/* Progress section */}
              <section>
                <div className="flex justify-between items-center mb-sm">
                  <h2 className="text-lg font-weight-semibold text-text">Progress</h2>
                  <span className="text-sm font-weight-medium text-text">{project.progress || 0}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={project.progress || 0}
                  onChange={async (e) => {
                    const newProgress = parseInt(e.target.value);
                    setProject(prev => ({ ...prev, progress: newProgress }));
                    try {
                      await updateProject(projectId, { progress: newProgress });
                      if (onUpdate) onUpdate();
                    } catch (err) {
                      console.error("Failed to update progress", err);
                    }
                  }}
                  className="w-full accent-primary"
                />
              </section>
            </>
          )}
        </div>

        <div className="flex justify-end gap-sm p-lg border-t border-border bg-surface shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-lg py-sm rounded-lg text-sm font-weight-medium text-text-muted bg-surface-container hover:bg-surface-high transition-colors duration-fast"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
