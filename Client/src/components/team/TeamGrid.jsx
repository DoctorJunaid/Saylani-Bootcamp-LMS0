import TeamCard from "./TeamsCard";
export default function TeamGrid({ teams, isLoading, error, onViewTeam }) {
  if (isLoading) {
    return (
      <p className="text-sm text-text-muted">Teams load ho rahi hain...</p>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-error">
        Teams load nahi ho paayi: {error}
      </p>
    );
  }

  if (!teams || teams.length === 0) {
    return (
      <p className="text-sm text-text-muted">Abhi koi team nahi bani.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} onViewTeam={onViewTeam} />
      ))}
    </div>
  );
}