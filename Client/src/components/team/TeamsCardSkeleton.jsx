import Skeleton from "../ui/Skeleton";

export default function TeamCardSkeleton() {
  return (
    <div className="min-w-[260px] rounded-xl border border-border border-l-[5px] border-l-primary bg-surface p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-7 w-28 rounded-full shrink-0" />
      </div>

      <Skeleton className="mt-3 h-4 w-24" />

      <div className="mt-4 rounded-lg border border-border px-4 py-3">
        <Skeleton className="h-5 w-44" />
        <div className="mt-2 flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-36" />
        </div>
      </div>

      <Skeleton className="mt-5 h-4 w-24" />
    </div>
  );
}
