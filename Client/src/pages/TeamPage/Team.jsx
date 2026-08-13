import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterToolbar from "../../components/team/FilterTollbar";
import TeamGrid from "../../components/team/TeamGrid";
import CreateTeamModal from "../../components/team/CreateTeamModel";
import TeamDetails from "./TeamDetail";
import { fetchTeams, createTeam } from "../../Data/teams";
import { fetchProjects } from "../../Data/project";

/**
 * TeamsPage
 * ---------------------------------------------------------------
 * Page ke kaam:
 *  1. data/teams.js se teams fetch karna
 *  2. loading / error state manage karna
 *  3. status filter + search apply karna (client-side)
 *  4. FilterToolbar + TeamGrid ko render karna
 *
 * "View team" click hone par abhi console.log ho raha hai —
 * isko apni routing (react-router / next navigation) se replace
 * kar dena, e.g. navigate(`/teams/${teamId}`)
 */

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  useEffect(() => {
    const handleOpenCreateTeamModal = () => {
      setIsCreateModalOpen(true);
    };

    window.addEventListener("openCreateTeamModal", handleOpenCreateTeamModal);

    return () => {
      window.removeEventListener("openCreateTeamModal", handleOpenCreateTeamModal);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadTeams() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchTeams();
        if (isMounted) setTeams(data);
      } catch (err) {
        if (isMounted) setError(err.message ?? "Unknown error");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadTeams();
    return () => {
      isMounted = false;
    };
  }, []);

  // Counts for the filter pills — derived from the full team list,
  // so numbers stay correct even while a filter/search is active.
  const counts = useMemo(
    () => ({
      all: teams.length,
      not_started: teams.filter((t) => t.status === "not_started").length,
      in_progress: teams.filter((t) => t.status === "in_progress").length,
      completed: teams.filter((t) => t.status === "completed").length,
      under_review: teams.filter((t) => t.status === "under_review").length
    }),
    [teams]
  );

  const filteredTeams = useMemo(() => {
    return teams.filter((team) => {
      const matchesFilter =
        activeFilter === "all" || team.status === activeFilter;

      const matchesSearch = team.name
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [teams, activeFilter, searchQuery]);

  function handleViewTeam(teamId) {
    setSelectedTeamId(teamId);
  }

  async function handleCreateTeam(newTeam) {
    // createTeam abhi mock hai (data/teams.js) — backend ready hone par
    // wahi ek file update karni hai, yahan kuch change nahi karna.
    const savedTeam = await createTeam(newTeam);
    setTeams((prev) => [savedTeam, ...prev]);
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-[var(--container)] mx-auto px-lg py-2xl">

        <FilterToolbar
          counts={counts}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="mt-lg">
          <TeamGrid
            teams={filteredTeams}
            isLoading={isLoading}
            error={error}
            onViewTeam={handleViewTeam}
          />
        </div>
      </div>

      <CreateTeamModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateTeam}
      />

      {selectedTeamId && (
        <TeamDetails 
          teamId={selectedTeamId} 
          onClose={() => setSelectedTeamId(null)} 
        />
      )}
    </div>
  );
}
