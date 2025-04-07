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
}

// Definimos el tipo Member basado en tu estructura
export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  assignMember: (taskId: string, memberId: string) => void;
  unassignMember: (taskId: string, memberId: string) => void;
  getTasksByProject: (projectId: string) => Task[];
  getTasksByStatus: (projectId: string, status: Status) => Task[];
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (task) => {
        const newTask = {
          ...task,
          id: Date.now().toString(),
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      assignMember: (taskId, memberId) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  assignedMembers: [...task.assignedMembers, memberId],
                }
              : task
          ),
        }));
      },

      unassignMember: (taskId, memberId) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  assignedMembers: task.assignedMembers.filter(
                    (id) => id !== memberId
                  ),
                }
              : task
          ),
        }));
      },

      getTasksByProject: (projectId) => {
        return get().tasks.filter((task) => task.projectId === projectId);
      },

      getTasksByStatus: (projectId, status) => {
        return get()
          .tasks.filter((task) => task.projectId === projectId)
          .filter((task) => task.status === status);
      },
    }),
    {
      name: "task-storage",
      partialize: (state) => ({ tasks: state.tasks }),
    }
  )
);
