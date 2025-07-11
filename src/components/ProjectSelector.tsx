import { useCreateProjectStore } from "@/store/createProject/createProjectStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarIcon,
  FilePenLine,
  Cctv,
  Folders,
} from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ProjectSelectorProps {
  mode: "tareas" | "monitoreo";
  title: string;
  description: string;
}

export default function ProjectSelector({
  mode,
  title,
  description,
}: ProjectSelectorProps) {
  const { projects, getTeamById } = useCreateProjectStore();
  const navigate = useNavigate();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "bg-red-100 text-red-800";
      case "media":
        return "bg-yellow-100 text-yellow-800";
      case "baja":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleProjectSelect = (projectId: string) => {
    if (mode === "tareas") {
      navigate(`/user/tareas/${projectId}`);
    } else {
      navigate(`/user/monitoreo/${projectId}`);
    }
  };

  const handleCreateProject = () => {
    navigate("/user/createProject");
  };

  if (projects.length === 0) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <Folders className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No hay proyectos disponibles
            </h2>
            <p className="text-gray-600 mb-8">
              Necesitas crear un proyecto antes de poder acceder a{" "}
              {mode === "tareas" ? "las tareas" : "el monitoreo"}.
            </p>
            <Button onClick={handleCreateProject} className="w-full sm:w-auto">
              Crear mi primer proyecto
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const team = getTeamById(project.teamId);
          return (
            <Card
              key={project.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleProjectSelect(project.id)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(
                      project.priority
                    )}`}
                  >
                    {project.priority}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {format(new Date(project.startDate), "MMM dd")} -{" "}
                  {format(new Date(project.endDate), "MMM dd, yyyy")}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {project.description}
                </p>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Product Owner</p>
                    <p className="text-sm font-medium">
                      {project.productOwner}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Equipo</p>
                    <p className="text-sm font-medium">{team?.name}</p>
                    <div className="flex -space-x-2 mt-2">
                      {team?.members.slice(0, 5).map((member) => (
                        <div
                          key={member.id}
                          className="w-8 h-8 rounded-full overflow-hidden border-2 border-white"
                        >
                          <img
                            src={member.photo}
                            alt={`${member.firstName} ${member.lastName}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src =
                                "https://www.gravatar.com/avatar/?d=mp";
                            }}
                          />
                        </div>
                      ))}
                      {team && team.members.length > 5 && (
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border-2 border-white text-xs">
                          +{team.members.length - 5}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-4">
                  {mode === "tareas" ? (
                    <>
                      <FilePenLine className="h-4 w-4 mr-2" />
                      Ver tareas
                    </>
                  ) : (
                    <>
                      <Cctv className="h-4 w-4 mr-2" />
                      Ver monitoreo
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
