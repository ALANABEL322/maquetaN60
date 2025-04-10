import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

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
    action: "Gestionar tareas",
  },
  {
    id: 4,
    title: "Monitorear",
    description: "Visualiza el estado y los KPIs de tu proyecto",
    action: "Monitorear",
  },
];

export default function MonitoreoSteps() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Comienza con tu primer proyecto
        </h2>
        <p className="text-gray-600">
          Sigue estos pasos para configurar y gestionar tus proyectos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {steps.map((step) => (
          <Card key={step.id}>
            <CardContent className="p-6 flex flex-col items-start">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${
                  step.id === 1
                    ? "bg-[#E8523B] text-white"
                    : "bg-gray-100 text-gray-400 border border-gray-200"
                }`}
              >
                {step.id === 1 ? step.id : <CheckCircle className="h-5 w-5" />}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{step.description}</p>
              {step.path ? (
                <Button className="bg-[#38536E] hover:bg-[#2a4058]" asChild>
                  <Link to={step.path}>{step.action}</Link>
                </Button>
              ) : (
                <Button disabled variant="outline">
                  {step.action}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-5 w-1/4 rounded-full" />
              </div>
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="space-y-2 mt-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-3/5" />
              </div>
              <Skeleton className="h-10 w-full mt-6" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
