// src/components/profile/PortfolioChart.jsx
import React, { useEffect, useRef } from "react";
import styles from "./PortfolioChart.module.css";
import Chart from "chart.js/auto";
import { formatNumberFa } from "../../utils/format";

function getCssVar(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}
function hexToRgb(hex) {
  const raw = hex.replace("#", "");
  const bigint = parseInt(
    raw.length === 3
      ? raw
          .split("")
          .map((c) => c + c)
          .join("")
      : raw,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

export default function PortfolioChart({ data }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    if (!data || data.length === 0) {
      // هیچ دیتایی نداریم؛ چیزی رسم نکن
      return;
    }

    const labels = data.map((_, i) => `پرتفو ${formatNumberFa(i + 1)}`);
    const values = data.map((d) => Number(d.profit_loss || 0));

    const primaryHex = getCssVar("--color-primary") || "#6C63FF";
    const { r, g, b } = hexToRgb(primaryHex);
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.5)`);
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "سود/ضرر (تومان)",
            data: values,
            borderColor: primaryHex,
            backgroundColor: gradient,
            tension: 0.3,
            fill: true,
            pointRadius: 4,
            pointBackgroundColor: primaryHex,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: "#fff",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: { color: "#c0c2c5" },
            grid: { display: false, color: "var(--divider-strong)" },
          },
          y: {
            ticks: {
              color: "#c0c2c5",
              callback: (val) => formatNumberFa(val),
            },
            grid: { color: "var(--divider-strong)" },
          },
        },
        plugins: {
          legend: { labels: { color: "#a3a5a8" } },
          tooltip: {
            titleColor: "#fff",
            bodyColor: "#fff",
            backgroundColor: "rgba(0,0,0,0.7)",
            callbacks: {
              label: (ctx) => `${formatNumberFa(ctx.parsed.y)} تومان`,
            },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [data]);

  return (
    <div className={`card ${styles.card}`}>
      <div className={`card-header ${styles.header}`}>
        نمودار سود و ضرر 10 پرتفو اخیر
      </div>
      <div className={`card-body ${styles.body}`}>
        {!data || data.length === 0 ? (
          <div className="text-center p-3">
            <p>هیچ پرتفوئی برای نمایش در نمودار وجود ندارد.</p>
          </div>
        ) : (
          <div className={styles.chartContainer}>
            <canvas ref={canvasRef} />
          </div>
        )}
      </div>
    </div>
  );
}
