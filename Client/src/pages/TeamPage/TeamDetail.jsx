import { useEffect, useState } from "react";
import { X } from "lucide-react";
import StatusBadge from "../../components/team/StatusBadge";
import ProjectCard from "../../components/team/ProjectCard";
import MemberCard from "../../components/team/MemberCrad";
import { fetchTeamById } from "../../Data/teams";

/**
 * TeamDetails
 * ---------------------------------------------------------------
 * Route: /teams/:teamId
 *
 * URL me jo `teamId` hai, usi se `fetchTeamById()` call hota hai —
 * yeh page kabhi hardcoded team nahi dikhata, hamesha uska data
 * dikhata hai jiska card click hua tha.
 *
 * Sections:
 *  - Back to Teams
 *  - Team header (name + status + member count)
 *  - Projects (multiple projects support karta hai)
 *  - Team Members
 */

function BackIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

export default function TeamDetails({ teamId, onClose }) {

  const [team, setTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadTeam() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchTeamById(teamId);
        if (isMounted) setTeam(data);
      } catch (err) {
        if (isMounted) setError(err.message ?? "Unknown error");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadTeam();
    return () => {
      isMounted = false;
    };
    // Agar user browser back/forward se doosri team ki id par
    // aata hai, teamId badalne par data phir se fetch hoga.
  }, [teamId]);

  const projects = team?.projects?.length
    ? team.projects
    : team?.project
    ? [team.project]
    : [];

  const members = team?.members ?? [];

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-lg"
      onClick={onClose}
    >
      <div
        className="bg-surface rounded-xl shadow-md w-full max-w-[800px] flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-xl overflow-y-auto">

          {!isLoading && error && (
            <div className="bg-error/10 text-error p-md rounded-lg text-sm mb-lg border border-error/20">
              Failed to load team: {error}
            </div>
          )}

          {!isLoading && !error && !team && (
            <div className="text-center py-12">
              <p className="text-sm text-text-muted">
                Team not found. It may have been deleted or the link is incorrect.
              </p>
            </div>
          )}

          {!isLoading && !error && team && (
            <>
              {/* Team header */}
              <div className="bg-surface border border-border rounded-xl shadow-md p-lg mb-lg">
                <div className="flex flex-wrap items-start justify-between gap-md">
                  <div>
                    <h1 className="text-2xl font-weight-bold text-text">
                      {team.name}
                    </h1>
                    <p className="text-sm text-text-muted mt-xs">
                      {members.length} {members.length === 1 ? "member" : "members"}
                      {" · "}
                      {projects.length}{" "}
                      {projects.length === 1 ? "project" : "projects"}
                    </p>
                  </div>
                  <StatusBadge status={team.status} />
                </div>
              </div>

              {/* Projects section */}
              <section className="mb-lg">
                <h2 className="text-xl font-weight-semibold text-text mb-md">
                  Projects
                </h2>

                {projects.length === 0 ? (
                  <p className="text-sm text-text-muted">
                    No projects have been assigned to this team yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    {projects.map((project) => (
                      <ProjectCard key={project.id ?? project.title} project={project} />
                    ))}
                  </div>
                )}
              </section>

              {/* Team members section */}
              <section>
                <h2 className="text-xl font-weight-semibold text-text mb-md">
                  Team Members
                </h2>

                {members.length === 0 ? (
                  <p className="text-sm text-text-muted">
                    No members have been added to this team yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
                    {members.map((member) => (
                      <MemberCard key={member.id ?? member.email} member={member} />
                    ))}
                  </div>
                )}
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

