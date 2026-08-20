import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { FolderGit2, FileText } from "lucide-react";
import { taskService } from "../../services/task.service";
import toast from "react-hot-toast";

export const TaskSubmissionModal = ({ isOpen, onClose, task, onSuccess }) => {
  const [submissionUrl, setSubmissionUrl] = useState(task?.submissionUrl || "");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!submissionUrl.trim()) {
      toast.error("Please enter a valid GitHub or live project URL.");
      return;
    }

    setLoading(true);
    try {
      await taskService.submitTask(task._id || task.id, {
        submissionUrl,
        notes,
      });
      toast.success("Task work submitted successfully!");
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.message || "Failed to submit task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Submit Assignment: ${task?.title || ""}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Repository or Live Project URL"
          placeholder="https://github.com/username/project-repo"
          icon={FolderGit2}
          value={submissionUrl}
          onChange={(e) => setSubmissionUrl(e.target.value)}
          required
        />

        <div>
          <label className="block text-xs font-semibold text-[var(--color-text)] mb-1.5 uppercase tracking-wider">
            Submission Notes & Comments
          </label>
          <textarea
            rows={3}
            placeholder="Add any notes for the instructor / evaluator..."
            className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-3 text-sm text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-[var(--color-border)]">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            Confirm Submission
          </Button>
        </div>
      </form>
    </Modal>
  );
};
