import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Priority = "Alta" | "Media" | "Baja";
export type Status = "por-hacer" | "en-curso" | "finalizada";

export interface Task {
  id: string;
  projectId: string;
  name: string;
  description: string;
  registrationDate: string;
  deadline: string;
  priority: Priority;
  status: Status;
  assignedMembers: string[];
  createdAt?: string;
  updatedAt?: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  memberId: string;
  content: string;
  createdAt: string;
}

export interface TaskInput {
  projectId: string;
  name?: string;
  description?: string;
  registrationDate?: string;
  deadline?: string;
  priority?: Priority;
  status: Status;
  assignedMembers?: string[];
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: TaskInput) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  assignMember: (taskId: string, memberId: string) => void;
  unassignMember: (taskId: string, memberId: string) => void;
  getTasksByProject: (projectId: string) => Task[];
  getTasksByStatus: (projectId: string, status: Status) => Task[];
  getTaskById: (id: string) => Task | undefined;
  moveTask: (taskId: string, newStatus: Status) => void;
  addComment: (taskId: string, comment: Comment) => void;
  removeComment: (taskId: string, commentId: string) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (task) => {
        const now = new Date().toISOString().split("T")[0];
        const defaultTask = {
          name: "Nueva Tarea",
          description: "",
          registrationDate: now,
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          priority: "Media" as Priority,
          assignedMembers: [],
          ...task,
        };

        const newTask: Task = {
          ...defaultTask,
          id: Date.now().toString(),
          createdAt: now,
          updatedAt: now,
          comments: [],
        };

        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },

      updateTask: (id, updates) => {
        const now = new Date().toISOString().split("T")[0];
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  ...updates,
                  updatedAt: now,
                }
              : task
          ),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      assignMember: (taskId, memberId) => {
        const now = new Date().toISOString();
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id === taskId) {
              if (task.assignedMembers.length >= 5) return task;
              if (task.assignedMembers.includes(memberId)) return task;

              return {
                ...task,
                assignedMembers: [...task.assignedMembers, memberId],
                updatedAt: now,
              };
            }
            return task;
          }),
        }));
      },

      unassignMember: (taskId, memberId) => {
        const now = new Date().toISOString();
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  assignedMembers: task.assignedMembers.filter(
                    (id) => id !== memberId
                  ),
                  updatedAt: now,
                }
              : task
          ),
        }));
      },

      getTasksByProject: (projectId) => {
        return get()
          .tasks.filter((task) => task.projectId === projectId)
          .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
      },

      getTasksByStatus: (projectId, status) => {
        return get()
          .getTasksByProject(projectId)
          .filter((task) => task.status === status);
      },

      getTaskById: (id) => {
        return get().tasks.find((task) => task.id === id);
      },

      moveTask: (taskId, newStatus) => {
        const now = new Date().toISOString();
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, status: newStatus, updatedAt: now }
              : task
          ),
        }));
      },

      addComment: (taskId, comment) => {
        const now = new Date().toISOString();
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id === taskId) {
              if (task.comments?.length >= 5) return task;

              return {
                ...task,
                comments: [...(task.comments || []), comment],
                updatedAt: now,
              };
            }
            return task;
          }),
        }));
      },

      removeComment: (taskId, commentId) => {
        const now = new Date().toISOString();
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id === taskId) {
              return {
                ...task,
                comments: (task.comments || []).filter(
                  (c) => c.id !== commentId
                ),
                updatedAt: now,
              };
            }
            return task;
          }),
        }));
      },
    }),
    {
      name: "task-storage",
      partialize: (state) => ({ tasks: state.tasks }),
      version: 1,
    }
  )
);

export type { Task as TaskType };
export type { Member as MemberType };
export type { TaskInput as TaskInputType };
