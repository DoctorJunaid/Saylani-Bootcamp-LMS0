
import { Bell, Plus } from "lucide-react";

export default function TopBar({
  title,
  subtitle,
  showNotification = true,
  onNotificationClick,
  showButton = false,
  buttonText = "Add",
  buttonIcon: ButtonIcon = Plus,
  onButtonClick,
}) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-surface px-lg py-md">
      <div>
        <h1 className="text-lg font-semibold text-text">{title}</h1>
        {subtitle ? (
          <p className="mt-1 text-sm text-text-muted">{subtitle}</p>
        ) : null}
      </div>

      <div className="flex items-center gap-md">
        {showNotification ? (
          <button
            type="button"
            onClick={onNotificationClick}
            aria-label="Notifications"
            className="text-text-muted transition-colors duration-fast hover:text-text"
          >
            <Bell size={20} strokeWidth={2} />
          </button>
        ) : null}

        {showButton ? (
          <button
            type="button"
            onClick={onButtonClick}
            className="flex items-center gap-sm rounded-md bg-primary px-md py-sm text-sm font-medium text-on-primary transition-opacity duration-fast hover:opacity-90"
          >
            <ButtonIcon size={16} strokeWidth={2.5} />
            <span>{buttonText}</span>
          </button>
        ) : null}
      </div>
    </header>
  );
}