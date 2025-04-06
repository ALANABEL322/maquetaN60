import { MetricsDashboard } from "@/components/metricasUser/metrics-dashboard";

export default function Projects() {
  return (
    <div className="container mx-auto py-10">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Proyectos</h1>
        <p className="text-gray-600 text-sm mt-2 mb-4">
          Lista de tus proyectos
        </p>
      </div>
      <MetricsDashboard />
    </div>
  );
}
