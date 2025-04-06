import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CloudIcon, Activity, GanttChartSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Monitoreo() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleTabChange = (value: string) => {
    if (value === "gantt") {
      navigate("/user/monitoreoIA");
    } else {
      navigate("/user/monitoreo");
    }
  };
  const activeTab = location.pathname.includes("monitoreoIA") ? "gantt" : "kpi";

  const kpiData = [
    { title: "Progreso", value: "71%", description: "Completado del proyecto" },
    { title: "Tareas", value: "32/45", description: "Tareas completadas" },
    { title: "Riesgos", value: "3", description: "Riesgos identificados" },
    { title: "Presupuesto", value: "85%", description: "Utilizado del total" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">
          Monitoreo
        </h1>
        <p className="text-slate-600 mt-1">
          Aquí podrás ver el progreso de cada proyecto
        </p>
      </header>

      <div className="flex flex-col md:flex-row md:items-center justify-end mb-6 gap-4">
        <div className="flex gap-3">
          <Button variant="outline" className="w-full md:w-auto">
            <Activity className="mr-2 h-4 w-4" /> Miembros
          </Button>
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
              asChild
              className={cn(
                "relative w-1/2 rounded-none px-4 py-2 data-[state=active]:shadow-none",
                "text-slate-600 hover:text-primary transition-colors duration-200"
              )}
            >
              <Link to="/user/monitoreo">
                Indicadores KPI
                <div
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-0.5 mt-2",
                    activeTab === "kpi" ? "bg-blue-500" : "bg-gray-300"
                  )}
                ></div>
              </Link>
            </TabsTrigger>
            <TabsTrigger
              value="gantt"
              asChild
              className={cn(
                "relative w-1/2 rounded-none px-4 py-2 data-[state=active]:shadow-none",
                "text-slate-600 hover:text-primary transition-colors duration-200"
              )}
            >
              <Link to="/user/monitoreoIA">
                Vista de Gantt
                <div
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-0.5 mt-2",
                    activeTab === "gantt" ? "bg-blue-500" : "bg-gray-300"
                  )}
                ></div>
              </Link>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="kpi" className="mt-6">
          {!location.pathname.includes("monitoreoIA") && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpiData.map((kpi, index) => (
                  <KpiCard
                    key={index}
                    title={kpi.title}
                    value={kpi.value}
                    description={kpi.description}
                  />
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <ActivityChart
                  title="Actividad de Tareas"
                  data={[1600, 700, 1800, 900, 2313, 600, 1500]}
                />
                <ActivityChart
                  title="Horas Trabajadas"
                  data={[1200, 900, 1500, 800, 2000, 500, 1800]}
                />
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-3 mt-8">
        <Button variant="outline" className="w-full md:w-auto">
          Ir Atrás
        </Button>
        <Button className="w-full md:w-auto bg-slate-700 hover:bg-slate-800">
          Recomendaciones de IA
        </Button>
      </div>
    </div>
  );
}

interface KpiCardProps {
  title: string;
  value: string;
  description: string;
}

function KpiCard({ title, value, description }: KpiCardProps) {
  return (
    <Card className="overflow-hidden border border-slate-200 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-2">
          <CloudIcon className="h-5 w-5 text-slate-500" />
          <span className="text-sm text-slate-600">{title}</span>
        </div>
        <div className="flex items-end gap-4 mt-2">
          <h3 className="text-4xl font-bold">{value}</h3>
          <p className="text-xs text-slate-500 pb-1">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

interface ActivityChartProps {
  title: string;
  data: number[];
}

function ActivityChart({ title, data }: ActivityChartProps) {
  const days = ["LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM"];
  const maxValue = Math.max(...data);

  return (
    <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-slate-500">Actividad</p>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <Select defaultValue="weekly">
          <SelectTrigger className="w-[120px] h-8 text-sm">
            <SelectValue placeholder="Semanal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Diario</SelectItem>
            <SelectItem value="weekly">Semanal</SelectItem>
            <SelectItem value="monthly">Mensual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative h-[200px] mt-6">
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-500">
          <span>{Math.round(maxValue / 1000)}k</span>
          <span>{Math.round((maxValue * 0.66) / 1000)}k</span>
          <span>{Math.round((maxValue * 0.33) / 1000)}k</span>
          <span>0</span>
        </div>

        <div className="absolute left-8 right-0 top-0 h-full">
          <div className="h-full flex flex-col justify-between">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="border-t border-dashed border-slate-200 h-0"
              ></div>
            ))}
          </div>

          <div className="absolute bottom-6 left-0 right-0 flex justify-between items-end h-[calc(100%-24px)]">
            {days.map((day, index) => {
              const value = data[index];
              const height = `${(value / maxValue) * 100}%`;
              const isMaxValue = value === maxValue;

              return (
                <div key={day} className="flex flex-col items-center">
                  <div className="relative">
                    <div
                      className={`w-8 ${
                        isMaxValue ? "bg-slate-700" : "bg-pink-200"
                      } rounded-t-sm transition-all duration-300`}
                      style={{ height }}
                    ></div>
                    {isMaxValue && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded">
                        {value}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 mt-2">{day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
