import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

export default function TeamDetails() {
  const { teamId } = useParams();
  const navigate = useNavigate();

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
    <div className="bg-background min-h-screen">
      <div className="max-w-[var(--container)] mx-auto px-lg py-2xl">
        {/* Back to Teams */}
        <button
          type="button"
          onClick={() => navigate("/teams")}
          className="inline-flex items-center gap-xs text-sm font-weight-medium text-primary hover:underline transition-colors duration-fast mb-lg"
        >
          <BackIcon />
          Back to Teams
        </button>

        {isLoading && (
          <p className="text-sm text-text-muted">Team load ho rahi hai...</p>
        )}

        {!isLoading && error && (
          <p className="text-sm text-error">
            Team load nahi ho paayi: {error}
          </p>
        )}

        {!isLoading && !error && !team && (
          <p className="text-sm text-text-muted">
            Yeh team nahi mili. Ho sakta hai delete ho gayi ho ya link ghalat ho.
          </p>
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
                  Is team ko abhi koi project assign nahi hua.
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
                  Is team me abhi koi member add nahi hua.
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
    </div>
  );
}