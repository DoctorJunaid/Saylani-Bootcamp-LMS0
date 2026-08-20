import React, { useEffect } from "react";
import { X } from "lucide-react";

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  footer,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widths = { sm: "420px", md: "520px", lg: "640px", xl: "800px" };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1400,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1rem"
    }}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)"
        }}
      />

      {/* Dialog */}
      <div
        style={{
          position: "relative", zIndex: 10,
          width: "100%", maxWidth: widths[size] || widths.md,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-card)",
          boxShadow: "0 24px 64px rgba(11,35,66,.15), 0 4px 16px rgba(0,0,0,.08)",
          display: "flex", flexDirection: "column",
          maxHeight: "90vh",
          animation: "modalIn 200ms ease-out"
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "1.5rem 1.75rem 1rem",
          borderBottom: "1px solid var(--border)"
        }}>
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.2rem", fontWeight: 600
          }}>{title}</h3>
          <button
            onClick={onClose}
            className="modal-close"
          >
            <X style={{ width: "18px", height: "18px" }} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div style={{
          padding: "1.5rem 1.75rem",
          overflowY: "auto",
          flex: 1,
          minHeight: 0
        }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "flex-end",
            gap: "0.65rem",
            padding: "1rem 1.75rem",
            background: "var(--bg)",
            borderTop: "1px solid var(--border)",
            borderRadius: "0 0 var(--radius-card) var(--radius-card)"
          }}>
            {footer}
          </div>
        )}
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};
