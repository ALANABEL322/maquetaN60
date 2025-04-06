import { useCreateProjectStore } from "@/store/createProject/createProjectStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { MetricsDashboard } from "@/components/metricasUser/metrics-dashboard";
import { Link } from "react-router-dom";

export default function Projects() {
  const { projects, getTeamById } = useCreateProjectStore();

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
                className="hover:shadow-lg transition-shadow"
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
                            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white"
                          >
                            <span className="text-xs">
                              {member.firstName[0]}
                              {member.lastName[0]}
                            </span>
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
                    <Link to={`/projects/${project.id}`}>Asignar tareas</Link>
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
