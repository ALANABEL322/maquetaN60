import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Priority,
  Status,
  TaskStatus,
  AIRecommendationType,
  Task,
  Comment,
  TaskInput,
  Member,
  AIRecommendation,
} from "@/types/typesTask";

interface TaskStore {
  tasks: Task[];
  aiRecommendations: Record<string, AIRecommendation[]>; // Mapeo por projectId
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
                  // Actualizar estado en Gantt si corresponde
                  ganttStatus:
                    newStatus === "finalizada"
                      ? "completed"
                      : newStatus === "en-curso"
                      ? "incomplete"
                      : "not-started",
                }
              : task
          ),
        }));
      },

      addComment: (taskId, comment: Comment) => {
        // Asegurar el tipo aquí
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
        const now = new Date();

        // Analizar tareas para generar recomendaciones
        const recommendations: AIRecommendation[] = [];

        // 1. Verificar tareas atrasadas
        const overdueTasks = tasks.filter((task) => {
          const deadline = new Date(task.deadline);
          return deadline < now && task.status !== "finalizada";
        });

        if (overdueTasks.length > 0) {
          recommendations.push({
            id: `rec-overdue-${Date.now()}`,
            title: "Tareas atrasadas",
            description: `Hay ${overdueTasks.length} tareas que han pasado su fecha límite sin completarse. Considera reasignar recursos o ajustar prioridades.`,
            type: "improvement",
            relatedTaskId: overdueTasks[0].id, // Enlazar a la primera tarea atrasada
          });
        }

        // 2. Verificar distribución de carga
        const memberTasks: Record<string, number> = {};
        tasks.forEach((task) => {
          task.assignedMembers.forEach((memberId) => {
            memberTasks[memberId] = (memberTasks[memberId] || 0) + 1;
          });
        });

        const memberEntries = Object.entries(memberTasks);
        if (memberEntries.length > 0) {
          const [busiestMemberId, busiestCount] = memberEntries.reduce(
            (max, entry) => (entry[1] > max[1] ? entry : max)
          );
          const [leastBusyMemberId, leastBusyCount] = memberEntries.reduce(
            (min, entry) => (entry[1] < min[1] ? entry : min)
          );

          if (busiestCount - leastBusyCount > 2) {
            recommendations.push({
              id: `rec-balance-${Date.now()}`,
              title: "Distribución desigual de tareas",
              description: `Hay una diferencia significativa en la carga de trabajo entre miembros. El miembro más ocupado tiene ${busiestCount} tareas mientras que el menos ocupado tiene ${leastBusyCount}.`,
              type: "reallocation",
            });
          }
        }

        // 3. Verificar tareas sin asignar
        const unassignedTasks = tasks.filter(
          (task) => task.assignedMembers.length === 0
        );
        if (unassignedTasks.length > 0) {
          recommendations.push({
            id: `rec-unassigned-${Date.now()}`,
            title: "Tareas sin asignar",
            description: `Hay ${unassignedTasks.length} tareas sin miembros asignados. Considera asignar responsables para estas tareas.`,
            type: "reallocation",
            relatedTaskId: unassignedTasks[0].id,
          });
        }

        // 4. Verificar dependencias temporales (para Gantt)
        const ganttTasks = tasks.filter(
          (task) => task.startWeek && task.endWeek
        );
        if (ganttTasks.length > 1) {
          // Buscar solapamientos
          const sortedTasks = [...ganttTasks].sort(
            (a, b) => (a.startWeek || 0) - (b.startWeek || 0)
          );

          for (let i = 0; i < sortedTasks.length - 1; i++) {
            const current = sortedTasks[i];
            const next = sortedTasks[i + 1];

            if ((current.endWeek || 0) > (next.startWeek || 0)) {
              recommendations.push({
                id: `rec-overlap-${Date.now()}-${i}`,
                title: "Solapamiento en el cronograma",
                description: `Las tareas "${current.name}" y "${next.name}" se solapan en el diagrama de Gantt. Considera ajustar las fechas para evitar conflictos.`,
                type: "improvement",
                relatedTaskId: current.id,
              });
              break;
            }
          }
        }

        // Guardar las recomendaciones generadas
        set((state) => ({
          aiRecommendations: {
            ...state.aiRecommendations,
            [projectId]: recommendations,
          },
        }));

        return recommendations;
      },

      applyRecommendation: (projectId, recommendationId) => {
        set((state) => {
          const projectRecs = state.aiRecommendations[projectId] || [];
          const updatedRecs = projectRecs.map((rec) =>
            rec.id === recommendationId ? { ...rec, applied: true } : rec
          );

          return {
            aiRecommendations: {
              ...state.aiRecommendations,
              [projectId]: updatedRecs,
            },
          };
        });
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
      version: 2,
      migrate: (persistedState: any, version) => {
        if (version === 0 || version === 1) {
          return {
            ...persistedState,
            aiRecommendations: {},
          };
        }
        return persistedState;
      },
    }
  )
);

export type { Task as TaskType };
export type { Member as MemberType };
export type { TaskInput as TaskInputType };
export type { AIRecommendation as AIRecommendationType };
