import React from "react";
import { LuCircleAlert, LuX } from "react-icons/lu";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, count }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-[var(--color-surface)] rounded-2xl shadow-2xl border border-[var(--color-border)] w-[90%] sm:w-[400px] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)] shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-[var(--color-error)]/10 p-2 rounded-full">
              <LuCircleAlert className="h-5 w-5 text-[var(--color-error)]" />
            </div>
            <h2 className="text-lg font-bold text-[var(--color-text)]">
              Delete Tasks
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-low)] rounded-full transition-colors cursor-pointer"
          >
            <LuX className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5">
          <p className="text-sm text-[var(--color-text-muted)]">
            Are you sure you want to delete {count} task{count !== 1 ? 's' : ''}? This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 p-5 pt-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] bg-transparent hover:bg-[var(--color-surface-low)] rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-error)] hover:bg-[var(--color-error)]/90 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
