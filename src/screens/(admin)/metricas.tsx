import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function WebMetricsDashboard() {
  const [timeRange, setTimeRange] = useState("6months")
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Google Metrics Card - Left */}
          <Card>
            <CardHeader className="pb-2">
              <p className="text-xs text-gray-500">Revenue</p>
              <CardTitle className="text-base">Métricas de google</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[150px] flex items-end justify-between space-x-1">
                {/* Candlestick chart simulation */}
                {[
                  { high: 80, low: 30, open: 50, close: 40 },
                  { high: 100, low: 40, open: 60, close: 50 },
                  { high: 90, low: 50, open: 70, close: 60 },
                  { high: 70, low: 20, open: 40, close: 30 },
                  { high: 85, low: 45, open: 65, close: 55 },
                  { high: 95, low: 55, open: 75, close: 65 },
                  { high: 75, low: 25, open: 45, close: 35 },
                  { high: 88, low: 48, open: 68, close: 58 },
                  { high: 98, low: 58, open: 78, close: 68 },
                  { high: 78, low: 28, open: 48, close: 38 },
                  { high: 83, low: 43, open: 63, close: 53 },
                  { high: 93, low: 53, open: 73, close: 63 },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-1 bg-gray-800" style={{ height: `${item.high - item.low}px` }} />
                    <div className="flex flex-col items-center -mt-1">
                      <div
                        className={`w-6 ${item.open > item.close ? "bg-red-500" : "bg-blue-800"}`}
                        style={{ height: `${Math.abs(item.open - item.close)}px` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

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

          {/* Instagram Metrics Card - Middle */}
          <Card>
            <CardHeader className="pb-2">
              <p className="text-xs text-gray-500">Statistics</p>
              <CardTitle className="text-base">Métricas de Instagram</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>USA</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Canada</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>UK</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-gray-700 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Australia</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-blue-200 h-2.5 rounded-full" style={{ width: "25%" }}></div>
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
          <Card>
            <CardHeader className="pb-2">
              <p className="text-xs text-gray-500">Solana</p>
              <CardTitle className="text-base">Métricas de google</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[150px] relative">
                {/* Stock chart simulation */}
                <div className="absolute left-0 top-0 text-xs text-gray-500">50</div>
                <div className="absolute left-0 top-1/4 text-xs text-gray-500">49</div>
                <div className="absolute left-0 top-1/2 text-xs text-gray-500">48</div>
                <div className="absolute left-0 top-3/4 text-xs text-gray-500">47</div>
                <div className="absolute left-0 bottom-0 text-xs text-gray-500">46</div>

                <div className="pl-6 h-full flex items-end justify-between space-x-2">
                  {[
                    { high: 80, low: 40, open: 60, close: 50 },
                    { high: 70, low: 30, open: 40, close: 60 },
                    { high: 90, low: 50, open: 70, close: 60 },
                    { high: 85, low: 45, open: 65, close: 55 },
                    { high: 75, low: 35, open: 45, close: 65 },
                    { high: 95, low: 55, open: 75, close: 65 },
                    { high: 88, low: 48, open: 68, close: 58 },
                    { high: 78, low: 38, open: 48, close: 68 },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-0.5 bg-gray-800" style={{ height: `${(item.high - item.low) / 2}px` }} />
                      <div className="flex flex-col items-center -mt-0.5">
                        <div
                          className={`w-4 ${item.open > item.close ? "bg-red-500" : "bg-blue-800"}`}
                          style={{ height: `${Math.abs(item.open - item.close) / 2}px` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

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
      <div className="mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <p className="text-xs text-gray-500">Statistics</p>
              <CardTitle className="text-base">Métricas de Instagram</CardTitle>
            </div>
            <div className="flex items-center space-x-4">
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
          <CardContent>
            <div className="h-[300px] w-full">
              <div className="flex h-full">
                {/* Y-axis labels */}
                <div className="flex flex-col justify-between pr-2 text-xs text-gray-500">
                  <div>1M</div>
                  <div>500k</div>
                  <div>200k</div>
                  <div>100k</div>
                  <div>50k</div>
                  <div>0</div>
                </div>

                {/* Chart */}
                <div className="flex-1 flex items-end justify-between relative">
                  {/* Horizontal grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    <div className="border-b border-gray-200 w-full"></div>
                    <div className="border-b border-gray-200 w-full"></div>
                    <div className="border-b border-gray-200 w-full"></div>
                    <div className="border-b border-gray-200 w-full"></div>
                    <div className="border-b border-gray-200 w-full"></div>
                  </div>

                  {/* Bars */}
                  <div className="w-[14%] h-[20%] flex flex-col">
                    <div className="bg-red-500 h-[10%]"></div>
                    <div className="bg-green-500 h-[20%]"></div>
                    <div className="bg-blue-700 h-[10%]"></div>
                    <div className="bg-gray-700 h-[60%]"></div>
                  </div>

                  <div className="w-[14%] h-[40%] flex flex-col">
                    <div className="bg-red-500 h-[10%]"></div>
                    <div className="bg-green-500 h-[20%]"></div>
                    <div className="bg-blue-700 h-[10%]"></div>
                    <div className="bg-gray-700 h-[60%]"></div>
                  </div>

                  <div className="w-[14%] h-[60%] flex flex-col">
                    <div className="bg-red-500 h-[10%]"></div>
                    <div className="bg-green-500 h-[20%]"></div>
                    <div className="bg-blue-700 h-[20%]"></div>
                    <div className="bg-gray-700 h-[50%]"></div>
                  </div>

                  <div className="w-[14%] h-[80%] flex flex-col">
                    <div className="bg-red-500 h-[10%]"></div>
                    <div className="bg-green-500 h-[30%]"></div>
                    <div className="bg-blue-700 h-[20%]"></div>
                    <div className="bg-gray-700 h-[40%]"></div>
                  </div>

                  <div className="w-[14%] h-[100%] flex flex-col">
                    <div className="bg-red-500 h-[15%]"></div>
                    <div className="bg-green-500 h-[30%]"></div>
                    <div className="bg-blue-700 h-[25%]"></div>
                    <div className="bg-gray-700 h-[30%]"></div>
                  </div>

                  <div className="w-[14%] h-[70%] flex flex-col">
                    <div className="bg-red-500 h-[10%]"></div>
                    <div className="bg-green-500 h-[30%]"></div>
                    <div className="bg-blue-700 h-[20%]"></div>
                    <div className="bg-gray-700 h-[40%]"></div>
                  </div>
                </div>
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between pl-8 mt-2 text-xs text-gray-500">
                <div>JAN</div>
                <div>FEB</div>
                <div>MAR</div>
                <div>APR</div>
                <div>MAY</div>
                <div>JUN</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Google Metrics Weekly Chart */}
      <div className="mt-8">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
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
            <div className="flex mt-4">
              <div className="w-full flex">
                {/* Chart area */}
                <div className="w-[85%]">
                  <div className="h-[350px] relative">
                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-right pr-4">
                      <div className="text-sm text-gray-500">1.5M</div>
                      <div className="text-sm text-gray-500">1M</div>
                      <div className="text-sm text-gray-500">500k</div>
                      <div className="text-sm text-gray-500">200k</div>
                      <div className="text-sm text-gray-500">100k</div>
                      <div className="text-sm text-gray-500">50k</div>
                      <div className="text-sm text-gray-500">0</div>
                    </div>

                    {/* Horizontal grid lines */}
                    <div className="absolute left-12 right-0 top-0 h-full flex flex-col justify-between">
                      <div className="border-b border-dashed border-gray-200 w-full"></div>
                      <div className="border-b border-dashed border-gray-200 w-full"></div>
                      <div className="border-b border-dashed border-gray-200 w-full"></div>
                      <div className="border-b border-dashed border-gray-200 w-full"></div>
                      <div className="border-b border-dashed border-gray-200 w-full"></div>
                      <div className="border-b border-dashed border-gray-200 w-full"></div>
                      <div className="border-b border-dashed border-gray-200 w-full"></div>
                    </div>

                    {/* Highlighted area for Wednesday */}
                    <div className="absolute left-[43%] top-0 h-full w-[14%] bg-gray-100"></div>

                    {/* Bar chart */}
                    <div className="absolute left-12 right-0 bottom-0 h-[90%] flex justify-between items-end">
                      {/* Monday */}
                      <div className="flex items-end space-x-1 h-full">
                        <div className="h-[5%] w-4 bg-gray-800"></div>
                        <div className="h-[20%] w-4 bg-red-500"></div>
                        <div className="h-[80%] w-4 bg-green-500"></div>
                        <div className="h-[40%] w-4 bg-blue-200"></div>
                      </div>

                      {/* Tuesday */}
                      <div className="flex items-end space-x-1 h-full">
                        <div className="h-[15%] w-4 bg-gray-800"></div>
                        <div className="h-[5%] w-4 bg-red-500"></div>
                        <div className="h-[4%] w-4 bg-green-500"></div>
                        <div className="h-[25%] w-4 bg-blue-200"></div>
                      </div>

                      {/* Wednesday */}
                      <div className="flex items-end space-x-1 h-full">
                        <div className="h-[15%] w-4 bg-gray-800"></div>
                        <div className="h-[50%] w-4 bg-red-500"></div>
                        <div className="h-[30%] w-4 bg-green-500"></div>
                        <div className="h-[20%] w-4 bg-blue-200"></div>
                      </div>

                      {/* Thursday */}
                      <div className="flex items-end space-x-1 h-full">
                        <div className="h-[15%] w-4 bg-gray-800"></div>
                        <div className="h-[10%] w-4 bg-red-500"></div>
                        <div className="h-[25%] w-4 bg-green-500"></div>
                        <div className="h-[6%] w-4 bg-blue-200"></div>
                      </div>

                      {/* Friday */}
                      <div className="flex items-end space-x-1 h-full">
                        <div className="h-[3%] w-4 bg-gray-800"></div>
                        <div className="h-[5%] w-4 bg-red-500"></div>
                        <div className="h-[10%] w-4 bg-green-500"></div>
                        <div className="h-[5%] w-4 bg-blue-200"></div>
                      </div>

                      {/* Saturday */}
                      <div className="flex items-end space-x-1 h-full">
                        <div className="h-[40%] w-4 bg-gray-800"></div>
                        <div className="h-[25%] w-4 bg-red-500"></div>
                        <div className="h-[20%] w-4 bg-green-500"></div>
                        <div className="h-[35%] w-4 bg-blue-200"></div>
                      </div>

                      {/* Sunday */}
                      <div className="flex items-end space-x-1 h-full">
                        <div className="h-[55%] w-4 bg-gray-800"></div>
                        <div className="h-[30%] w-4 bg-red-500"></div>
                        <div className="h-[20%] w-4 bg-green-500"></div>
                        <div className="h-[10%] w-4 bg-blue-200"></div>
                      </div>
                    </div>

                    {/* X-axis labels */}
                    <div className="absolute left-12 right-0 bottom-[-25px] flex justify-between">
                      <div className="text-sm text-gray-500">MON</div>
                      <div className="text-sm text-gray-500">TUE</div>
                      <div className="text-sm text-gray-500">WED</div>
                      <div className="text-sm text-gray-500">THU</div>
                      <div className="text-sm text-gray-500">FRI</div>
                      <div className="text-sm text-gray-500">SAT</div>
                      <div className="text-sm text-gray-500">SUN</div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="w-[15%] pl-4 flex flex-col space-y-4">
                  <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-red-500 rounded-full text-sm text-gray-800">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span>All Categories</span>
                  </button>

                  <div className="space-y-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-800 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                      </div>
                      <span className="text-sm">Smartphones</span>
                      <span className="text-sm text-gray-400 ml-auto">37%</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full border-2 border-red-500 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      </div>
                      <span className="text-sm">Headphones</span>
                      <span className="text-sm text-gray-400 ml-auto">23%</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full border-2 border-green-500 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                      <span className="text-sm">Cameras</span>
                      <span className="text-sm text-gray-400 ml-auto">29%</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full border-2 border-blue-200 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-200"></div>
                      </div>
                      <span className="text-sm">Wearables</span>
                      <span className="text-sm text-gray-400 ml-auto">21%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
