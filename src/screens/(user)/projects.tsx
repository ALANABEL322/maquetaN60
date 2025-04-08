import { Trash2 } from "lucide-react";
import { useCreateProjectStore } from "@/store/createProject/createProjectStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { MetricsDashboard } from "@/components/metricasUser/metrics-dashboard";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Projects() {
  const { projects, getTeamById, deleteProject } = useCreateProjectStore();

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

  const handleDeleteProject = (projectId: string) => {
    toast("¿Estás seguro de eliminar este proyecto?", {
      action: {
        label: "Eliminar",
        onClick: () => {
          deleteProject(projectId);
          toast.success("Proyecto eliminado correctamente");
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
        backgroundColor: "#F08B7B",
      },
      className: "bg-white",
    });
  };

  return (
    <div className="container mx-auto py-10">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Proyectos</h1>
        <p className="text-gray-600 text-sm mt-2 mb-4">
          Lista de tus proyectos
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No hay proyectos creados aún</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const team = getTeamById(project.teamId);
            return (
              <Card
                key={project.id}
                className="hover:shadow-lg transition-shadow relative"
              >
                {/* Botón de eliminar */}
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="absolute top-2 right-2 p-2 rounded-full transition-colors"
                  aria-label="Eliminar proyecto"
                >
                  <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500 mt-3" />
                </button>

                <CardHeader>
                  <div className="flex justify-between items-start mr-4">
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
                      <p className="text-xs text-gray-500">Scrum Master</p>
                      <p className="text-sm font-medium">
                        {project.scrumMaster}
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
                                  "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2080%2080%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18d6f7e8d4a%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18d6f7e8d4a%22%3E%3Crect%20width%3D%2280%22%20height%3D%2280%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2226.5%22%20y%3D%2242%22%3E80x80%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
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
                  <Button className="w-full mt-4" asChild>
                    <Link to={`/user/tareas/${project.id}`}>
                      Asignar tareas
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      <MetricsDashboard />
    </div>
  );
}
