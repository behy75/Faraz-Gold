import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import styles from "./ProfitLossChart.module.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ProfitLossChart({ data = [] }) {
  // Default data if none provided
  const defaultData = [
    { portfolio: 1, profitLoss: -2500000 },
    { portfolio: 2, profitLoss: -500000 },
    { portfolio: 3, profitLoss: -2700000 },
    { portfolio: 4, profitLoss: 0 },
    { portfolio: 5, profitLoss: 0 },
    { portfolio: 6, profitLoss: 0 },
    { portfolio: 7, profitLoss: 0 },
    { portfolio: 8, profitLoss: -700000 },
    { portfolio: 9, profitLoss: -1000000 },
    { portfolio: 10, profitLoss: -2000000 },
  ];

  const chartData = data.length > 0 ? data : defaultData;

  const chartConfig = {
    data: {
      labels: chartData.map((item) => `پرتفو ${item.portfolio}`),
      datasets: [
        {
          label: "سود/ضرر (تومان)",
          data: chartData.map((item) => item.profitLoss),
          borderColor: "#784ed1",
          backgroundColor: "rgba(120, 78, 209, 0.2)",
          borderWidth: 2,
          pointBackgroundColor: "#784ed1",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.4,
          stepped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            color: "#ffffff",
            font: {
              size: 14,
              family: "Vazir, IranSans, sans-serif",
            },
            usePointStyle: true,
            pointStyle: "rect",
          },
        },
        tooltip: {
          backgroundColor: "rgba(42, 45, 53, 0.9)",
          titleColor: "#ffffff",
          bodyColor: "#ffffff",
          borderColor: "#343a40",
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            label: function (context) {
              const value = context.parsed.y;
              return `${value.toLocaleString("fa-IR")} تومان`;
            },
          },
        },
      },
      scales: {
        x: {
          display: true,
          title: {
            display: false,
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
            drawBorder: false,
          },
          ticks: {
            color: "#ffffff",
            font: {
              size: 12,
              family: "Vazir, IranSans, sans-serif",
            },
          },
        },
        y: {
          display: true,
          title: {
            display: false,
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
            drawBorder: false,
          },
          ticks: {
            color: "#ffffff",
            font: {
              size: 12,
              family: "Vazir, IranSans, sans-serif",
            },
            callback: function (value) {
              return value.toLocaleString("fa-IR");
            },
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartWrapper}>
        <Line data={chartConfig.data} options={chartConfig.options} />
      </div>
    </div>
  );
}
