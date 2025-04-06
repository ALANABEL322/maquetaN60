import { useEffect, useRef } from "react";

interface DataPoint {
  day: string;
  value: number;
  highlighted?: boolean;
}

interface StatisticsBarChartProps {
  data: DataPoint[];
}

export function StatisticsBarChart({ data }: StatisticsBarChartProps) {
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

    const maxValue = Math.max(...data.map((d) => d.value), 40000);

    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;

    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
      const y = chartHeight - (i / gridLines) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(chartWidth, y);
      ctx.stroke();

      ctx.fillStyle = "#9ca3af";
      ctx.font = "12px Inter, system-ui, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`${i * 10}k`, 0, y - 5);
    }
    data.forEach((point, index) => {
      const x = barSpacing + index * (barWidth + barSpacing);
      const barHeight = (point.value / maxValue) * chartHeight;
      const y = chartHeight - barHeight;

      ctx.fillStyle = "#1e3a5f";
      const radius = 4;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + barWidth - radius, y);
      ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
      ctx.lineTo(x + barWidth, y + barHeight);
      ctx.lineTo(x, y + barHeight);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#9ca3af";
      ctx.font = "12px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(point.day, x + barWidth / 2, chartHeight + 20);

      if (point.highlighted) {
        ctx.strokeStyle = "#6b7280";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(x + barWidth / 2, 0);
        ctx.lineTo(x + barWidth / 2, y);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "#1e3a5f";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x + barWidth / 2, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 12px Inter, system-ui, sans-serif";
        ctx.textAlign = "center";

        const tooltipText = `$${point.value.toLocaleString()}`;
        const tooltipWidth = 80;
        const tooltipHeight = 24;
        const tooltipX = x + barWidth / 2 - tooltipWidth / 2;
        const tooltipY = y - tooltipHeight - 10;

        ctx.fillStyle = "#1e3a5f";
        ctx.beginPath();
        ctx.roundRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 4);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.fillText(
          tooltipText,
          x + barWidth / 2,
          tooltipY + tooltipHeight / 2 + 4
        );
      }
    });
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
