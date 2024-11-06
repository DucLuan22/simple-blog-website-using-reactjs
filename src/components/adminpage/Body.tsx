import { Bell, MessageCircle } from "lucide-react";
import React from "react";
import LineGraph from "./LineGraph";
import PieChart from "./PieChart";
import BarChart from "./BarChart";

import useGetViewStats from "@/hooks/useGetViewStat";

interface BodyProps {
  user_id: number | undefined;
}
function Body({ user_id }: BodyProps) {
  const lineData = useGetViewStats(user_id);

  return (
    <div className="flex gap-10 flex-col lg:flex-row ">
      <div className="w-full">
        <LineGraph isLoading={lineData.isLoading} chart_data={lineData.data} />
        <div className="flex flex-col items-center lg:items-start lg:flex-row mt-10 w-full">
          <div className="h-[300px] lg:h-[500px] lg:basis-1/2 mb-10 lg:mb-0 lg:mr-5">
            <BarChart />
          </div>
          <div className="lg:basis-1/2 lg:ml-5 h-[300px] lg:h-[500px] flex ">
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
