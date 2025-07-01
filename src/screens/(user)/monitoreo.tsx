import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CloudIcon, Activity, GanttChartSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCreateProjectStore } from "@/store/createProject/createProjectStore";
import { useTaskStore } from "@/store/taskStore/taskStore";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MonitoreoSteps from "@/components/monitoreoSteps";

export default function Monitoreo() {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const project = useCreateProjectStore((state) =>
    projectId ? state.projects.find((p) => p.id === projectId) : null
  );
  const getTeamById = useCreateProjectStore((state) => state.getTeamById);
  const team = project ? getTeamById(project.teamId) : null;

  const { getTasksByProject } = useTaskStore();
  const tasks = projectId ? getTasksByProject(projectId) : [];

  const [weeklyActivity, setWeeklyActivity] = useState({
    tasks: Array(7).fill(0),
    hours: Array(7).fill(0),
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "finalizada").length;

  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const risksCount = tasks.filter(
    (t) =>
      t.priority === "alta" &&
      (t.status === "por-hacer" || t.status === "en-curso")
  ).length;

  const budgetUsage = Math.min(progress + 15, 100);

  useEffect(() => {
    if (tasks.length > 0) {
      const now = new Date();
      const currentDay = now.getDay();

      const newTaskActivity = Array(7).fill(0);
      const newHoursActivity = Array(7).fill(0);

      tasks.forEach((task) => {
        const taskDay = new Date(task.registrationDate).getDay();
        const dayIndex = (taskDay + 6) % 7;

        newTaskActivity[dayIndex] += 1;
        newHoursActivity[dayIndex] += task.status === "finalizada" ? 8 : 4;
      });

      if (currentDay >= 0 && currentDay < 7) {
        const todayIndex = (currentDay + 6) % 7;
        newTaskActivity[todayIndex] = Math.max(
          newTaskActivity[todayIndex],
          tasks.length / 7
        );
        newHoursActivity[todayIndex] = Math.max(
          newHoursActivity[todayIndex],
          tasks.length * 2
        );
      }

      setWeeklyActivity({
        tasks: newTaskActivity,
        hours: newHoursActivity,
      });
    }
  }, [tasks]);

  const handleTabChange = (value: string) => {
    if (value === "gantt") {
      navigate(`/user/monitoreoIA/${projectId}`);
    } else {
      navigate(`/user/monitoreo/${projectId}`);
    }
  };

  const activeTab = location.pathname.includes("monitoreoIA") ? "gantt" : "kpi";

  const kpiData = [
    {
      title: "Progreso",
      value: `${progress}%`,
      description: "Completado del proyecto",
    },
    {
      title: "Tareas",
      value: `${completedTasks}/${totalTasks}`,
      description: "Tareas completadas",
    },
    {
      title: "Riesgos",
      value: `${risksCount}`,
      description: "Riesgos identificados",
    },
    {
      title: "Presupuesto",
      value: `${budgetUsage}%`,
      description: "Utilizado del total",
    },
  ];

  if (!project) {
    return <MonitoreoSteps />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">
          Monitoreo: {project.title}
        </h1>
        <p className="text-slate-600 mt-1">
          Aquí podrás ver el progreso detallado del proyecto
        </p>
      </header>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span>
            Fecha inicio: {new Date(project.startDate).toLocaleDateString()}
          </span>
          <span>•</span>
          <span>
            Fecha fin: {new Date(project.endDate).toLocaleDateString()}
          </span>
          <span>•</span>
          <span>
            Estado:{" "}
            <span className="font-medium">
              {progress === 0
                ? "No iniciado"
                : progress === 100
                ? "Completado"
                : "En progreso"}
            </span>
          </span>
        </div>

        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <Activity className="mr-2 h-4 w-4" /> Miembros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-2">
              {team ? (
                <div className="space-y-3">
                  <h4 className="text-md font-medium text-center mt-2">
                    {team.name}
                  </h4>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {team.members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center gap-3 p-2 rounded hover:bg-gray-50"
                      >
                        <img
                          src={member.photo}
                          alt={`${member.firstName} ${member.lastName}`}
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src =
                              "https://www.gravatar.com/avatar/?d=mp";
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {member.firstName} {member.lastName}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 p-2">
                  No se encontró información del equipo
                </p>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" className="w-full md:w-auto">
            <GanttChartSquare className="mr-2 h-4 w-4" /> Monitoreo
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        className="w-full"
        onValueChange={handleTabChange}
      >
        <div className="flex justify-between border-b border-gray-200">
          <TabsList className="bg-transparent h-auto p-0 w-full justify-around">
            <TabsTrigger
              value="kpi"
              className={cn(
                "relative w-1/2 rounded-none px-4 py-2 data-[state=active]:shadow-none",
                "text-slate-600 hover:text-primary transition-colors duration-200"
              )}
            >
              Indicadores KPI
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-0.5 mt-2",
                  activeTab === "kpi" ? "bg-blue-500" : "bg-gray-300"
                )}
              ></div>
            </TabsTrigger>
            <TabsTrigger
              value="gantt"
              className={cn(
                "relative w-1/2 rounded-none px-4 py-2 data-[state=active]:shadow-none",
                "text-slate-600 hover:text-primary transition-colors duration-200"
              )}
            >
              Vista de Gantt
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-0.5 mt-2",
                  activeTab === "gantt" ? "bg-blue-500" : "bg-gray-300"
                )}
              ></div>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="kpi" className="mt-6">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpiData.map((kpi, index) => (
                <KpiCard
                  key={index}
                  title={kpi.title}
                  value={kpi.value}
                  description={kpi.description}
                />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <ActivityChart
                title="Actividad de Tareas"
                data={weeklyActivity.tasks}
              />
              <ActivityChart
                title="Horas Trabajadas"
                data={weeklyActivity.hours}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface KpiCardProps {
  title: string;
  value: string;
  description: string;
}

function KpiCard({ title, value, description }: KpiCardProps) {
  return (
    <Card className="overflow-hidden border border-slate-200 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-2">
          <CloudIcon className="h-5 w-5 text-slate-500" />
          <span className="text-sm text-slate-600">{title}</span>
        </div>
        <div className="flex items-end gap-4 mt-2">
          <h3 className="text-4xl font-bold">{value}</h3>
          <p className="text-xs text-slate-500 pb-1">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

interface ActivityChartProps {
  title: string;
  data: number[];
}

function ActivityChart({ title, data }: ActivityChartProps) {
  const days = ["LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM"];
  const maxValue = Math.max(...data);

  return (
    <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-slate-500">Actividad</p>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <Select defaultValue="weekly">
          <SelectTrigger className="w-[120px] h-8 text-sm">
            <SelectValue placeholder="Semanal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Diario</SelectItem>
            <SelectItem value="weekly">Semanal</SelectItem>
            <SelectItem value="monthly">Mensual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative h-[200px] mt-6">
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-500">
          <span>{Math.round(maxValue / 1000)}k</span>
          <span>{Math.round((maxValue * 0.66) / 1000)}k</span>
          <span>{Math.round((maxValue * 0.33) / 1000)}k</span>
          <span>0</span>
        </div>

        <div className="absolute left-8 right-0 top-0 h-full">
          <div className="h-full flex flex-col justify-between">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="border-t border-dashed border-slate-200 h-0"
              ></div>
            ))}
          </div>

          <div className="absolute bottom-6 left-0 right-0 flex justify-between items-end h-[calc(100%-24px)]">
            {days.map((day, index) => {
              const value = data[index];
              const height = `${(value / maxValue) * 100}%`;
              const isMaxValue = value === maxValue;

              return (
                <div key={day} className="flex flex-col items-center">
                  <div className="relative">
                    <div
                      className={`w-8 ${
                        isMaxValue ? "bg-slate-700" : "bg-pink-200"
                      } rounded-t-sm transition-all duration-300`}
                      style={{ height }}
                    ></div>
                    {isMaxValue && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded">
                        {value}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 mt-2">{day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
