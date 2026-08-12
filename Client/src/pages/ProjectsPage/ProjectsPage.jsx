import { useEffect, useMemo, useState } from "react";
import { fetchProjects, createProject } from "../../Data/projects";
import FilterToolbar from "../../components/team/FilterTollbar";
import ProjectCard from "../../components/team/ProjectCard";
import CreateProjectModal from "./CreateProjectModal";
import ProjectDetailsModal from "./ProjectDetailsModal";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const loadProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      setError(err.message ?? "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const counts = useMemo(
    () => ({
      all: projects.length,
      not_started: projects.filter((p) => p.status === "Not Started" || p.status === "not_started").length,
      in_progress: projects.filter((p) => p.status === "In Progress" || p.status === "in_progress").length,
      completed: projects.filter((p) => p.status === "Completed" || p.status === "completed").length,
    }),
    [projects]
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Handle both ui and backend casing formats for safety
      let matchesFilter = activeFilter === "all";
      if (!matchesFilter) {
          const status = project.status?.toLowerCase();
          if (activeFilter === "not_started") matchesFilter = status === "not started" || status === "not_started";
          else if (activeFilter === "in_progress") matchesFilter = status === "in progress" || status === "in_progress";
          else if (activeFilter === "completed") matchesFilter = status === "completed";
      }

      const matchesSearch = project.title
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [projects, activeFilter, searchQuery]);

  function handleViewProject(project) {
    setSelectedProjectId(project._id || project.id);
  }

  async function handleCreateProject(newProject) {
    const savedProject = await createProject(newProject);
    setProjects((prev) => [savedProject, ...prev]);
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-[var(--container)] mx-auto px-lg py-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-weight-bold text-text">Projects</h1>
            <p className="text-text-muted mt-1">Manage and view all projects.</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Create Project
          </button>
        </div>

        <FilterToolbar
          counts={counts}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="mt-lg">
          {isLoading ? (
            <div className="text-center py-10 text-text-muted">Loading projects...</div>
          ) : error ? (
            <div className="text-center py-10 text-error">{error}</div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-10 text-text-muted">No projects found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
              {filteredProjects.map((project) => (
                <div key={project._id || project.id} onClick={() => handleViewProject(project)} className="cursor-pointer hover:shadow-md transition-shadow rounded-lg">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateProject}
      />

      {selectedProjectId && (
        <ProjectDetailsModal
          projectId={selectedProjectId}
          onClose={() => setSelectedProjectId(null)}
          onUpdate={loadProjects}
        />
      )}
    </div>
  );
}
