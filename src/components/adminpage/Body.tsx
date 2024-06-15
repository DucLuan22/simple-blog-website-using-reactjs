import { Bell, MessageCircle } from "lucide-react";
import React from "react";
import LineGraph from "./LineGraph";
import PieChart from "./PieChart";
import BarChart from "./BarChart";

function Body() {
  return (
    <div className="flex gap-10 flex-col lg:flex-row">
      <div className="w-full lg:basis-2/3">
        <LineGraph />
        <div className="flex flex-col items-center lg:items-start lg:flex-row mt-10 w-full">
          <div className="w-full md:h-[500px] lg:basis-1/2 mb-10 lg:mb-0 lg:mr-5">
            <BarChart />
          </div>
          <div className="w-full lg:basis-1/2 lg:ml-5">
            <PieChart />
          </div>
        </div>
      </div>
      <div className="border-[1px] h-[500px] w-full lg:basis-1/3 rounded-xl bg-white">
        <div className="p-4 flex gap-2 items-center bg-gray-300 rounded-tl-xl rounded-tr-xl">
          <Bell className="w-6 h-6" />
          <h1>Notifications Panel</h1>
        </div>

        <div className="m-5 border-[1px] border-gray-300 flex flex-col">
          <div className="flex p-4 justify-between border-b-[1px] border-gray-300">
            <div className="flex gap-2 items-center">
              <MessageCircle className="w-6 h-6" />
              <h1>New Comments</h1>
            </div>
            <p>4 minutes ago</p>
          </div>

          <div className="flex p-4 justify-between border-b-[1px] border-gray-300">
            <div className="flex gap-2 items-center">
              <MessageCircle className="w-6 h-6" />
              <h1>New Comments</h1>
            </div>
            <p>4 minutes ago</p>
          </div>

          <div className="flex p-4 justify-between border-b-[1px] border-gray-300">
            <div className="flex gap-2 items-center">
              <MessageCircle className="w-6 h-6" />
              <h1>New Comments</h1>
            </div>
            <p>4 minutes ago</p>
          </div>

          <div className="flex p-4 justify-between border-b-[1px] border-gray-300">
            <div className="flex gap-2 items-center">
              <MessageCircle className="w-6 h-6" />
              <h1>New Comments</h1>
            </div>
            <p>4 minutes ago</p>
          </div>

          <div className="flex p-4 justify-between border-b-[1px] border-gray-300">
            <div className="flex gap-2 items-center">
              <MessageCircle className="w-6 h-6" />
              <h1>New Comments</h1>
            </div>
            <p>4 minutes ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
