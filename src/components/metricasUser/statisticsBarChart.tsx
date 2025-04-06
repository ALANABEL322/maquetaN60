import { useEffect, useRef } from "react"

interface DataPoint {
  day: string
  value: number
  highlighted?: boolean
}

interface StatisticsBarChartProps {
  data: DataPoint[]
}

export function StatisticsBarChart({ data }: StatisticsBarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Chart dimensions
    const chartWidth = rect.width
    const chartHeight = rect.height - 40 // Leave space for labels
    const barCount = data.length
    const barWidth = (chartWidth / barCount) * 0.7
    const barSpacing = (chartWidth - barWidth * barCount) / (barCount + 1)

    // Find max value for scaling
    const maxValue = Math.max(...data.map((d) => d.value), 40000) // Ensure we have at least 40k as max for y-axis

    // Draw horizontal grid lines
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    const gridLines = 4 // 0, 10k, 20k, 30k, 40k
    for (let i = 0; i <= gridLines; i++) {
      const y = chartHeight - (i / gridLines) * chartHeight
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(chartWidth, y)
      ctx.stroke()

      // Draw y-axis labels
      ctx.fillStyle = "#9ca3af"
      ctx.font = "12px Inter, system-ui, sans-serif"
      ctx.textAlign = "left"
      ctx.fillText(`${i * 10}k`, 0, y - 5)
    }

    // Draw bars
    data.forEach((point, index) => {
      const x = barSpacing + index * (barWidth + barSpacing)
      const barHeight = (point.value / maxValue) * chartHeight
      const y = chartHeight - barHeight

      // All bars are dark blue
      ctx.fillStyle = "#1e3a5f"

      // Draw rounded top rectangle
      const radius = 4
      ctx.beginPath()
      ctx.moveTo(x + radius, y)
      ctx.lineTo(x + barWidth - radius, y)
      ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius)
      ctx.lineTo(x + barWidth, y + barHeight)
      ctx.lineTo(x, y + barHeight)
      ctx.lineTo(x, y + radius)
      ctx.quadraticCurveTo(x, y, x + radius, y)
      ctx.closePath()
      ctx.fill()

      // Draw x-axis labels
      ctx.fillStyle = "#9ca3af"
      ctx.font = "12px Inter, system-ui, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(point.day, x + barWidth / 2, chartHeight + 20)

      // Draw value label and vertical dotted line for highlighted bar
      if (point.highlighted) {
        // Draw vertical dotted line
        ctx.strokeStyle = "#6b7280"
        ctx.lineWidth = 1
        ctx.setLineDash([3, 3])
        ctx.beginPath()
        ctx.moveTo(x + barWidth / 2, 0)
        ctx.lineTo(x + barWidth / 2, y)
        ctx.stroke()
        ctx.setLineDash([])

        // Draw circle at top of line
        ctx.fillStyle = "#ffffff"
        ctx.strokeStyle = "#1e3a5f"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(x + barWidth / 2, y, 6, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        // Draw tooltip with value
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 12px Inter, system-ui, sans-serif"
        ctx.textAlign = "center"

        // Draw tooltip background
        const tooltipText = `$${point.value.toLocaleString()}`
        const tooltipWidth = 80
        const tooltipHeight = 24
        const tooltipX = x + barWidth / 2 - tooltipWidth / 2
        const tooltipY = y - tooltipHeight - 10

        ctx.fillStyle = "#1e3a5f"
        ctx.beginPath()
        ctx.roundRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 4)
        ctx.fill()

        // Draw tooltip text
        ctx.fillStyle = "#ffffff"
        ctx.fillText(tooltipText, x + barWidth / 2, tooltipY + tooltipHeight / 2 + 4)
      }
    })
  }, [data])

  return (
    <div className="h-[300px] w-full">
      <canvas ref={canvasRef} className="h-full w-full" style={{ width: "100%", height: "100%" }} />
    </div>
  )
}

