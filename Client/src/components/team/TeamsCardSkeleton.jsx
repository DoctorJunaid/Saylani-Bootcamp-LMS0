export default function TeamCardSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-xl shadow-sm p-lg animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="h-5 w-32 rounded bg-surface-high"></div>
        <div className="h-6 w-20 rounded-full bg-surface-high"></div>
      </div>

      {/* Members */}
      <div className="h-4 w-24 rounded bg-surface-high mt-3"></div>

      {/* Project Box */}
      <div className="mt-4 border border-border rounded-lg p-md">
        <div className="h-5 w-40 rounded bg-surface-high"></div>

        <div className="flex items-center gap-2 mt-3">
          <div className="w-4 h-4 rounded bg-surface-high"></div>
          <div className="h-4 w-28 rounded bg-surface-high"></div>
        </div>
      </div>

      {/* Button */}
      <div className="h-4 w-24 rounded bg-surface-high mt-5"></div>
    </div>
  );
}