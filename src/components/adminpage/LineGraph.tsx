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
  const [viewType, setViewType] = useState<"monthly" | "yearly">("monthly"); // State to toggle views

  // Toggle function to handle view changes
  const handleViewChange = (value: "monthly" | "yearly") => {
    setViewType(value);
  };

  // Set labels and data based on the selected view (monthly or yearly)
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
        backgroundColor: "rgba(53, 162, 235, 0.2)", // RGBA color with alpha for transparency
        borderColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div>
      <div>
        {/* Select component to toggle between Monthly and Yearly views */}
        <Select
          onValueChange={(value) =>
            handleViewChange(value as "monthly" | "yearly")
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Line chart based on selected view */}
      <Line options={options} data={data} />
    </div>
  );
}

export default LineGraph;
