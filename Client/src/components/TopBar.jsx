
import { Bell, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopBar({
  title,
  subtitle,
  showNotification = true,
  onNotificationClick,
  showButton = false,
  buttonText = "Add",
  buttonIcon: ButtonIcon = Plus,
  onButtonClick,
})
    
 {
   const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between border-b border-border bg-surface px-lg py-md">
      <div>
        <h1 className="text-lg font-semibold text-text">{title}</h1>
        {subtitle ? (
          <p className="mt-1 text-sm font-normal text-text-muted">
            {subtitle}
          </p>
        ) : null}
      </div>

      <div className="flex items-center gap-md">
        {showNotification ? (
          <button
            type="button"
            onClick={() => (onNotificationClick ? onNotificationClick() : navigate("/teams"))}
            aria-label="Notifications"
            className="rounded-lg p-2 text-text-muted transition-colors duration-fast hover:bg-yellow-500 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            <Bell size={20} strokeWidth={2} />
          </button>
        ) : null}

        {showButton ? (
          <button
            type="button"
            onClick={onButtonClick}
            className="flex items-center gap-sm rounded-md bg-primary px-md py-sm text-sm font-medium text-on-primary transition-colors duration-fast hover:bg-on-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2"
          >
            <ButtonIcon size={16} strokeWidth={2.5} />
            <span>{buttonText}</span>
          </button>
        ) : null}
      </div>
    </header>
  );
}