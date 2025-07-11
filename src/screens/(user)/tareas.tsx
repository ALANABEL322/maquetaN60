import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Eye,
  BarChart3,
  Plus,
  UserPlus,
  Trash2,
  ChevronDown,
  Pencil,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCreateProjectStore } from "@/store/createProject/createProjectStore";
import { useTaskStore } from "@/store/taskStore/taskStore";
import { Priority, Status, Comment, Member, Task } from "@/types/typesTask";
import { toast } from "sonner";
import { TaskDetailsModal } from "@/components/taskModalDetail";
import ManageReinforcements from "@/components/manageReinforcements";
import { cn } from "@/lib/utils";
import ProjectSelector from "@/components/ProjectSelector";

export default function Tareas() {
  const location = useLocation();
  const { projectId } = useParams();
  const { getTeamById, reinforcements, projects } = useCreateProjectStore();

  // Si no hay proyectos en absoluto, mostramos el selector
  if (projects.length === 0) {
    return (
      <ProjectSelector
        mode="tareas"
        title="Selecciona un proyecto"
        description="Elige el proyecto para el cual deseas gestionar las tareas"
      />
    );
  }

  // Si no hay projectId, usamos el primer proyecto disponible
  const effectiveProjectId = projectId || projects[0].id;
  const effectiveProject = projects.find((p) => p.id === effectiveProjectId);

  const team = effectiveProject ? getTeamById(effectiveProject.teamId) : null;
  const {
    addTask,
    assignMember,
    unassignMember,
    getTasksByStatus,
    updateTask,
    deleteTask,
  } = useTaskStore();

  const allAvailableMembers = [...(team?.members || []), ...reinforcements];

  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.focus) {
      switch (location.state.focus) {
        case "assign-members":
          break;
        case "complete-fields":
          break;
      }
    }
  }, [location.state]);

  const handleDrop = (targetStatus: Status, targetTaskId?: string) => {
    if (!draggedTaskId) return;

    const allTasks = [...todoTasks, ...inProgressTasks, ...completedTasks];
    const draggedTask = allTasks.find((task) => task.id === draggedTaskId);

    if (!draggedTask) return;

    // Si se suelta sobre otra tarea, intercambiar posiciones
    if (targetTaskId && targetTaskId !== draggedTaskId) {
      const targetTask = allTasks.find((task) => task.id === targetTaskId);

      if (targetTask) {
        // Intercambiar posiciones
        updateTask(draggedTaskId, { status: targetTask.status });
        updateTask(targetTaskId, { status: draggedTask.status });
      }
    } else {
      // Solo cambiar el status
      updateTask(draggedTaskId, { status: targetStatus });
    }

    setDraggedTaskId(null);
  };

  const handlePriorityChange = (taskId: string, newPriority: Priority) => {
    updateTask(taskId, { priority: newPriority });
  };

  const addNewTask = (status: Status) => {
    if (!effectiveProjectId) {
      toast.error("No se puede crear la tarea: Proyecto no encontrado");
      return;
    }

    if (!effectiveProject) {
      toast.error("No se puede crear la tarea: Proyecto inválido");
      return;
    }

    addTask({
      projectId: effectiveProjectId,
      name: `Tarea ${getTasksByStatus(effectiveProjectId, status).length + 1}`,
      description: "",
      registrationDate: new Date().toLocaleDateString("es-ES"),
      deadline: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toLocaleDateString("es-ES"),
      priority: "media",
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

  const todoTasks = effectiveProjectId
    ? getTasksByStatus(effectiveProjectId, "por-hacer")
    : [];
  const inProgressTasks = effectiveProjectId
    ? getTasksByStatus(effectiveProjectId, "en-curso")
    : [];
  const completedTasks = effectiveProjectId
    ? getTasksByStatus(effectiveProjectId, "finalizada")
    : [];

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            Tareas del proyecto:{" "}
            {effectiveProject?.title || "Proyecto no encontrado"}
          </h1>
          <p className="text-muted-foreground">
            Gestiona las tareas de tu equipo
          </p>
        </div>

        <div className="flex gap-2 mt-4 md:mt-0">
          <ManageReinforcements />
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate(`/user/monitoreo/${effectiveProjectId}`)}
          >
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
          teamMembers={allAvailableMembers}
          onAssignMember={assignMemberToTask}
          onUnassignMember={unassignMemberFromTask}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          draggedTaskId={draggedTaskId}
        />

        <TaskColumn
          title="En Curso"
          status="en-curso"
          tasks={inProgressTasks}
          onDrop={handleDrop}
          setDraggedTaskId={setDraggedTaskId}
          onPriorityChange={handlePriorityChange}
          onAddTask={addNewTask}
          teamMembers={allAvailableMembers}
          onAssignMember={assignMemberToTask}
          onUnassignMember={unassignMemberFromTask}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          draggedTaskId={draggedTaskId}
        />

        <TaskColumn
          title="Finalizada"
          status="finalizada"
          tasks={completedTasks}
          onDrop={handleDrop}
          setDraggedTaskId={setDraggedTaskId}
          onPriorityChange={handlePriorityChange}
          onAddTask={addNewTask}
          teamMembers={allAvailableMembers}
          onAssignMember={assignMemberToTask}
          onUnassignMember={unassignMemberFromTask}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          draggedTaskId={draggedTaskId}
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
  onUpdateTask,
  onDeleteTask,
  draggedTaskId,
  currentMemberId,
}: {
  title: string;
  status: Status;
  tasks: Task[];
  onDrop: (targetStatus: Status, targetTaskId?: string) => void;
  setDraggedTaskId: React.Dispatch<React.SetStateAction<string | null>>;
  onPriorityChange: (taskId: string, newPriority: Priority) => void;
  onAddTask: (status: Status) => void;
  teamMembers: Member[];
  onAssignMember: (taskId: string, memberId: string) => void;
  onUnassignMember: (taskId: string, memberId: string) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
  draggedTaskId: string | null;
  currentMemberId?: string;
}) {
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const statusColors = {
    "por-hacer": "bg-red-200 text-red-800",
    "en-curso": "bg-amber-200 text-amber-800",
    finalizada: "bg-green-200 text-green-800",
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedTaskId) {
      setIsDraggedOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    // Solo quitar el efecto si realmente salimos del área de la columna
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDraggedOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggedOver(false);
    onDrop(status);
  };

  return (
    <div className={cn("space-y-4")}>
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

      {/* Área de drop mejorada */}
      <div
        className={cn(
          "min-h-[200px] rounded-lg transition-all duration-200",
          "border-2 border-dashed",
          isDraggedOver && draggedTaskId
            ? "border-blue-400 bg-blue-50"
            : tasks.length === 0
            ? "border-gray-300 bg-gray-50"
            : "border-transparent"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-4 p-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              setDraggedTaskId={setDraggedTaskId}
              onPriorityChange={onPriorityChange}
              teamMembers={teamMembers}
              onAssignMember={onAssignMember}
              onUnassignMember={onUnassignMember}
              onDeleteTask={onDeleteTask}
              onDrop={onDrop}
              draggedTaskId={draggedTaskId}
              currentMemberId={currentMemberId}
            />
          ))}

          {(tasks.length === 0 || (isDraggedOver && draggedTaskId)) && (
            <div
              className={cn(
                "flex items-center justify-center h-32 text-center rounded-lg transition-all duration-200",
                isDraggedOver && draggedTaskId
                  ? "bg-blue-100 border-2 border-dashed border-blue-400"
                  : "bg-gray-100 border-2 border-dashed border-gray-300"
              )}
            >
              <div className="text-muted-foreground">
                {isDraggedOver && draggedTaskId ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <Plus className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-blue-700">
                      Suelta aquí para mover
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                      <Plus className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm">Arrastra tarjetas aquí</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
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
  onDeleteTask,
  onDrop,
  draggedTaskId,
  currentMemberId,
}: {
  task: Task;
  setDraggedTaskId: React.Dispatch<React.SetStateAction<string | null>>;
  onPriorityChange: (taskId: string, newPriority: Priority) => void;
  teamMembers: Member[];
  onAssignMember: (taskId: string, memberId: string) => void;
  onUnassignMember: (taskId: string, memberId: string) => void;
  onDeleteTask: (id: string) => void;
  onDrop: (targetStatus: Status, targetTaskId?: string) => void;
  draggedTaskId: string | null;
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
    setIsDetailsModalOpen(false);
  };

  const handleDeleteTask = () => {
    toast(`¿Estás seguro de que quieres eliminar "${task.name}"?`, {
      action: {
        label: "Eliminar",
        onClick: () => {
          onDeleteTask(task.id);
          toast.success("Tarea eliminada correctamente");
        },
      },
      cancel: {
        label: "Cancelar",
        onClick: () => {},
      },
      cancelButtonStyle: {
        color: "#000",
        backgroundColor: "#FAFAFA",
      },
      actionButtonStyle: {
        backgroundColor: "#EF4444",
        color: "#FFFFFF",
      },
      className: "bg-white",
    });
  };

  const handlePriorityChange = (newPriority: Priority) => {
    onPriorityChange(task.id, newPriority);
    toast.success(`Prioridad cambiada a ${newPriority}`);
  };

  const priorityColors = {
    baja: "bg-green-100 text-green-800",
    media: "bg-yellow-100 text-yellow-800",
    alta: "bg-red-100 text-red-800",
  };

  const isBeingDragged = draggedTaskId === task.id;

  return (
    <>
      <Card
        className={cn(
          "cursor-move transition-all duration-200 hover:shadow-md",
          isBeingDragged ? "opacity-50 scale-95" : ""
        )}
        draggable
        onDragStart={() => setDraggedTaskId(task.id)}
        onDragEnd={() => setDraggedTaskId(null)}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (draggedTaskId && draggedTaskId !== task.id) {
            onDrop(task.status, task.id);
          }
        }}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-medium text-sm line-clamp-2">{task.name}</h3>
            <div className="flex items-center gap-1">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                    title="Ver detalles"
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Detalles de la tarea</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Nombre:</p>
                      <p className="text-sm text-muted-foreground">
                        {task.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Descripción:</p>
                      <p className="text-sm text-muted-foreground">
                        {task.description || "Sin descripción"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Fecha límite:</p>
                      <p className="text-sm text-muted-foreground">
                        {task.deadline}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Prioridad:</p>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          priorityColors[task.priority]
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <AssignMemberModal
                task={task}
                teamMembers={teamMembers}
                onAssignMember={onAssignMember}
                onUnassignMember={onUnassignMember}
              />
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-muted-foreground hover:text-red-500"
                onClick={handleDeleteTask}
                title="Eliminar tarea"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-auto px-2 py-1 rounded-full text-xs font-medium ${
                    priorityColors[task.priority]
                  } hover:opacity-80`}
                >
                  {task.priority}
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => handlePriorityChange("baja")}
                  className="text-green-600"
                >
                  Baja
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handlePriorityChange("media")}
                  className="text-yellow-600"
                >
                  Media
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handlePriorityChange("alta")}
                  className="text-red-600"
                >
                  Alta
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                onClick={() => setIsDetailsModalOpen(true)}
                title="Editar detalles"
              >
                <Pencil className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex -space-x-2">
              {task.assignedMembers.slice(0, 3).map((memberId) => {
                const member = teamMembers.find((m) => m.id === memberId);
                return member ? (
                  <div
                    key={member.id}
                    className="w-6 h-6 rounded-full overflow-hidden border-2 border-white"
                  >
                    <img
                      src={member.photo}
                      alt={`${member.firstName} ${member.lastName}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://www.gravatar.com/avatar/?d=mp";
                      }}
                    />
                  </div>
                ) : null;
              })}
              {task.assignedMembers.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center border-2 border-white text-xs">
                  +{task.assignedMembers.length - 3}
                </div>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {task.deadline}
            </span>
          </div>
        </CardContent>
      </Card>

      <TaskDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        task={task}
        onSave={handleSaveDetails}
        teamMembers={teamMembers}
      />
    </>
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
  const [open, setOpen] = useState(false);

  const handleMemberToggle = (memberId: string) => {
    if (task.assignedMembers.includes(memberId)) {
      onUnassignMember(task.id, memberId);
    } else {
      onAssignMember(task.id, memberId);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
        >
          <UserPlus className="h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Asignar miembros</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-2 rounded hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <img
                  src={member.photo}
                  alt={`${member.firstName} ${member.lastName}`}
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://www.gravatar.com/avatar/?d=mp";
                  }}
                />
                <div>
                  <p className="text-sm font-medium">
                    {member.firstName} {member.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{member.email}</p>
                </div>
              </div>
              <Button
                variant={
                  task.assignedMembers.includes(member.id)
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => handleMemberToggle(member.id)}
              >
                {task.assignedMembers.includes(member.id)
                  ? "Asignado"
                  : "Asignar"}
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
