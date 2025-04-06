import { useEffect, useRef } from "react";

interface DataPoint {
  year: string;
  value: number;
  trend: number;
}

interface StatisticsAreaChartProps {
  data: DataPoint[];
}

export function StatisticsAreaChart({ data }: StatisticsAreaChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, rect.width, rect.height);

    const chartWidth = rect.width;
    const chartHeight = rect.height - 40;
    const barCount = data.length;
    const barWidth = (chartWidth / barCount) * 0.7;
    const barSpacing = (chartWidth - barWidth * barCount) / (barCount + 1);

    const maxValue = Math.max(
      ...data.map((d) => Math.max(d.value, d.trend)),
      3000000
    );

    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;

    const gridLines = 3;
    for (let i = 0; i <= gridLines; i++) {
      const y = chartHeight - (i / gridLines) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(chartWidth, y);
      ctx.stroke();

      ctx.fillStyle = "#9ca3af";
      ctx.font = "12px Inter, system-ui, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`${i}M`, 0, y - 5);
    }

    data.forEach((point, index) => {
      const x = barSpacing + index * (barWidth + barSpacing);
      const barHeight = (point.value / maxValue) * chartHeight;
      const y = chartHeight - barHeight;

      const gradient = ctx.createLinearGradient(x, y, x, chartHeight);
      gradient.addColorStop(0, "rgba(147, 51, 234, 0.7)");
      gradient.addColorStop(1, "rgba(147, 51, 234, 0.1)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.rect(x, y, barWidth, barHeight);
      ctx.fill();

      ctx.fillStyle = "#9ca3af";
      ctx.font = "12px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(point.year, x + barWidth / 2, chartHeight + 20);

      if (index > 0) {
        ctx.fillStyle = "#ec4899";
        ctx.beginPath();
        ctx.arc(
          x + barWidth / 2,
          chartHeight - (point.trend / maxValue) * chartHeight,
          4,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    ctx.strokeStyle = "#ec4899";
    ctx.lineWidth = 2;
    ctx.beginPath();

    data.forEach((point, index) => {
      const x = barSpacing + index * (barWidth + barSpacing) + barWidth / 2;
      const y = chartHeight - (point.trend / maxValue) * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();
  }, [data]);

  return (
    <div className="h-[300px] w-full">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
