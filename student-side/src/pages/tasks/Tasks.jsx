import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { List, LayoutGrid, Link as LinkIcon, Loader2 } from "lucide-react";
import { tasksService } from "../../services/tasks.service";
import { Modal } from "../../components/common/Modal";
import toast from "react-hot-toast";

export const Tasks = () => {
  const { setPageTitle } = useOutletContext();
  const [view, setView] = useState("list");
  const [filter, setFilter] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Submission Modal State
  const [selectedTask, setSelectedTask] = useState(null);
  const [submitForm, setSubmitForm] = useState({ link: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setPageTitle("Tasks");
    loadTasks();
  }, [setPageTitle]);

  const loadTasks = async () => {
    try {
      const data = await tasksService.getTasks();
      setTasks(data);
    } catch (err) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setSubmitForm({ link: "", description: "" });
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (!submitForm.link.trim()) {
      toast.error("Please provide a submission URL");
      return;
    }
    setIsSubmitting(true);

    try {
      const updatedTask = await tasksService.submitTask(selectedTask._id, submitForm);
      setTasks(tasks.map(t => t._id === updatedTask._id ? updatedTask : t));
      toast.success("Task submitted successfully!");
      setSelectedTask(null);
    } catch (err) {
      toast.error(err.message || "Failed to submit task");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtering logic
  const pendingTasks = tasks.filter(t => t.status !== "completed");
  const completedTasks = tasks.filter(t => t.status === "completed");

  const filteredTasks = filter === "pending" ? pendingTasks
    : filter === "completed" ? completedTasks
    : tasks;

  // Grouping for list view
  const todayTasks = filteredTasks.filter(t => t.status !== "completed" && new Date(t.dueDate) <= new Date());
  const upcomingTasks = filteredTasks.filter(t => t.status !== "completed" && new Date(t.dueDate) > new Date());
  const doneInView = filteredTasks.filter(t => t.status === "completed");

  return (
    <div className="inner-page active fade-in">
      <div className="page-header-row">
        <div>
          <h1 className="page-headline">Tasks</h1>
          <p className="page-sub">Your assignments from instructors</p>
        </div>
        <div className="view-toggle">
          <button
            className={`view-btn ${view === "list" ? "active" : ""}`}
            onClick={() => setView("list")}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            className={`view-btn ${view === "board" ? "active" : ""}`}
            onClick={() => setView("board")}
            aria-label="Board view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Functional Tab Bar */}
      <div className="tab-bar">
        <button className={`tab-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
          All
        </button>
        <button className={`tab-btn ${filter === "pending" ? "active" : ""}`} onClick={() => setFilter("pending")}>
          Pending
        </button>
        <button className={`tab-btn ${filter === "completed" ? "active" : ""}`} onClick={() => setFilter("completed")}>
          Completed
        </button>
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: "var(--accent)" }} />
        </div>
      ) : view === "list" ? (
        <div id="tasks-list-view">
          {/* Due Soon / Action Required */}
          {todayTasks.length > 0 && (
            <>
              <div className="task-group-label">Action Required</div>
              <div className="card task-list-card">
                {todayTasks.map((task) => (
                  <div className="task-list-row" key={task._id} onClick={() => handleTaskClick(task)} style={{ cursor: "pointer" }}>
                    <div className="task-list-label">
                      <span className="tl-title">{task.title}</span>
                      <div className="tl-meta">
                        <span className={`tag tag-${task.category === 'Design' ? 'clay' : 'green'}`}>{task.category}</span>
                        <span className="priority-dot high" title="Due soon"></span>
                        <span className="tl-due" style={{ color: "var(--danger)" }}>Due soon</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Upcoming */}
          {upcomingTasks.length > 0 && (
            <>
              <div className="task-group-label" style={{ marginTop: "1.5rem" }}>Upcoming Assignments</div>
              <div className="card task-list-card">
                {upcomingTasks.map((task) => (
                  <div className="task-list-row" key={task._id} onClick={() => handleTaskClick(task)} style={{ cursor: "pointer" }}>
                    <div className="task-list-label">
                      <span className="tl-title">{task.title}</span>
                      <div className="tl-meta">
                        <span className={`tag tag-${task.category === 'Design' ? 'clay' : 'green'}`}>{task.category}</span>
                        <span className="tl-due">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Completed */}
          {doneInView.length > 0 && (
            <>
              <div className="task-group-label" style={{ marginTop: "1.5rem" }}>Completed</div>
              <div className="card task-list-card">
                {doneInView.map((task) => (
                  <div className="task-list-row" key={task._id} onClick={() => handleTaskClick(task)} style={{ cursor: "pointer" }}>
                    <div className="task-list-label completed">
                      <span className="tl-title">{task.title}</span>
                      <div className="tl-meta">
                        <span className="tag tag-done">Done</span>
                        <span className="tl-due">Submitted {new Date(task.submittedAt || task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {task.submissionLink && (
                      <a href={task.submissionLink} target="_blank" rel="noreferrer" className="btn-outline" style={{ fontSize: "12px", padding: ".35rem .7rem" }} onClick={(e) => e.stopPropagation()}>
                        <LinkIcon style={{ width: "12px", height: "12px", display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
                        View Work
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {filteredTasks.length === 0 && (
            <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
              No tasks found for this filter.
            </div>
          )}
        </div>
      ) : (
        /* Board View */
        <div id="tasks-board-view">
          <div className="kanban-board">
            <div className="kanban-col">
              <div className="kanban-col-header">
                <span>Pending</span><span className="kanban-count">{pendingTasks.length}</span>
              </div>
              {pendingTasks.map(task => (
                <div className="kanban-card card" key={task._id} onClick={() => handleTaskClick(task)}>
                  <div className="kc-top">
                    <span className={`tag tag-${task.category === 'Design' ? 'clay' : 'green'}`}>{task.category}</span>
                    <span className={`priority-dot ${task.priority}`}></span>
                  </div>
                  <p className="kc-title">{task.title}</p>
                  <div className="kc-bottom">
                    <span className="kc-due">{new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="kanban-col">
              <div className="kanban-col-header">
                <span>Done</span><span className="kanban-count">{completedTasks.length}</span>
              </div>
              {completedTasks.map(task => (
                <div className="kanban-card card" key={task._id} onClick={() => handleTaskClick(task)} style={{ opacity: 0.75 }}>
                  <div className="kc-top">
                    <span className="tag tag-done">Done</span>
                  </div>
                  <p className="kc-title" style={{ textDecoration: "line-through", color: "var(--text-muted)" }}>{task.title}</p>
                  <div className="kc-bottom">
                    <span className="kc-due" style={{ color: "var(--accent)" }}>Submitted</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Assignment Details Modal */}
      <Modal
        isOpen={!!selectedTask}
        onClose={() => !isSubmitting && setSelectedTask(null)}
        title="Assignment Details"
        size="md"
        footer={
          selectedTask?.status === "completed" ? (
            <button type="button" className="btn-outline" onClick={() => setSelectedTask(null)}>Close</button>
          ) : (
            <>
              <button type="button" className="btn-outline" onClick={() => setSelectedTask(null)} disabled={isSubmitting}>Cancel</button>
              <button
                type="button"
                className="btn-primary"
                onClick={handleTaskSubmit}
                disabled={isSubmitting}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSubmitting ? "Submitting..." : "Submit Assignment"}
              </button>
            </>
          )
        }
      >
        {selectedTask && (
          <div>
            {/* Assignment Header */}
            <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {selectedTask.title}
              </h2>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span className={`tag tag-${selectedTask.category === 'Design' ? 'clay' : 'green'}`}>{selectedTask.category}</span>
                <span className="task-due">Due: {new Date(selectedTask.dueDate).toLocaleDateString()}</span>
                {selectedTask.status === 'completed' && <span className="tag tag-done">Completed</span>}
              </div>
            </div>

            {/* Instructions */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 className="about-section-title">Instructions</h4>
              <p style={{ color: 'var(--text)', lineHeight: '1.65', fontSize: '14.5px' }}>
                {selectedTask.description || "No specific instructions provided by the instructor."}
              </p>
            </div>

            {/* Submission Area */}
            {selectedTask.status === "completed" ? (
              <div style={{ padding: '1.25rem', borderRadius: '10px', background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <h4 className="about-section-title">Your Submission</h4>
                <div style={{ marginBottom: '0.75rem' }}>
                  <span className="academic-label">Submitted URL</span>
                  <a href={selectedTask.submissionLink} target="_blank" rel="noreferrer" style={{ display: 'block', color: 'var(--accent)', marginTop: '0.25rem' }}>
                    {selectedTask.submissionLink}
                  </a>
                </div>
                {selectedTask.submissionDescription && (
                  <div>
                    <span className="academic-label">Notes</span>
                    <p style={{ marginTop: '0.25rem' }}>{selectedTask.submissionDescription}</p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h4 className="about-section-title" style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
                  Submit Your Work
                </h4>
                <div className="form-field" style={{ marginBottom: '1rem' }}>
                  <label className="field-label">Submission URL *</label>
                  <input
                    type="url"
                    className="field-input"
                    placeholder="https://github.com/your-repo..."
                    value={submitForm.link}
                    onChange={(e) => setSubmitForm({ ...submitForm, link: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="field-label">Comments / Notes (Optional)</label>
                  <textarea
                    className="field-input field-textarea"
                    placeholder="Any context the reviewer should know..."
                    value={submitForm.description}
                    onChange={(e) => setSubmitForm({ ...submitForm, description: e.target.value })}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};
