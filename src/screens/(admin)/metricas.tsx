import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from '@/components/ui/chart';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const mockData = [
  {
    name: 'Jan',
    productSales: 4000,
    subscriptions: 2400
  },
  {
    name: 'Feb',
    productSales: 3000,
    subscriptions: 1398
  },
  {
    name: 'Mar',
    productSales: 2000,
    subscriptions: 9800
  },
  {
    name: 'Apr',
    productSales: 2780,
    subscriptions: 3908
  },
  {
    name: 'May',
    productSales: 1890,
    subscriptions: 4800
  },
  {
    name: 'Jun',
    productSales: 2390,
    subscriptions: 3800
  },
  {
    name: 'Jul',
    productSales: 3490,
    subscriptions: 4300
  }
];

const chartConfig = {
  productSales: {
    label: 'Ventas de Productos',
    color: '#dc2626'
  },
  subscriptions: {
    label: 'Suscripciones',
    color: '#1d4ed8'
  }
};

export default function Metricas() {
  const [chartTimeframe, setChartTimeframe] = useState("24h")

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">Métricas de la web</h1>
        <p className="text-sm text-gray-600">Aquí se puede visualizar el tráfico de tu web</p>
      </div>

      {/* Most Used Metrics Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Métricas mas utilizadas</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {/* Google Metrics Card - Left */}
          <Card className="min-h-[400px] flex flex-col">
          <CardHeader className="pb-2">
              <p className="text-xs text-gray-500">Revenue</p>
              <CardTitle className="text-base">Métricas de Google</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend content={<ChartLegendContent />} />
                    <Bar
                      dataKey="productSales"
                      fill="#dc2626"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="subscriptions"
                      fill="#1d4ed8"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>

              <div className="flex justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Ventas de Productos</span>
                </div>
                <span className="text-sm font-medium">$7,213</span>
              </div>

              <div className="flex justify-between mt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-800"></div>
                  <span className="text-sm">Suscripciones</span>
                </div>
                <span className="text-sm font-medium">$5,662</span>
              </div>
            </CardContent>
          </Card>

          {/* Instagram Metrics Card - Middle */}
          <Card className="min-h-[400px] flex flex-col">
            <CardHeader className="pb-2">
              <p className="text-xs text-gray-500">Statistics</p>
              <CardTitle className="text-base">Métricas de Instagram</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto">
            <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="truncate">USA</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Canada</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>UK</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-gray-700 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Australia</span>
                    <span>25%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-emerald-300 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                  </div>
                </div>

                <div className="flex justify-between text-xs text-gray-500 pt-2">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Google Metrics Card - Right */}
          <Card className="min-h-[400px] flex flex-col">
            <CardHeader className="pb-2">
              <p className="text-xs text-gray-500">Solana</p>
              <CardTitle className="text-base">Métricas de Google</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend content={<ChartLegendContent />} />
                    <Bar
                      dataKey="productSales"
                      fill="#dc2626"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="subscriptions"
                      fill="#1d4ed8"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>

              <div className="flex justify-between mt-4 border-t pt-2">
                <button
                  className={`text-xs px-2 py-1 rounded-full ${chartTimeframe === "1h" ? "bg-gray-200" : "bg-transparent"}`}
                  onClick={() => setChartTimeframe("1h")}
                >
                  1h
                </button>
                <button
                  className={`text-xs px-2 py-1 rounded-full ${chartTimeframe === "12h" ? "bg-gray-200" : "bg-transparent"}`}
                  onClick={() => setChartTimeframe("12h")}
                >
                  12h
                </button>
                <button
                  className={`text-xs px-2 py-1 rounded-full ${chartTimeframe === "24h" ? "bg-purple-100 text-purple-600 border border-purple-300" : "bg-transparent"}`}
                  onClick={() => setChartTimeframe("24h")}
                >
                  24h
                </button>
                <button
                  className={`text-xs px-2 py-1 rounded-full ${chartTimeframe === "day" ? "bg-gray-200" : "bg-transparent"}`}
                  onClick={() => setChartTimeframe("day")}
                >
                  Day
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Instagram Metrics Large Chart */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
        <Card className="min-h-[400px] flex flex-col">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2 gap-2">            <div>
              <p className="text-xs text-gray-500">Statistics</p>
              <CardTitle className="text-base">Métricas de Instagram</CardTitle>
            </div>
            <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                <span className="text-sm">Free</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-700"></div>
                <span className="text-sm">Basic</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Pro</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm">Enterprise</span>
              </div>

              <Select defaultValue="6months">
                <SelectTrigger className="w-[180px] h-8 text-sm">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6months">Last 6 months</SelectItem>
                  <SelectItem value="3months">Last 3 months</SelectItem>
                  <SelectItem value="1month">Last month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="container min-h-[300px]">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockData} height={50}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend content={<ChartLegendContent />} />
                  <Line
                    type="monotone"
                    dataKey="productSales"
                    stroke="#dc2626"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="subscriptions"
                    stroke="#1d4ed8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          </CardContent>
        </Card>
      </div>
      {/* Google Metrics Weekly Chart */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
        <Card className="overflow-hidden min-h-[400px] flex flex-col">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2 gap-2">
            <div>
              <p className="text-xs text-gray-500">Statistics</p>
              <CardTitle className="text-base">Métricas de google</CardTitle>
            </div>
            <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
              <button className="text-sm px-4 py-1.5 rounded-full text-gray-500 hover:bg-gray-200">Daily</button>
              <button className="text-sm px-4 py-1.5 rounded-full bg-gray-900 text-white">Weekly</button>
              <button className="text-sm px-4 py-1.5 rounded-full text-gray-500 hover:bg-gray-200">Monthly</button>
            </div>
          </CardHeader>
          <CardContent className="pb-6">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="productSales"
                    fill="#dc2626"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="subscriptions"
                    fill="#1d4ed8"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="flex justify-between mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm">Product sales</span>
              </div>
              <span className="text-sm font-medium">$7,213</span>
            </div>

            <div className="flex justify-between mt-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-800"></div>
                <span className="text-sm">Subscriptions</span>
              </div>
              <span className="text-sm font-medium">$5,662</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
