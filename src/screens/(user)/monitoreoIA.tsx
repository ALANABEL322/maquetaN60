import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMobile } from "@/hooks/use-mobile";
import { Link, useLocation, useNavigate } from "react-router-dom";

type TaskStatus = "completed" | "incomplete" | "not-started";

interface Task {
  id: string;
  name: string;
  startWeek: number;
  endWeek: number;
  status: TaskStatus;
}

interface Project {
  id: string;
  name: string;
  tasks: Task[];
  currentWeek: number;
}

const sampleProject: Project = {
  id: "1",
  name: "Nombre del proyecto",
  currentWeek: 7,
  tasks: [
    {
      id: "1",
      name: "Determine event themes and goals",
      startWeek: 1,
      endWeek: 3,
      status: "completed",
    },
    {
      id: "2",
      name: "Determine event date and location",
      startWeek: 2,
      endWeek: 4,
      status: "completed",
    },
    {
      id: "3",
      name: "Determine participants and guests",
      startWeek: 3,
      endWeek: 5,
      status: "incomplete",
    },
    {
      id: "4",
      name: "Make an event schedule",
      startWeek: 4,
      endWeek: 7,
      status: "incomplete",
    },
    {
      id: "5",
      name: "Design and produce promotional materials",
      startWeek: 6,
      endWeek: 9,
      status: "not-started",
    },
    {
      id: "6",
      name: "Arrange venue layout and decoration",
      startWeek: 7,
      endWeek: 11,
      status: "not-started",
    },
    {
      id: "7",
      name: "Identify catering and beverage suppliers",
      startWeek: 8,
      endWeek: 10,
      status: "not-started",
    },
    {
      id: "8",
      name: "Planning entertainment programs and speaker arrangements",
      startWeek: 9,
      endWeek: 11,
      status: "not-started",
    },
  ],
};

const statusColors: Record<TaskStatus, string> = {
  completed: "bg-green-400",
  incomplete: "bg-amber-400",
  "not-started": "bg-red-400",
};

export default function MonitoreoIA() {
  const [project, _setProject] = useState<Project>(sampleProject);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMobile();
  const activeTab = location.pathname.includes("monitoreoIA") ? "gantt" : "kpi";

  const handleTabChange = (value: string) => {
    if (value === "gantt") {
      navigate("/user/monitoreoIA");
    } else {
      navigate("/user/monitoreo");
    }
  };

  const weekColumns = [];
  const totalWeeks = 12;
  for (let i = 1; i < totalWeeks; i += 2) {
    weekColumns.push(`Week ${i}-${i + 1}`);
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold">Monitoreo</CardTitle>
            <p className="text-muted-foreground mt-1">
              Aquí podrás ver el progreso de cada proyecto
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline">Miembros</Button>
            <Button variant="outline">Monitoreo</Button>
          </div>
        </div>
        <h2 className="text-xl font-semibold mt-4">{project.name}</h2>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gantt" className="w-full">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="mb-4">
              <TabsTrigger value="gantt" asChild>
                <Link to="/user/monitoreoIA">Vista de Gantt</Link>
              </TabsTrigger>
              <TabsTrigger value="kpi" asChild>
                <Link to="/user/monitoreo">Indicadores KPI</Link>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="gantt">
              {activeTab === "gantt" && (
                <div>Contenido específico para la vista de Gantt</div>
              )}
            </TabsContent>

            <TabsContent value="kpi">
              {activeTab === "kpi" && (
                <div>Contenido específico para los indicadores KPI</div>
              )}
            </TabsContent>
          </Tabs>

          <TabsContent value="gantt" className="w-full">
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-[250px_repeat(6,1fr)] border-b">
                  <div className="p-2"></div>
                  {weekColumns.map((week, index) => (
                    <div
                      key={index}
                      className="p-2 text-center font-medium text-sm"
                    >
                      {week}
                    </div>
                  ))}
                </div>

                {project.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="grid grid-cols-[250px_repeat(6,1fr)] border-b"
                  >
                    <div className="p-2 text-sm">
                      {isMobile ? (
                        <div className="line-clamp-2">{task.name}</div>
                      ) : (
                        <div className="flex justify-end pr-4">{task.name}</div>
                      )}
                    </div>

                    {Array.from({ length: 6 }).map((_, weekIndex) => {
                      const weekStart = weekIndex * 2 + 1;
                      const weekEnd = weekStart + 1;
                      const isInRange =
                        task.startWeek <= weekEnd && task.endWeek >= weekStart;

                      let startOffset = 0;
                      let width = "100%";

                      if (isInRange) {
                        if (task.startWeek > weekStart) {
                          startOffset =
                            ((task.startWeek - weekStart) / 2) * 100;
                        }

                        const cellStart = Math.max(task.startWeek, weekStart);
                        const cellEnd = Math.min(task.endWeek, weekEnd);
                        width = `${((cellEnd - cellStart + 1) / 2) * 100}%`;
                      }

                      return (
                        <div key={weekIndex} className="p-2 relative border-l">
                          {isInRange && (
                            <div
                              className={`absolute h-6 rounded-full ${
                                statusColors[task.status]
                              }`}
                              style={{
                                left: `calc(${startOffset}% + 0.5rem)`,
                                width: `calc(${width} - 1rem)`,
                                top: "50%",
                                transform: "translateY(-50%)",
                              }}
                            />
                          )}

                          {project.currentWeek >= weekStart &&
                            project.currentWeek <= weekEnd && (
                              <div
                                className="absolute top-0 bottom-0 border-l-2 border-dashed border-blue-600"
                                style={{
                                  left: `calc(${
                                    ((project.currentWeek - weekStart) / 2) *
                                    100
                                  }% + 0.5rem)`,
                                }}
                              >
                                {weekIndex === 3 && (
                                  <div className="absolute -bottom-1 -translate-x-1/2 text-xs text-blue-600 font-medium">
                                    Hoy
                                  </div>
                                )}
                              </div>
                            )}
                        </div>
                      );
                    })}
                  </div>
                ))}

                <div className="flex flex-wrap gap-4 mt-6 justify-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full ${statusColors.completed}`}
                    ></div>
                    <span className="text-sm">Completado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full ${statusColors.incomplete}`}
                    ></div>
                    <span className="text-sm">Incompleto</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full ${statusColors["not-started"]}`}
                    ></div>
                    <span className="text-sm">No Iniciado</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <div className="flex justify-between mt-8">
          <Button variant="outline">Ir Atrás</Button>
          <Button className="bg-slate-700 hover:bg-slate-800">
            Recomendaciones de IA
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
