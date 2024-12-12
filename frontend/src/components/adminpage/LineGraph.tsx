import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // Hide legend to match the clean look
    },
    title: {
      display: true,
      text: "View Statistics",
      font: {
        size: 16,
        weight: "bold" as const, // Ensure the type aligns with expectations
      },
      color: "#334155", // Dark blue-gray color
    },
    tooltip: {
      backgroundColor: "#1E3A8A", // Dark blue background for tooltip
      titleColor: "#fff",
      bodyColor: "#fff",
      padding: 10,
      cornerRadius: 5,
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#64748B",
        display: false,
      },
    },
    y: {
      grid: {
        color: "#E5E7EB",
      },
      ticks: {
        color: "#64748B", // Gray color for Y-axis labels
        stepSize: 1, // Adjust step size based on data range
      },
    },
  },
};

interface ViewCountData {
  date: string;
  total_views: number;
}

interface LineChartProps {
  isLoading: boolean;
  chart_data:
    | {
        monthlyViews: ViewCountData[];
        yearlyViews: ViewCountData[];
      }
    | undefined;
}

function LineGraph({ chart_data, isLoading }: LineChartProps) {
  const [viewType, setViewType] = useState<"monthly" | "yearly">("monthly");

  const handleViewChange = (value: "monthly" | "yearly") => {
    setViewType(value);
  };

  const labels =
    viewType === "monthly"
      ? chart_data?.monthlyViews.map((item) => item.date)
      : chart_data?.yearlyViews.map((item) => item.date);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Views",
        data:
          viewType === "monthly"
            ? chart_data?.monthlyViews.map((item) => item.total_views)
            : chart_data?.yearlyViews.map((item) => item.total_views),
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "#3B82F6",
        borderWidth: 2,
        tension: 0.3,
        pointBackgroundColor: "#3B82F6",
        pointHoverBackgroundColor: "#1E3A8A",
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  if (isLoading) {
    return <div className="text-gray-500 text-center">Loading...</div>;
  }

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-semibold text-gray-800">View Statistics</p>
        <Select
          onValueChange={(value) =>
            handleViewChange(value as "monthly" | "yearly")
          }
        >
          <SelectTrigger className="w-[180px] border border-gray-300 rounded-md shadow-sm text-gray-600">
            <SelectValue placeholder="Select View" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg rounded-md">
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="h-[500px]">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default LineGraph;
