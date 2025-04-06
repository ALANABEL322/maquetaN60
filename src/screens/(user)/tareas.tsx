import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Users, BarChart3 } from "lucide-react";

type Priority = "Alta" | "Media" | "Baja";
type Status = "por-hacer" | "en-curso" | "finalizada";

interface Task {
  id: string;
  name: string;
  description: string;
  registrationDate: string;
  deadline: string;
  priority: Priority;
  status: Status;
}

const sampleTasks: Task[] = [
  {
    id: "1",
    name: "Nombre de la tarea",
    description: "Descripción",
    registrationDate: "10/04/2024",
    deadline: "20/04/2024",
    priority: "Alta",
    status: "por-hacer",
  },
  {
    id: "2",
    name: "Nombre de la tarea",
    description: "Descripción",
    registrationDate: "11/04/2024",
    deadline: "21/04/2024",
    priority: "Alta",
    status: "por-hacer",
  },
  {
    id: "3",
    name: "Nombre de la tarea",
    description: "Descripción",
    registrationDate: "12/04/2024",
    deadline: "22/04/2024",
    priority: "Alta",
    status: "por-hacer",
  },
  {
    id: "4",
    name: "Nombre de la tarea",
    description: "Descripción",
    registrationDate: "13/04/2024",
    deadline: "23/04/2024",
    priority: "Alta",
    status: "en-curso",
  },
  {
    id: "5",
    name: "Nombre de la tarea",
    description: "Descripción",
    registrationDate: "14/04/2024",
    deadline: "24/04/2024",
    priority: "Alta",
    status: "en-curso",
  },
  {
    id: "6",
    name: "Nombre de la tarea",
    description: "Descripción",
    registrationDate: "15/04/2024",
    deadline: "25/04/2024",
    priority: "Alta",
    status: "finalizada",
  },
];

export default function TaskDashboard() {
  const [tasks, _setTasks] = useState<Task[]>(sampleTasks);

  const todoTasks = tasks.filter((task) => task.status === "por-hacer");
  const inProgressTasks = tasks.filter((task) => task.status === "en-curso");
  const completedTasks = tasks.filter((task) => task.status === "finalizada");

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Tareas</h1>
          <p className="text-muted-foreground">
            Aquí se pueden visualizar tus tareas
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

      <h2 className="text-xl font-semibold mb-4">Vistos recientemente</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-red-200 text-red-800 py-2 px-4 rounded-md text-center font-medium">
            Por Hacer
          </div>
          <div className="space-y-4">
            {todoTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-amber-200 text-amber-800 py-2 px-4 rounded-md text-center font-medium">
            En Curso
          </div>
          <div className="space-y-4">
            {inProgressTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-green-200 text-green-800 py-2 px-4 rounded-md text-center font-medium">
            Finalizada
          </div>
          <div className="space-y-4">
            {completedTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
  const statusColors = {
    "por-hacer": "bg-red-50",
    "en-curso": "bg-amber-50",
    finalizada: "bg-green-50",
  };

  const priorityColors = {
    Alta: "bg-red-200 text-red-800",
    Media: "bg-amber-200 text-amber-800",
    Baja: "bg-blue-200 text-blue-800",
  };

  return (
    <Card className={`${statusColors[task.status]} border-none shadow-sm`}>
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

        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-sm text-muted-foreground mr-2">
              Prioridad
            </span>
            <Badge className={`${priorityColors[task.priority]} font-normal`}>
              {task.priority}
            </Badge>
          </div>

          <Button
            variant="secondary"
            className="bg-slate-700 hover:bg-slate-800 text-white"
          >
            <Eye className="h-4 w-4 mr-1" />
            Ver
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
