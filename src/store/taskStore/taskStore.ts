import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Priority,
  AIRecommendationType,
  Task,
  Comment,
  TaskInput,
  Member,
  AIRecommendation,
  Status,
  TaskStatus,
} from "@/types/typesTask";
import { statusToGanttStatus } from "@/types/typesTask";

interface TaskStore {
  tasks: Task[];
  aiRecommendations: Record<string, AIRecommendation[]>;
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
  // Métodos para recomendaciones de IA
  generateAIRecommendations: (projectId: string) => AIRecommendation[];
  applyRecommendation: (projectId: string, recommendationId: string) => void;
  getRecommendationsByProject: (projectId: string) => AIRecommendation[];
  markRecommendationAsApplied: (
    projectId: string,
    recommendationId: string
  ) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      aiRecommendations: {},

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
          ganttStatus: "not-started" as TaskStatus,
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
              ? {
                  ...task,
                  status: newStatus,
                  updatedAt: now,
                  ganttStatus: statusToGanttStatus[newStatus],
                }
              : task
          ),
        }));
      },

      addComment: (taskId, comment: Comment) => {
        const now = new Date().toISOString();
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id === taskId) {
              if (task.comments?.length >= 5) return task;

              return {
                ...task,
                comments: [
                  ...(task.comments || []),
                  {
                    id: comment.id,
                    memberId: comment.memberId,
                    content: comment.content,
                    createdAt: comment.createdAt,
                  },
                ],
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

      // Métodos para recomendaciones de IA
      generateAIRecommendations: (projectId) => {
        const tasks = get().getTasksByProject(projectId);
        const todoTasks = get().getTasksByStatus(projectId, "por-hacer");
        const now = new Date();

        const recommendations: AIRecommendation[] = [];

        // 1. Tareas pendientes (>5)
        if (todoTasks.length > 5) {
          recommendations.push({
            id: `rec-many-tasks-${Date.now()}`,
            title: "Demasiadas tareas pendientes",
            description: `Hay ${todoTasks.length} tareas en "Por Hacer". Considera asignar más miembros o priorizar.`,
            type: "reallocation",
            action: "assign-members",
            priority: "alta",
            relatedTasks: todoTasks.map((t) => t.id),
          });
        }

        // 2. Tareas con campos incompletos
        const incompleteTasks = tasks.filter(
          (task) => !task.name || !task.description || !task.deadline
        );

        if (incompleteTasks.length > 0) {
          recommendations.push({
            id: `rec-incomplete-${Date.now()}`,
            title: "Tareas con información incompleta",
            description: `${incompleteTasks.length} tareas tienen campos vacíos (nombre, descripción o fecha).`,
            type: "improvement",
            action: "complete-fields",
            priority: "media",
            relatedTasks: incompleteTasks.map((t) => t.id),
          });
        }

        // 3. Tareas atrasadas
        const overdueTasks = tasks.filter(
          (task) =>
            task.status !== "finalizada" &&
            task.deadline &&
            new Date(task.deadline) < now
        );

        if (overdueTasks.length > 0) {
          recommendations.push({
            id: `rec-overdue-${Date.now()}`,
            title: "Tareas atrasadas",
            description: `${overdueTasks.length} tareas han pasado su fecha límite.`,
            type: "improvement",
            action: "review-overdue",
            priority: "alta",
            relatedTasks: overdueTasks.map((t) => t.id),
          });
        }

        // 4. Tareas sin asignar
        const unassignedTasks = tasks.filter(
          (task) => task.assignedMembers.length === 0
        );

        if (unassignedTasks.length > 0) {
          recommendations.push({
            id: `rec-unassigned-${Date.now()}`,
            title: "Tareas sin asignar",
            description: `${unassignedTasks.length} tareas no tienen responsables asignados.`,
            type: "reallocation",
            action: "assign-members",
            priority: "media",
            relatedTasks: unassignedTasks.map((t) => t.id),
          });
        }

        // 5. Distribución desigual de tareas
        const memberWorkload: Record<string, number> = {};
        tasks.forEach((task) => {
          task.assignedMembers.forEach((memberId) => {
            memberWorkload[memberId] = (memberWorkload[memberId] || 0) + 1;
          });
        });

        const workloadEntries = Object.entries(memberWorkload);
        if (workloadEntries.length > 1) {
          const sortedWorkload = workloadEntries.sort((a, b) => b[1] - a[1]);
          const [busiestId, busiestCount] = sortedWorkload[0];
          const [leastBusyId, leastBusyCount] =
            sortedWorkload[sortedWorkload.length - 1];

          if (busiestCount - leastBusyCount > 2) {
            recommendations.push({
              id: `rec-workload-${Date.now()}`,
              title: "Distribución desigual de trabajo",
              description: `El miembro más ocupado tiene ${busiestCount} tareas mientras que el menos ocupado tiene ${leastBusyCount}.`,
              type: "reallocation",
              action: "assign-members",
              priority: "media",
              relatedMembers: [busiestId, leastBusyId],
            });
          }
        }

        const priorityOrder = { alta: 1, media: 2, baja: 3 };
        const finalRecommendations = recommendations
          .sort((a, b) => {
            const aPriority = a.priority || "baja";
            const bPriority = b.priority || "baja";
            return priorityOrder[aPriority] - priorityOrder[bPriority];
          })
          .slice(0, 5);

        set((state) => ({
          aiRecommendations: {
            ...state.aiRecommendations,
            [projectId]: finalRecommendations,
          },
        }));

        return finalRecommendations;
      },

      applyRecommendation: (projectId, recommendationId) => {
        const recommendation = get()
          .getRecommendationsByProject(projectId)
          .find((r) => r.id === recommendationId);

        if (!recommendation) return;

        get().markRecommendationAsApplied(projectId, recommendationId);

        console.log("Aplicando recomendación:", recommendation);
      },

      markRecommendationAsApplied: (projectId, recommendationId) => {
        set((state) => ({
          aiRecommendations: {
            ...state.aiRecommendations,
            [projectId]: (state.aiRecommendations[projectId] || []).map((r) =>
              r.id === recommendationId
                ? { ...r, applied: true, appliedAt: new Date().toISOString() }
                : r
            ),
          },
        }));
      },

      getRecommendationsByProject: (projectId) => {
        return get().aiRecommendations[projectId] || [];
      },
    }),
    {
      name: "task-storage",
      partialize: (state) => ({
        tasks: state.tasks,
        aiRecommendations: state.aiRecommendations,
      }),
      version: 3, 
      migrate: (persistedState: any, version) => {
        return persistedState;
      },
    }
  )
);

export type { Task as TaskType };
export type { Member as MemberType };
export type { TaskInput as TaskInputType };
export type { AIRecommendation as AIRecommendationType };
export type { Comment as CommentType };
