import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useAuthenticatedRequest from "../hooks/useAuthenticate";
import React from "react";

// Optimize rendering of Navbar and Footer components
const MemoizedNavbar = React.memo(Navbar);
const MemoizedFooter = React.memo(Footer);

function Root() {
  const location = useLocation();
  const { isLoading } = useAuthenticatedRequest();

  const noFooterRoutes = ["/write", "/login"];

  const hideFooter = noFooterRoutes.includes(location.pathname);

  return (
    <div className="w-screen h-screen px-3 xl:px-[3%] 2xl:px-[5%] ">
      <MemoizedNavbar />
      <Outlet />
      {!hideFooter && <MemoizedFooter />}
    </div>
  );
}

export default Root;
