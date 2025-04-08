import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Users, BarChart3, Plus, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useParams } from "react-router-dom";
import { useCreateProjectStore } from "@/store/createProject/createProjectStore";
import {
  Member,
  Task,
  useTaskStore,
  type Priority,
  type Status,
  type Comment,
} from "@/store/taskStore/taskStore";
import { toast } from "sonner";
import { TaskDetailsModal } from "@/components/taskModalDetail";

export default function Tareas() {
  const { projectId } = useParams();
  const { getTeamById } = useCreateProjectStore();
  const project = useCreateProjectStore((state) =>
    state.projects.find((p) => p.id === projectId)
  );
  const team = project ? getTeamById(project.teamId) : null;
  const {
    addTask,
    assignMember,
    unassignMember,
    getTasksByStatus,
    updateTask,
  } = useTaskStore();

  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const handleDrop = (status: Status) => {
    if (!draggedTaskId) return;
    updateTask(draggedTaskId, { status });
    setDraggedTaskId(null);
  };

  const handlePriorityChange = (taskId: string, newPriority: Priority) => {
    updateTask(taskId, { priority: newPriority });
  };

  const addNewTask = (status: Status) => {
    if (!projectId) {
      toast.error("No se puede crear la tarea: Proyecto no encontrado");
      return;
    }

    if (!project) {
      toast.error("No se puede crear la tarea: Proyecto inválido");
      return;
    }

    addTask({
      projectId,
      name: `Tarea ${getTasksByStatus(projectId, status).length + 1}`,
      description: "",
      registrationDate: new Date().toLocaleDateString("es-ES"),
      deadline: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toLocaleDateString("es-ES"),
      priority: "Media",
      status,
      assignedMembers: [],
    });
  };

  const assignMemberToTask = (taskId: string, memberId: string) => {
    assignMember(taskId, memberId);
  };

  const unassignMemberFromTask = (taskId: string, memberId: string) => {
    unassignMember(taskId, memberId);
  };

  const todoTasks = projectId ? getTasksByStatus(projectId, "por-hacer") : [];
  const inProgressTasks = projectId
    ? getTasksByStatus(projectId, "en-curso")
    : [];
  const completedTasks = projectId
    ? getTasksByStatus(projectId, "finalizada")
    : [];

  if (!projectId || !project) {
    return (
      <div className="container mx-auto p-4 max-w-7xl">
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold mb-4">Proyecto no encontrado</h1>
          <p className="text-muted-foreground">
            No se ha podido cargar el proyecto solicitado
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            Tareas del proyecto: {project?.title || "Proyecto no encontrado"}
          </h1>
          <p className="text-muted-foreground">
            Gestiona las tareas de tu equipo
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Miembros</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Monitoreo</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TaskColumn
          title="Por Hacer"
          status="por-hacer"
          tasks={todoTasks}
          onDrop={handleDrop}
          setDraggedTaskId={setDraggedTaskId}
          onPriorityChange={handlePriorityChange}
          onAddTask={addNewTask}
          teamMembers={team?.members || []}
          onAssignMember={assignMemberToTask}
          onUnassignMember={unassignMemberFromTask}
          onUpdateTask={updateTask}
        />

        <TaskColumn
          title="En Curso"
          status="en-curso"
          tasks={inProgressTasks}
          onDrop={handleDrop}
          setDraggedTaskId={setDraggedTaskId}
          onPriorityChange={handlePriorityChange}
          onAddTask={addNewTask}
          teamMembers={team?.members || []}
          onAssignMember={assignMemberToTask}
          onUnassignMember={unassignMemberFromTask}
          onUpdateTask={updateTask}
        />

        <TaskColumn
          title="Finalizada"
          status="finalizada"
          tasks={completedTasks}
          onDrop={handleDrop}
          setDraggedTaskId={setDraggedTaskId}
          onPriorityChange={handlePriorityChange}
          onAddTask={addNewTask}
          teamMembers={team?.members || []}
          onAssignMember={assignMemberToTask}
          onUnassignMember={unassignMemberFromTask}
          onUpdateTask={updateTask}
        />
      </div>
    </div>
  );
}

function TaskColumn({
  title,
  status,
  tasks,
  onDrop,
  setDraggedTaskId,
  onPriorityChange,
  onAddTask,
  teamMembers,
  onAssignMember,
  onUnassignMember,
  currentMemberId,
}: {
  title: string;
  status: Status;
  tasks: Task[];
  onDrop: (status: Status) => void;
  setDraggedTaskId: React.Dispatch<React.SetStateAction<string | null>>;
  onPriorityChange: (taskId: string, newPriority: Priority) => void;
  onAddTask: (status: Status) => void;
  teamMembers: Member[];
  onAssignMember: (taskId: string, memberId: string) => void;
  onUnassignMember: (taskId: string, memberId: string) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  currentMemberId?: string;
}) {
  const statusColors = {
    "por-hacer": "bg-red-200 text-red-800",
    "en-curso": "bg-amber-200 text-amber-800",
    finalizada: "bg-green-200 text-green-800",
  };

  return (
    <div
      className="space-y-4"
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(status)}
    >
      <div className="flex items-center justify-between">
        <div
          className={`${statusColors[status]} py-2 px-4 rounded-md text-center font-medium`}
        >
          {title}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={() => onAddTask(status)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Agregar
        </Button>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            setDraggedTaskId={setDraggedTaskId}
            onPriorityChange={onPriorityChange}
            teamMembers={teamMembers}
            onAssignMember={onAssignMember}
            onUnassignMember={onUnassignMember}
            currentMemberId={currentMemberId}
          />
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No hay tareas en esta sección
          </div>
        )}
      </div>
    </div>
  );
}

function TaskCard({
  task,
  setDraggedTaskId,
  onPriorityChange,
  teamMembers,
  onAssignMember,
  onUnassignMember,
  currentMemberId,
}: {
  task: Task;
  setDraggedTaskId: React.Dispatch<React.SetStateAction<string | null>>;
  onPriorityChange: (taskId: string, newPriority: Priority) => void;
  teamMembers: Member[];
  onAssignMember: (taskId: string, memberId: string) => void;
  onUnassignMember: (taskId: string, memberId: string) => void;
  currentMemberId?: string;
}) {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { updateTask } = useTaskStore();

  const handleSaveDetails = (updatedDetails: {
    name: string;
    startDate: string;
    endDate: string;
    description: string;
    comments: Comment[];
  }) => {
    updateTask(task.id, {
      name: updatedDetails.name,
      description: updatedDetails.description,
      registrationDate: updatedDetails.startDate,
      deadline: updatedDetails.endDate,
      comments: updatedDetails.comments,
    });
  };

  const statusColors = {
    "por-hacer": "bg-red-50",
    "en-curso": "bg-amber-50",
    finalizada: "bg-green-50",
  };

  return (
    <Card
      className={`${
        statusColors[task.status]
      } border-none shadow-sm cursor-move`}
      draggable
      onDragStart={() => setDraggedTaskId(task.id)}
    >
      <CardContent className="p-4">
        <h3 className="font-medium text-lg mb-2">{task.name}</h3>
        <div className="flex justify-between items-center w-full">
          <span className="text-sm text-muted-foreground">Prioridad:</span>

          <div className="flex items-center gap-2">
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                task.priority === "Alta"
                  ? "bg-red-100 text-red-600"
                  : "text-red-500 hover:bg-red-50"
              }`}
              onClick={() => onPriorityChange(task.id, "Alta")}
            >
              Alta
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                task.priority === "Media"
                  ? "bg-yellow-100 text-yellow-700"
                  : "text-yellow-600 hover:bg-yellow-50"
              }`}
              onClick={() => onPriorityChange(task.id, "Media")}
            >
              Media
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                task.priority === "Baja"
                  ? "bg-green-100 text-green-600"
                  : "text-green-500 hover:bg-green-50"
              }`}
              onClick={() => onPriorityChange(task.id, "Baja")}
            >
              Baja
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[auto,1fr] gap-x-2 text-sm mb-4">
          <span className="text-muted-foreground">Fecha de inicio</span>
          <span className="text-right">{task.registrationDate}</span>

          <span className="text-muted-foreground">Fecha límite</span>
          <span className="text-right">{task.deadline}</span>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">Miembros:</span>
            <div className="flex -space-x-2">
              {task.assignedMembers
                .map((memberId) => teamMembers.find((m) => m.id === memberId))
                .filter(Boolean)
                .map((member) => (
                  <img
                    key={member!.id}
                    src={member!.photo}
                    alt={`${member!.firstName} ${member!.lastName}`}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <AssignMemberModal
              task={task}
              teamMembers={teamMembers}
              onAssignMember={onAssignMember}
              onUnassignMember={onUnassignMember}
            />
          </div>

          <div>
            <Button
              variant="secondary"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setIsDetailsModalOpen(true)}
            >
              <Eye className="h-4 w-4" />
              <span>Ver</span>
            </Button>
          </div>
        </div>
        <TaskDetailsModal
          task={task}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          onSave={handleSaveDetails}
          currentMemberId={currentMemberId}
          teamMembers={teamMembers}
        />
      </CardContent>
    </Card>
  );
}

function AssignMemberModal({
  task,
  teamMembers,
  onAssignMember,
  onUnassignMember,
}: {
  task: Task;
  teamMembers: Member[];
  onAssignMember: (taskId: string, memberId: string) => void;
  onUnassignMember: (taskId: string, memberId: string) => void;
}) {
  const MAX_MEMBERS = 5;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <UserPlus className="h-4 w-4 mr-1" />
          Miembros ({task.assignedMembers.length}/{MAX_MEMBERS})
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Gestión de miembros: {task.name}
            <span className="block text-sm font-normal text-muted-foreground">
              {task.assignedMembers.length}/{MAX_MEMBERS} miembros asignados
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {teamMembers.map((member) => {
            const isAssigned = task.assignedMembers.includes(member.id);
            const isFull =
              task.assignedMembers.length >= MAX_MEMBERS && !isAssigned;

            return (
              <div
                key={member.id}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={member.photo}
                      alt={`${member.firstName} ${member.lastName}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "";
                        target.parentElement!.innerHTML = `
                          <span class="w-full h-full flex items-center justify-center bg-gray-200 text-xs">
                            ${member.firstName[0]}${member.lastName[0]}
                          </span>
                        `;
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-medium">
                      {member.firstName} {member.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {member.email}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {isAssigned ? (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onUnassignMember(task.id, member.id)}
                    >
                      Quitar
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onAssignMember(task.id, member.id)}
                      disabled={isFull}
                    >
                      Asignar
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
