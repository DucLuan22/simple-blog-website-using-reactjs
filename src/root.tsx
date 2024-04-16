import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function Root() {
  return (
    <div className="w-screen h-screen px-3 md:px-[5%] lg:px-[10%] bg-dark">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Root;
