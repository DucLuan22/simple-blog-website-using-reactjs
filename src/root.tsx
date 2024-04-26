import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Root() {
  return (
    <div className="w-screen h-screen px-3 md:px-[5%] lg:px-[10%] ">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Root;
