import React, { useState, useEffect } from "react";
import TaskStats from "../../components/taskComponents/TaskStats";
import TaskTable from "../../components/taskComponents/TaskTable";
import EditTaskModal from "../../components/taskComponents/EditTaskModal";
import DeleteConfirmModal from "../../components/taskComponents/DeleteConfirmModal";
import { getTasks, createTask, updateTask, deleteTask } from "../../api/task.api";
import { getStudents } from "../../api/student.api";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteConfirmState, setDeleteConfirmState] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      if (res.success) {
        const formattedTasks = res.data.map((task) => ({
          id: task._id,
          title: task.title,
          subtitle: task.description || "",
          status: task.status,
          assignedTo: {
            id: task.studentId?._id,
            name: task.studentId?.name || "Unassigned",
            avatarText: (task.studentId?.name || "U").substring(0, 2).toUpperCase(),
            avatarBg: "bg-gray-100 text-gray-700",
          },
          dueDate: task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Date",
          updateStatus: task.status,
        }));
        setTasks(formattedTasks);
      }
      
      const stdRes = await getStudents();
      if (stdRes.students) {
        setStudents(stdRes.students);
      }
    } catch (error) {
      console.error("Error fetching tasks or students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    const handleOpen = () => {
      setEditingTask(null);
      setCreateModalOpen(true);
    };
    window.addEventListener('openCreateTask', handleOpen);
    return () => window.removeEventListener('openCreateTask', handleOpen);
  }, []);

  const handleSaveTask = async (taskData) => {
    try {
      const student = students.find((s) => s.name === taskData.assignedTo.name);
      if (!student) {
        alert("Please select a valid student.");
        return;
      }
      const taskPayload = {
        title: taskData.title,
        description: taskData.subtitle,
        status: taskData.status,
        dueDate: taskData.dueDate,
        studentId: student._id
      };

      if (editingTask) {
        await updateTask(editingTask.id, taskPayload);
      } else {
        await createTask(taskPayload);
      }
      fetchTasks();
      setEditingTask(null);
      setCreateModalOpen(false);
    } catch (error) {
      console.error("Error saving task", error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setCreateModalOpen(true);
  };

  const handleDeleteTasks = (taskIds) => {
    return new Promise((resolve, reject) => {
      setDeleteConfirmState({ ids: taskIds, resolve, reject });
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmState) return;
    const { ids, resolve } = deleteConfirmState;
    try {
      setLoading(true);
      await Promise.all(ids.map(id => deleteTask(id)));
      fetchTasks();
      resolve();
    } catch (error) {
      console.error("Error deleting tasks", error);
      setLoading(false);
    } finally {
      setDeleteConfirmState(null);
    }
  };

  const handleCancelDelete = () => {
    if (deleteConfirmState) {
      deleteConfirmState.reject();
      setDeleteConfirmState(null);
    }
  };

  // Compute stats
  const totalTasks = tasks.length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;

  const assigneeOptions = students.map((s) => ({
    name: s.name,
    avatarText: s.name.substring(0, 2).toUpperCase(),
    avatarBg: "bg-gray-100 text-gray-700"
  }));

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 bg-[var(--color-background)] min-h-screen">
      <TaskStats 
        totalTasks={totalTasks}
        inProgress={inProgress}
        completed={completed}
      />

      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-4 sm:p-6 shadow-[var(--shadow-sm)]">
        <TaskTable 
          externalTasks={tasks} 
          loading={loading} 
          fetchTasks={fetchTasks} 
          onEditTask={handleEditTask}
          onDeleteTasks={handleDeleteTasks}
        />
      </div>

      {(createModalOpen || editingTask) && (
        <EditTaskModal
          task={editingTask}
          mode={editingTask ? "edit" : "create"}
          onClose={() => {
            setCreateModalOpen(false);
            setEditingTask(null);
          }}
          onSave={handleSaveTask}
          dynamicAssignees={assigneeOptions.length > 0 ? assigneeOptions : undefined}
        />
      )}

      <DeleteConfirmModal 
        isOpen={!!deleteConfirmState}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        count={deleteConfirmState?.ids?.length || 0}
      />
    </div>
  );
};

export default Task;
