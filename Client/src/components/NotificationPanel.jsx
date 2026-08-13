import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function NotificationPanel({ notifications, onClose, onMarkAllRead }) {
  const hasNotifications = notifications && notifications.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="absolute right-0 top-full z-50 mt-sm w-80 rounded-lg border border-border bg-surface shadow-md"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-surface-high px-lg py-md">
        <h3 className="text-sm font-semibold text-text">Notifications</h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notifications"
          className="rounded-full p-1 text-text-muted transition-colors duration-fast hover:bg-surface-low hover:text-text"
        >
          <X size={16} strokeWidth={2} />
        </button>
      </div>

      {/* List */}
      <div className="max-h-64 overflow-y-auto">
        {hasNotifications ? (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className="cursor-default border-b border-surface-high px-lg py-md transition-colors duration-fast last:border-b-0 hover:bg-surface-low"
            >
              <p className="text-sm font-medium text-text">{notif.title}</p>
              <p className="mt-xs text-xs text-text-muted">{notif.description}</p>
              <p className="mt-xs text-xs text-text-muted">{notif.time}</p>
            </div>
          ))
        ) : (
          <div className="px-lg py-2xl text-center text-sm text-text-muted">
            No notifications yet
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-surface-high px-lg py-sm text-center">
        {hasNotifications ? (
          <button
            type="button"
            onClick={onMarkAllRead}
            className="text-xs font-medium text-primary underline-offset-2 transition-colors duration-fast hover:underline"
          >
            Mark all as read
          </button>
        ) : (
          <p className="text-xs text-text-muted">No unread notifications</p>
        )}
      </div>
    </motion.div>
  );
}