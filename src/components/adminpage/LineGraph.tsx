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

interface ViewCountData {
  month: string;
  total_views: number;
}

interface LineChartProps {
  isLoading: boolean;
  chart_data: ViewCountData[] | undefined;
}

function LineGraph({ chart_data, isLoading }: LineChartProps) {
  const labels = chart_data?.map((item) => item.month);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Views",
        data: chart_data?.map((item) => item.total_views),
        fill: true,
        backgroundColor: "rgba(53, 162, 235, 0.2)", // RGBA color with alpha for transparency
        borderColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  if (isLoading) {
    return <div></div>;
  }
  return <Line options={options} data={data} />;
}

export default LineGraph;
