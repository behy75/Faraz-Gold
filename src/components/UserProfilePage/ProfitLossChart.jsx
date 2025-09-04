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
  // Default data matching the image pattern
  const defaultData = [
    { portfolio: 1, profitLoss: -50000 },
    { portfolio: 2, profitLoss: -20000 },
    { portfolio: 3, profitLoss: -10000 },
    { portfolio: 4, profitLoss: 280000 },
    { portfolio: 5, profitLoss: -50000 },
    { portfolio: 6, profitLoss: 10000 },
    { portfolio: 7, profitLoss: 20000 },
    { portfolio: 8, profitLoss: 15000 },
    { portfolio: 9, profitLoss: 25000 },
    { portfolio: 10, profitLoss: 30000 },
  ];

  const chartData = data.length > 0 ? data : defaultData;

  const chartConfig = {
    data: {
      labels: chartData.map((item) => `پرتفو ${item.portfolio}`),
      datasets: [
        {
          label: "سود/ضرر (تومان)",
          data: chartData.map((item) => item.profitLoss),
          borderColor: "#6c63ff",
          backgroundColor: function (context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) {
              return null;
            }
            const gradient = ctx.createLinearGradient(
              0,
              chartArea.bottom,
              0,
              chartArea.top
            );
            gradient.addColorStop(0, "rgba(108, 99, 255, 0)");
            gradient.addColorStop(1, "rgba(108, 99, 255, 0.4)");
            return gradient;
          },
          borderWidth: 3,
          pointBackgroundColor: "#6c63ff",
          pointBorderColor: "#6c63ff",
          pointBorderWidth: 0,
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.4,
          stepped: false,
          legendColor: "#3f3b87",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: false, // Remove title since we have card header
        },
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
            generateLabels: function (chart) {
              const datasets = chart.data.datasets;
              return datasets.map((dataset, index) => ({
                text: dataset.label,
                fillStyle: dataset.legendColor || dataset.backgroundColor,
                strokeStyle: "#6c63ff",
                lineWidth: dataset.borderWidth,
                pointStyle: "rect",
                hidden: !chart.isDatasetVisible(index),
                index: index,
                datasetIndex: index,
                fontColor: "#ffffff",
                fontFamily: "Vazir, IranSans, sans-serif",
                fontSize: 14,
                lineCap: "butt",
                lineDash: [],
                lineDashOffset: 0,
                lineJoin: "miter",
                pointStyle: "rect",
                pointStyleWidth: 20,
                pointStyleHeight: 8,
              }));
            },
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
            display: false,
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
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h5 className="mb-0">نمودار سود و ضرر 10 پرتفو اخیر</h5>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.chartContainer}>
          <div className={styles.chartWrapper}>
            <Line data={chartConfig.data} options={chartConfig.options} />
          </div>
        </div>
      </div>
    </div>
  );
}
