import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Step = {
  id: number;
  title: string;
  description: string;
  action: string;
  path?: string;
};

const steps: Step[] = [
  {
    id: 1,
    title: "Crear un proyecto",
    description:
      "Comienza creando tu primer proyecto para organizar tu trabajo",
    action: "Crear proyecto",
    path: "/user/createProject",
  },
  {
    id: 2,
    title: "Asignar tareas",
    description:
      "Organiza el trabajo asignando tareas a los miembros del equipo",
    action: "Asignar tareas",
  },
  {
    id: 3,
    title: "Gestionar tareas",
    description: "Sigue el progreso y gestiona las tareas de tus proyectos",
    action: "Gestionar",
  },
];

export default function ProjectStepsSkeleton() {
  const columns = ["Por Hacer", "En Curso", "Finalizada"];

  return (
    <div className="max-w-6xl mx-auto py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Comienza con tu primer proyecto
        </h2>
        <p className="text-gray-600">
          Sigue estos pasos para configurar y gestionar tus proyectos
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between gap-8">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex-1 flex flex-col items-center text-center"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                step.id === 1
                  ? "bg-[#E8523B] text-white"
                  : "bg-gray-100 text-gray-400 border border-gray-200"
              }`}
            >
              {step.id === 1 ? step.id : <CheckCircle className="h-5 w-5" />}
            </div>

            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 mb-4">{step.description}</p>

            {step.path ? (
              <Button className="bg-[#38536E] hover:bg-[#2a4058]" asChild>
                <Link to={step.path}>{step.action}</Link>
              </Button>
            ) : (
              <Button disabled variant="outline">
                {step.action}
              </Button>
            )}

            {step.id === 3 && <div className="w-full mt-6 space-y-2"></div>}
          </div>
        ))}
      </div>

      <div className="container mx-auto p-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <Skeleton className="h-6 w-60 mb-2" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-28 rounded-md" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {columns.map((_title, index) => (
            <div className="space-y-4" key={index}>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32 rounded-md" />
                <Skeleton className="h-6 w-20 rounded-md" />
              </div>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="border-none shadow-sm">
                    <CardContent className="p-4 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-12 rounded-full" />
                        <Skeleton className="h-6 w-12 rounded-full" />
                        <Skeleton className="h-6 w-12 rounded-full" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
