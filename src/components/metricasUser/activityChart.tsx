import { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

interface ActivityChartProps {
  data: number[];
}

const ChartContainer = styled("div")({
  height: "300px",
  width: "100%",
});

export function ActivityChart({ data }: ActivityChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();

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
    const barWidth = (chartWidth / barCount) * 0.6;
    const barSpacing = (chartWidth - barWidth * barCount) / (barCount + 1);

    const maxValue = Math.max(...data, 3000);

    const isDarkMode = theme.palette.mode === "dark";
    const gridColor = isDarkMode ? "#4338ca" : "#3730a3";
    const textColor = isDarkMode ? "#e5e7eb" : "#1f2937";
    const barColor = isDarkMode ? "#6366f1" : "#4f46e5";

    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;

    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
      const y = chartHeight - (i / gridLines) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(chartWidth, y);
      ctx.stroke();

      ctx.fillStyle = textColor;
      ctx.font = "12px Inter, system-ui, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`${i}k`, 0, y - 5);
    }

    const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    data.forEach((value, index) => {
      const x = barSpacing + index * (barWidth + barSpacing);
      const barHeight = (value / maxValue) * chartHeight;
      const y = chartHeight - barHeight;

      ctx.fillStyle = index === 4 ? "#1e3a5f" : barColor;

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

      ctx.fillStyle = textColor;
      ctx.font = "12px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(days[index], x + barWidth / 2, chartHeight + 20);

      if (index === 4) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 12px Inter, system-ui, sans-serif";
        ctx.textAlign = "center";

        ctx.fillStyle = "#1e1e3f";
        const tooltipWidth = 60;
        const tooltipHeight = 24;
        const tooltipX = x + barWidth / 2 - tooltipWidth / 2;
        const tooltipY = y - tooltipHeight - 5;

        ctx.beginPath();
        ctx.roundRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 4);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.fillText(
          "2,313",
          x + barWidth / 2,
          tooltipY + tooltipHeight / 2 + 4
        );
      }
    });
  }, [data, theme.palette.mode]);

  return (
    <ChartContainer>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: theme.palette.background.paper,
        }}
      />
    </ChartContainer>
  );
}
