import { useState } from "react";

/**
 * FilterToolbar
 * ---------------------------------------------------------------
 * Top bar: search icon (click to expand into input) + status
 * filter pills with live counts.
 *
 * Props:
 *  - counts: { all, not_started, in_progress, completed } (numbers)
 *  - activeFilter: "all" | "not_started" | "in_progress" | "completed"
 *  - onFilterChange: (filter: string) => void
 *  - searchQuery: string
 *  - onSearchChange: (value: string) => void
 */

const FILTERS = [
  { key: "all", label: "All Teams" },
  { key: "not_started", label: "Not Started" },
  { key: "in_progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
];

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default function FilterToolbar({
  counts,
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function handleSearchToggle() {
    if (isSearchOpen && searchQuery) {
      onSearchChange("");
    }
    setIsSearchOpen((open) => !open);
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-md pb-lg border-b border-border">
      {/* Search */}
      <div className="flex items-center gap-sm">
        <button
          type="button"
          onClick={handleSearchToggle}
          aria-label="Search teams"
          className="flex items-center justify-center bg-surface border border-border rounded-lg p-sm text-text-muted hover:text-text transition-colors duration-fast"
        >
          <SearchIcon />
        </button>

        {isSearchOpen && (
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search teams..."
            className="bg-surface border border-border rounded-lg px-md py-sm text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors duration-fast"
          />
        )}
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-sm flex-wrap">
        {FILTERS.map(({ key, label }) => {
          const isActive = activeFilter === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onFilterChange(key)}
              className={`flex items-center gap-sm rounded-md px-lg py-sm text-sm font-weight-medium transition-colors duration-fast ${
                isActive
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-text hover:bg-surface-high"
              }`}
            >
              {label}
              <span
                className={`inline-flex items-center justify-center min-w-[20px] rounded-md px-xs text-xs font-weight-semibold ${
                  isActive
                    ? "bg-on-primary/20 text-on-primary"
                    : "bg-surface-high text-text-muted"
                }`}
              >
                {counts[key] ?? 0}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}