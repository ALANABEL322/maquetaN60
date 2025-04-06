import { ActivityChart } from "./activityChart";
import { StatisticsAreaChart } from "./statisticsAreaChart";
import { StatisticsBarChart } from "./statisticsBarChart";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function MetricsDashboard() {
  const pedroData = [1400, 700, 1500, 900, 2313, 500, 1300];
  const juanData = [1300, 650, 1450, 950, 2313, 600, 1250];
  const userPerformanceData = [
    { year: "2017", value: 1500000, trend: 2000000 },
    { year: "2018", value: 1800000, trend: 1800000 },
    { year: "2019", value: 2800000, trend: 2500000 },
    { year: "2020", value: 1700000, trend: 1600000 },
    { year: "2021", value: 1900000, trend: 2100000 },
    { year: "2022", value: 1600000, trend: 2000000 },
  ];
  const percentageData = [
    { day: "Mon", value: 12000 },
    { day: "Tue", value: 30000 },
    { day: "Wed", value: 33567, highlighted: true },
    { day: "Thu", value: 20000 },
    { day: "Fri", value: 10000 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mt-10">
        Métricas y estadísticas
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Activity</p>
                <h3 className="text-xl font-bold">
                  Desempeño del equipo front-end
                </h3>
              </div>
              <Select defaultValue="weekly">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ActivityChart data={pedroData} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Activity</p>
                <h3 className="text-xl font-bold">
                  Desempeño del equipo back-end
                </h3>
              </div>
              <Select defaultValue="weekly">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ActivityChart data={juanData} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Statistics</p>
                <h3 className="text-xl font-bold">Rendimiento de usuarios</h3>
              </div>
              <Select defaultValue="annual">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">Annual</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <StatisticsAreaChart data={userPerformanceData} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Statistics</p>
                <h3 className="text-xl font-bold">
                  Rendimiento por porcentaje
                </h3>
              </div>
            </div>
            <StatisticsBarChart data={percentageData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
