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
} from "@/store/taskStore/taskStore";

export default function Tareas() {
  const { projectId } = useParams();
  const { getTeamById } = useCreateProjectStore();
  const project = useCreateProjectStore((state) =>
    state.projects.find((p) => p.id === projectId)
  );
  const team = project ? getTeamById(project.teamId) : null;

  // Usamos el store de tareas
  const { addTask, updateTask, assignMember, getTasksByStatus } =
    useTaskStore();

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
    if (!projectId) return;

    addTask({
      projectId,
      name: "Nueva Tarea",
      description: "Descripción de la tarea",
      registrationDate: new Date().toLocaleDateString(),
      deadline: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
      priority: "Media",
      status,
      assignedMembers: [],
    });
  };

  const assignMemberToTask = (taskId: string, memberId: string) => {
    assignMember(taskId, memberId);
  };

  // Obtenemos tareas filtradas por estado usando selectores del store
  const todoTasks = getTasksByStatus(projectId!, "por-hacer");
  const inProgressTasks = getTasksByStatus(projectId!, "en-curso");
  const completedTasks = getTasksByStatus(projectId!, "finalizada");

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
        {/* Por Hacer */}
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
        />

        {/* En Curso */}
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
        />

        {/* Finalizada */}
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
}: {
  task: Task;
  setDraggedTaskId: React.Dispatch<React.SetStateAction<string | null>>;
  onPriorityChange: (taskId: string, newPriority: Priority) => void;
  teamMembers: Member[];
  onAssignMember: (taskId: string, memberId: string) => void;
}) {
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

        <div className="grid grid-cols-[auto,1fr] gap-x-2 text-sm mb-4">
          <span className="text-muted-foreground">Descripción</span>
          <span className="text-right">{task.description}</span>

          <span className="text-muted-foreground">Fecha de inscripción</span>
          <span className="text-right">{task.registrationDate}</span>

          <span className="text-muted-foreground">Fecha límite</span>
          <span className="text-right">{task.deadline}</span>
        </div>

        {/* Miembros asignados */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">Miembros:</span>
            <div className="flex -space-x-2">
              {task.assignedMembers
                .map((memberId) => teamMembers.find((m) => m.id === memberId))
                .filter(Boolean)
                .map((member) => (
                  <div
                    key={member!.id}
                    className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white text-xs"
                  >
                    {member!.firstName[0]}
                    {member!.lastName[0]}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Prioridad:</span>
            <select
              className="text-sm bg-transparent border border-gray-300 rounded-md px-2 py-1"
              value={task.priority}
              onChange={(e) =>
                onPriorityChange(task.id, e.target.value as Priority)
              }
            >
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>

          <div className="flex gap-2">
            <AssignMemberModal
              task={task}
              teamMembers={teamMembers}
              onAssignMember={onAssignMember}
            />
            <Button variant="secondary" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Ver
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AssignMemberModal({
  task,
  teamMembers,
  onAssignMember,
}: {
  task: Task;
  teamMembers: Member[];
  onAssignMember: (taskId: string, memberId: string) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <UserPlus className="h-4 w-4 mr-1" />
          Asignar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Asignar miembros a: {task.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  {member.firstName[0]}
                  {member.lastName[0]}
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
              <Button
                variant={
                  task.assignedMembers.includes(member.id)
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => onAssignMember(task.id, member.id)}
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
