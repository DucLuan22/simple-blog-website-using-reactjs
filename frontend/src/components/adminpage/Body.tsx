import LineGraph from "./LineGraph";

import useGetViewStats from "@/hooks/useGetViewStat";
import PostStats from "./PostStats";

interface BodyProps {
  user_id: number | undefined;
}
function Body({ user_id }: BodyProps) {
  const lineData = useGetViewStats(user_id);

  return (
    <div className="flex gap-10 flex-col lg:flex-row ">
      <div className="w-full space-y-10">
        <LineGraph isLoading={lineData.isLoading} chart_data={lineData.data} />
        <PostStats />
      </div>
    </div>
  );
}

export default Body;
