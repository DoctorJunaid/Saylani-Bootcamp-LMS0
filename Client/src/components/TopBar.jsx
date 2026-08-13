import { useState } from "react";
import { Bell, Plus } from "lucide-react";
import NotificationPanel from "./NotificationPanel";

export default function TopBar({
  title,
  subtitle,
  showNotification = true,
  onNotificationClick,
  showButton = false,
  buttonText = "Add",
  buttonIcon: ButtonIcon = Plus,
  onButtonClick,
  notifications = [],
}) {
  const [showPanel, setShowPanel] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);

  const handleBellClick = () => {
    if (onNotificationClick) {
      onNotificationClick();
    }
    setShowPanel((prev) => !prev);
  };

  return (
    <header className="flex items-center justify-between border-b border-border bg-surface px-6 py-4">
      <div>
        <h1 className="text-lg font-semibold text-text">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm font-normal text-text-muted">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {showNotification && (
          <div className="relative">
            <button
              type="button"
              onClick={handleBellClick}
              aria-label="Notifications"
              className="rounded-lg p-2 text-text-muted transition-colors duration-200 hover:bg-yellow-500 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
            >
              <Bell size={20} strokeWidth={2} />
            </button>

            {showPanel && (
              <NotificationPanel
                notifications={notificationsRead ? [] : notifications}
                onClose={() => setShowPanel(false)}
                onMarkAllRead={() => setNotificationsRead(true)}
              />
            )}
          </div>
        )}

        {showButton && (
          <button
            type="button"
            onClick={onButtonClick}
            className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary transition-colors duration-200 hover:bg-on-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2"
          >
            <ButtonIcon size={16} strokeWidth={2.5} />
            <span>{buttonText}</span>
          </button>
        )}
      </div>
    </header>
  );
}
