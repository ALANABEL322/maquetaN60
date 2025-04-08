import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useCreateProjectStore } from "@/store/createProject/createProjectStore";

export default function CreateProject() {
  const { submitProject, teams, currentProject, createProject, resetProject } =
    useCreateProjectStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitProject();
    console.log("Project to be created:", currentProject);
    resetProject();
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent className="pt-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Crear Proyecto
          </h1>
          <p className="text-gray-600">Crea un nuevo proyecto</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Título
              </label>
              <Input
                id="title"
                placeholder="Nombre del proyecto"
                value={currentProject.title}
                onChange={(e) => createProject({ title: e.target.value })}
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-1"
              >
                Descripción
              </label>
              <Textarea
                id="description"
                placeholder="Descripción del proyecto"
                value={currentProject.description}
                onChange={(e) => createProject({ description: e.target.value })}
              />
            </div>

            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium mb-1"
              >
                Prioridad
              </label>
              <Select
                value={currentProject.priority}
                onValueChange={(value) => {
                  if (
                    value === "alta" ||
                    value === "media" ||
                    value === "baja" ||
                    value === ""
                  ) {
                    createProject({ priority: value });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="baja">Baja</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Planificación de Sprint
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Inicio</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !currentProject.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {currentProject.startDate ? (
                        format(currentProject.startDate, "PPP")
                      ) : (
                        <span>Selecciona una fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={currentProject.startDate}
                      onSelect={(date) => createProject({ startDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Final</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !currentProject.endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {currentProject.endDate ? (
                        format(currentProject.endDate, "PPP")
                      ) : (
                        <span>Selecciona una fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={currentProject.endDate}
                      onSelect={(date) => createProject({ endDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div>
              <label
                htmlFor="objectives"
                className="block text-sm font-medium mb-1"
              >
                Objetivos
              </label>
              <Textarea
                id="objectives"
                placeholder="Objetivos del proyecto"
                value={currentProject.objectives}
                onChange={(e) => createProject({ objectives: e.target.value })}
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Papeles y Equipo</h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="productOwner"
                  className="block text-sm font-medium mb-1"
                >
                  Propietario del producto
                </label>
                <Input
                  id="productOwner"
                  placeholder="Nombre del product owner"
                  value={currentProject.productOwner}
                  onChange={(e) =>
                    createProject({ productOwner: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="scrumMaster"
                  className="block text-sm font-medium mb-1"
                >
                  Scrum Master
                </label>
                <Input
                  id="scrumMaster"
                  placeholder="Nombre del scrum master"
                  value={currentProject.scrumMaster}
                  onChange={(e) =>
                    createProject({ scrumMaster: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Equipo asignado
                </label>
                <Select
                  value={currentProject.teamId}
                  onValueChange={(value) => createProject({ teamId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar equipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {currentProject.teamId && (
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Miembros del equipo:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {teams
                      .find((team) => team.id === currentProject.teamId)
                      ?.members.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center space-x-2 p-2 border rounded"
                        >
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img
                              src={member.photo}
                              alt={`${member.firstName} ${member.lastName}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {member.firstName} {member.lastName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {member.email}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <Button
              variant="outline"
              type="button"
              className="w-full"
              onClick={resetProject}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="w-full bg-[#38536E] hover:bg-[#294052] text-white"
            >
              Crear Proyecto
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
