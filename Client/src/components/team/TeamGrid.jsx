import TeamCard from "./TeamsCard";
import TeamCardSkeleton from "./TeamsCardSkeleton";

/** Wider cards (min 300px) so project / deadline / status stay on one line */
const GRID_CLASS =
  "grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

export default function TeamGrid({ teams, isLoading, error, onViewTeam }) {
  if (isLoading) {
    return (
      <div className={GRID_CLASS}>
        {[...Array(6)].map((_, index) => (
          <TeamCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-error">Teams load nahi ho paayi: {error}</p>
    );
  }

  if (!teams || teams.length === 0) {
    return (
      <p className="text-sm text-text-muted">Abhi koi team nahi bani.</p>
    );
  }

  return (
    <div className={GRID_CLASS}>
      {teams.map((team) => (
        <TeamCard
          key={team._id || team.id}
          team={team}
          onViewTeam={onViewTeam}
        />
      ))}
    </div>
  );
}
