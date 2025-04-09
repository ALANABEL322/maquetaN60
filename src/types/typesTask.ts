export type Priority = "Alta" | "Media" | "Baja";

export type Status = "por-hacer" | "en-curso" | "finalizada";
export type TaskStatus = "completed" | "incomplete" | "not-started";

export const statusToGanttStatus: Record<Status, TaskStatus> = {
  "por-hacer": "not-started",
  "en-curso": "incomplete",
  finalizada: "completed",
};

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
  startWeek?: number;
  endWeek?: number;
  ganttStatus?: TaskStatus;
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
  startWeek?: number;
  endWeek?: number;
  ganttStatus?: TaskStatus;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  type: AIRecommendationType;
  relatedTaskId?: string;
  applied?: boolean;
}

export type AIRecommendationType = "improvement" | "new-task" | "reallocation";

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
  currentWeek: number;
}
