import { storage } from "../utils/storage";

const MOCK_TASKS = [
  {
    _id: "task-1",
    title: "Build REST API endpoints for attendance",
    description: "Create robust API endpoints with Mongoose and Express.",
    dueDate: new Date().toISOString(),
    status: "in_progress",
    category: "Backend",
    priority: "high"
  },
  {
    _id: "task-2",
    title: "Submit attendance controller PR",
    description: "Refactor the controllers and submit a PR for review.",
    dueDate: new Date().toISOString(),
    status: "pending",
    category: "Backend",
    priority: "med"
  },
  {
    _id: "task-3",
    title: "Design student dashboard wireframe",
    description: "Use Figma to mock up the dashboard.",
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
    status: "pending",
    category: "Design",
    priority: "med"
  },
  {
    _id: "task-4",
    title: "Set up MongoDB Atlas cluster",
    description: "Provision a free tier cluster for production.",
    dueDate: new Date(Date.now() - 86400000 * 4).toISOString(), // 4 days ago
    status: "completed",
    submissionLink: "https://cloud.mongodb.com/...",
    category: "DevOps",
    priority: "high"
  }
];

export const tasksService = {
  getTasks: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In real app, this would be an axios call
        const stored = localStorage.getItem("mock_tasks");
        if (stored) {
          resolve(JSON.parse(stored));
        } else {
          localStorage.setItem("mock_tasks", JSON.stringify(MOCK_TASKS));
          resolve(MOCK_TASKS);
        }
      }, 600); // simulate network delay
    });
  },

  submitTask: async (taskId, submissionData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const stored = localStorage.getItem("mock_tasks");
        let tasks = stored ? JSON.parse(stored) : [...MOCK_TASKS];
        
        const index = tasks.findIndex(t => t._id === taskId);
        if (index === -1) {
          reject(new Error("Task not found"));
          return;
        }

        // Simulate validation error for testing
        if (!submissionData.link || !submissionData.link.startsWith("http")) {
          reject(new Error("Please provide a valid URL starting with http:// or https://"));
          return;
        }

        // Update task
        tasks[index] = {
          ...tasks[index],
          status: "completed",
          submissionLink: submissionData.link,
          submissionDescription: submissionData.description,
          submittedAt: new Date().toISOString()
        };

        localStorage.setItem("mock_tasks", JSON.stringify(tasks));
        resolve(tasks[index]);
      }, 1000);
    });
  }
};
