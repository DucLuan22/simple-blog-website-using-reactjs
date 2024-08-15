import Sidebar from "@/components/Sidebar";
import useAuthenticatedRequest from "@/hooks/useAuthenticate";
import { Outlet } from "react-router-dom";

function ProfileRoutes() {
  useAuthenticatedRequest();
  return (
    <div className="w-screen h-screen">
      <Sidebar children={<Outlet />} />
    </div>
  );
}

export default ProfileRoutes;
