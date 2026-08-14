import Skeleton from "../ui/Skeleton";

/**
 * Dashboard-style clickable status cards used as filters on Teams / Projects / Tasks.
 * Optional per-filter: icon (lucide component), tone (tailwind text color class).
 */
export default function StatusFilterCards({
  filters,
  counts,
  activeFilter,
  onFilterChange,
  isLoading = false,
}) {
  const count = filters?.length ?? 4;
  const gridClass =
    count <= 4
      ? "grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4"
      : "grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";

  if (isLoading) {
    return (
      <div className={gridClass} aria-busy="true" aria-label="Loading status counts">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex items-start justify-between rounded-[var(--radius-xl)] border border-[var(--color-surface-high)] bg-[var(--color-surface)] p-[var(--spacing-lg)] shadow-[var(--shadow-sm)]"
          >
            <div className="w-full">
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="mt-2 h-7 w-12" />
            </div>
            <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={gridClass} role="tablist" aria-label="Status filters">
      {filters.map(({ key, label, icon: Icon, tone }) => {
        const isActive = activeFilter === key;
        const iconTone = tone || "text-[var(--color-primary)]";
        return (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onFilterChange(key)}
            className={`flex items-start justify-between text-left rounded-[var(--radius-xl)] border bg-[var(--color-surface)] p-[var(--spacing-lg)] shadow-[var(--shadow-sm)] transition-all duration-[var(--duration-normal)] cursor-pointer hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-container)] ${
              isActive
                ? "border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]/30 bg-[var(--color-primary-container)]/10"
                : "border-[var(--color-surface-high)]"
            }`}
          >
            <div className="min-w-0 pr-2">
              <p className="text-sm font-medium text-[var(--color-text-muted)]">
                {label}
              </p>
              <p className="mt-[var(--spacing-xs)] text-2xl font-bold text-[var(--color-text)]">
                {counts[key] ?? 0}
              </p>
            </div>
            {Icon ? (
              <div className={`rounded-lg shrink-0 ${iconTone}`}>
                <Icon size={22} strokeWidth={2} aria-hidden />
              </div>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
