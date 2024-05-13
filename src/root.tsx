import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import useAuthenticatedRequest from "./hooks/useAuthenticate";
import { useQueryClient } from "react-query";
import { useCounterStore } from "./store";
function Root() {
  useAuthenticatedRequest();

  return (
    <div className="w-screen h-screen px-3 md:px-[5%] lg:px-[10%] ">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Root;
