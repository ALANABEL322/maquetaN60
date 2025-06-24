import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMobile } from "@/hooks/use-mobile";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCreateProjectStore } from "@/store/createProject/createProjectStore";
import { useTaskStore } from "@/store/taskStore/taskStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Activity, GanttChartSquare, Sparkles, Brain } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { RecommendationCard } from "@/components/recomendationCard";
import { AiRecommendationLoader } from "@/components/IARecomendationLoader";
import { AIRecommendationModal } from "@/components/AIRecommendationModal";
import gsap from "gsap";

type AIRecommendation = {
  id: string;
  title: string;
  description: string;
  type: "improvement" | "new-task" | "reallocation";
  action?:
    | "assign-members"
    | "complete-fields"
    | "review-overdue"
    | "general-tip";
};

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

const statusColors: Record<TaskStatus, string> = {
  completed: "bg-green-400",
  incomplete: "bg-amber-400",
  "not-started": "bg-red-400",
};

export default function MonitoreoIA() {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMobile();
  const [isRecommendationModalOpen, setIsRecommendationModalOpen] =
    useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<
    AIRecommendation[]
  >([]);
  const [isGeneratingRecommendations, setIsGeneratingRecommendations] =
    useState(false);

  // Referencias para animaciones GSAP
  const aiButtonRef = useRef<HTMLButtonElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);

  const activeTab = location.pathname.includes("monitoreoIA") ? "gantt" : "kpi";

  const project = useCreateProjectStore((state) =>
    projectId ? state.projects.find((p) => p.id === projectId) : null
  );
  const getTeamById = useCreateProjectStore((state) => state.getTeamById);
  const team = project ? getTeamById(project.teamId) : null;

  const { getTasksByProject } = useTaskStore();
  const tasks = projectId ? getTasksByProject(projectId) : [];
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "finalizada").length;
  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const [ganttProject, _setGanttProject] = useState<Project>({
    id: projectId || "1",
    name: project?.title || "Nombre del proyecto",
    currentWeek: 7,
    tasks: [
      {
        id: "1",
        name: "Maquetación Navbar",
        startWeek: 1,
        endWeek: 3,
        status: "completed",
      },
      {
        id: "2",
        name: "Maquetación Footer",
        startWeek: 2,
        endWeek: 4,
        status: completedTasks > 0 ? "completed" : "incomplete",
      },
      {
        id: "3",
        name: "Maquetación Header",
        startWeek: 4,
        endWeek: 5,
        status: completedTasks > 2 ? "completed" : "incomplete",
      },
      {
        id: "4",
        name: "Maquetación sección admin",
        startWeek: 5,
        endWeek: 7,
        status: completedTasks > 2 ? "completed" : "incomplete",
      },
      {
        id: "5",
        name: "Integracion autenticación",
        startWeek: 6,
        endWeek: 8,
        status: completedTasks > 4 ? "completed" : "incomplete",
      },
      {
        id: "6",
        name: "Integracion tareas",
        startWeek: 8,
        endWeek: 10,
        status: completedTasks > 5 ? "completed" : "incomplete",
      },
      {
        id: "7",
        name: "Integracion creación proyectos",
        startWeek: 7,
        endWeek: 9,
        status: "not-started",
      },
      {
        id: "8",
        name: "Integracion creación usuarios",
        startWeek: 9,
        endWeek: 11,
        status: "not-started",
      },
    ],
  });

  const generateAIRecommendations = () => {
    if (!projectId) return;

    const recommendations = useTaskStore
      .getState()
      .generateAIRecommendations(projectId);
    setAiRecommendations(recommendations);
    setIsRecommendationModalOpen(true);
  };

  const handleApplyRecommendation = (recommendationId: string) => {
    if (!projectId) return;

    useTaskStore.getState().applyRecommendation(projectId, recommendationId);
  };

  const handleTabChange = (value: string) => {
    if (value === "gantt") {
      navigate(`/user/monitoreoIA/${projectId}`);
    } else {
      navigate(`/user/monitoreo/${projectId}`);
    }
  };

  const weekColumns = [];
  const totalWeeks = 12;
  for (let i = 1; i < totalWeeks; i += 2) {
    weekColumns.push(`Semana ${i}-${i + 1}`);
  }

  const generateAI = () => {
    setIsGeneratingRecommendations(true);
  };

  // Animaciones GSAP para el botón de IA
  useEffect(() => {
    const button = aiButtonRef.current;
    const sparkles = sparklesRef.current;

    if (!button) return;

    // Animación de entrada del botón
    gsap.fromTo(
      button,
      {
        scale: 0.9,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.3,
      }
    );

    // Pulsación periódica
    gsap.to(button, {
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    // Eventos de hover
    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.1,
        rotationY: 5,
        duration: 0.3,
        ease: "power2.out",
      });

      if (sparkles) {
        gsap.to(sparkles, {
          rotation: 360,
          duration: 1,
          ease: "none",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        rotationY: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!project) {
    return (
      <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
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
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">
          Vista de Gantt: {project.title}
        </h1>
        <p className="text-slate-600 mt-1">
          Diagrama de cronograma del proyecto
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
            Progreso:{" "}
            <span className="font-medium">
              {progress}%{" "}
              {progress === 0
                ? "(No iniciado)"
                : progress === 100
                ? "(Completado)"
                : "(En progreso)"}
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

        <TabsContent value="gantt" className="mt-6">
          <Card>
            <CardContent className="p-3">
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  <div className="mb-2 grid grid-cols-[250px_repeat(6,1fr)] border-b">
                    <div className="p-2" />
                    {weekColumns.map((week, index) => (
                      <div
                        key={index}
                        className="p-2 text-center items-center font-medium text-sm"
                      >
                        {week}
                      </div>
                    ))}
                  </div>

                  {ganttProject.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="grid grid-cols-[250px_repeat(6,1fr)] border-b items-center"
                    >
                      <div className="p-2 text-sm">
                        {isMobile ? (
                          <div className="line-clamp-2">{task.name}</div>
                        ) : (
                          <div className="flex justify-end pr-4">
                            {task.name}
                          </div>
                        )}
                      </div>

                      {Array.from({ length: 6 }).map((_, weekIndex) => {
                        const weekStart = weekIndex * 2 + 1;
                        const weekEnd = weekStart + 1;
                        const isInRange =
                          task.startWeek <= weekEnd &&
                          task.endWeek >= weekStart;

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
                          <div
                            key={weekIndex}
                            className="p-8 relative border-l"
                          >
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

                            {ganttProject.currentWeek >= weekStart &&
                              ganttProject.currentWeek <= weekEnd && (
                                <div
                                  className="absolute top-0 bottom-0 border-l-2 border-dashed border-blue-600"
                                  style={{
                                    left: `calc(${
                                      ((ganttProject.currentWeek - weekStart) /
                                        2) *
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-3 mt-8">
        <Button
          variant="outline"
          onClick={() => navigate(`/user/tareas/${projectId}`)}
        >
          Ir Atrás
        </Button>

        {/* Botón de IA Sofisticado */}
        <div className="relative">
          <Button
            ref={aiButtonRef}
            onClick={generateAI}
            disabled={isGeneratingRecommendations}
            className="relative overflow-hidden bg-gradient-to-r from-[#38536E] via-[#38536E] to-[#38536E] hover:from-[#2d3e52] hover:via-[#2d3e52] hover:to-[#2d3e52] text-white border-none shadow-2xl transition-all duration-300 px-6 py-3 text-lg font-semibold"
            style={{
              transformStyle: "preserve-3d",
              boxShadow:
                "0 10px 25px rgba(56, 83, 110, 0.5), 0 0 30px rgba(56, 83, 110, 0.3)",
            }}
          >
            {/* Elementos decorativos flotantes */}
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-white/30 rounded-full animate-pulse" />
            <div
              className="absolute -bottom-1 -right-1 w-2 h-2 bg-white/40 rounded-full"
              style={{
                animation: "float 2s ease-in-out infinite",
              }}
            />

            {/* Efecto de brillo que se mueve */}
            <div
              className="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%)",
                transform: "translateX(-100%)",
                animation: "shine 2s infinite",
              }}
            />

            {/* Contenido del botón */}
            <div className="relative flex items-center gap-3 z-10">
              <div className="relative">
                <Brain className="w-6 h-6" />
                <div
                  ref={sparklesRef}
                  className="absolute -top-1 -right-1 w-3 h-3"
                >
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                </div>
              </div>

              <span className="font-bold">
                {isGeneratingRecommendations
                  ? "🤖 Analizando..."
                  : "🚀 Recomendaciones de IA"}
              </span>

              {!isGeneratingRecommendations && (
                <div className="flex gap-1">
                  <div
                    className="w-1 h-1 bg-white/60 rounded-full animate-pulse"
                    style={{ animationDelay: "0s" }}
                  />
                  <div
                    className="w-1 h-1 bg-white/60 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="w-1 h-1 bg-white/60 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              )}
            </div>

            {/* Borde holográfico */}
            <div className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r from-[#38536E] via-[#38536E] to-[#38536E] opacity-30" />
          </Button>

          {/* Partículas flotantes alrededor del botón */}
          {!isGeneratingRecommendations &&
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-[#38536E] to-[#38536E] rounded-full opacity-60"
                style={{
                  left: `${20 + Math.cos((i * Math.PI) / 3) * 40}%`,
                  top: `${50 + Math.sin((i * Math.PI) / 3) * 40}%`,
                  animation: `float ${
                    2 + i * 0.2
                  }s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
        </div>
      </div>

      {/* Nuevo Modal 3D de Recomendaciones */}
      <AIRecommendationModal
        open={isRecommendationModalOpen}
        onOpenChange={setIsRecommendationModalOpen}
        recommendations={aiRecommendations}
        projectId={projectId || ""}
      />

      {isGeneratingRecommendations && (
        <AiRecommendationLoader
          onComplete={() => {
            if (!projectId) return;
            const recommendations = useTaskStore
              .getState()
              .generateAIRecommendations(projectId);
            setAiRecommendations(recommendations);
            setIsRecommendationModalOpen(true);
            setIsGeneratingRecommendations(false);
          }}
        />
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
