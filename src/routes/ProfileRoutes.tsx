import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

function ProfileRoutes() {
  return (
    <div className="w-screen h-screen">
      <Sidebar children={<Outlet />} />
    </div>
  );
}

export default ProfileRoutes;
