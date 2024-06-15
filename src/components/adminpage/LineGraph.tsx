import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Total Views",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: true,
      backgroundColor: "rgba(53, 162, 235, 0.2)", // RGBA color with alpha for transparency
      borderColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

function LineGraph() {
  return <Line options={options} data={data} />;
}

export default LineGraph;
