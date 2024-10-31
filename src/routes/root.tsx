import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useAuthenticatedRequest from "../hooks/useAuthenticate";

function Root() {
  useAuthenticatedRequest();
  return (
    <div className="w-screen h-screen px-3 xl:px-[7%] 2xl:px-[10%] ">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Root;
