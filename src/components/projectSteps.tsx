import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
];

export default function ProjectSteps() {
  return (
    <div className="max-w-6xl mx-auto py-12 flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Comienza con tu primer proyecto
        </h2>
        <p className="text-gray-600">
          Sigue estos pasos para configurar y gestionar tus proyectos
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-8 mb-16">
        {steps.map((step) => (
          <div
            key={step.id}
            className="w-72 flex flex-col items-center text-center"
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
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="border border-gray-200 shadow-sm rounded-lg p-6 w-full space-y-4"
            >
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
