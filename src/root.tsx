import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuthenticatedRequest from "./hooks/useAuthenticate";
import { useQueryClient } from "react-query";
function Root() {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useAuthenticatedRequest();

  if (isLoading) return <div>Loading...</div>;

  console.log(data);
  return (
    <div className="w-screen h-screen px-3 md:px-[5%] lg:px-[10%] ">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Root;
