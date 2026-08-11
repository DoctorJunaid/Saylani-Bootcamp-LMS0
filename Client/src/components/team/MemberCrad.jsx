/**
 * MemberCard
 * ---------------------------------------------------------------
 * Ek single team member — TeamDetails page ke "Team Members"
 * section me list ke andar use hota hai.
 *
 * Props:
 *  - member: { id, name, role, email }
 */

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function MemberCard({ member }) {
  const { name, role, email } = member;

  return (
    <div className="bg-surface-low border border-border rounded-lg p-md flex items-center gap-md">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-container text-on-primary-container text-sm font-weight-semibold shrink-0">
        {getInitials(name)}
      </div>

      <div className="min-w-0">
        <p className="text-sm font-weight-semibold text-text truncate">
          {name}
        </p>
        <p className="text-xs text-text-muted truncate">{role}</p>
        <p className="text-xs text-text-muted truncate">{email}</p>
      </div>
    </div>
  );
}