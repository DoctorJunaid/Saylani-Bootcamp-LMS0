/**
 * StatusBadge
 * ---------------------------------------------------------------
 * Chhota pill-shaped badge jo project/team ki current status
 * dikhata hai. Backend se aane wala "status" field seedha yahan
 * pass ho sakta hai — koi extra mapping frontend me nahi karni.
 *
 * Backend contract (expected value for `status`):
 *   "not_started" | "in_progress" | "completed"
 *
 * Agar backend kabhi koi naya status bheje (e.g. "on_hold"),
 * to sirf STATUS_STYLES object me ek naya entry add karna hoga —
 * baaki kahin kuch change nahi karna padega.
 */

const STATUS_STYLES = {
  not_started: {
    label: "Not Started",
    className: "bg-surface-container text-text-muted border border-border",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-warning/10 text-warning border border-warning/20",
  },
  completed: {
    label: "Completed",
    className: "bg-success/10 text-success border border-success/20",
  },
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.not_started;

  return (
    <span
      className={`inline-flex items-center rounded-full px-md py-xs text-xs font-weight-medium ${style.className}`}
    >
      {style.label}
    </span>
  );
}