import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
function Root() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      axios
        .get("http://localhost:5000/auth/login/success", {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) return response.data;
          throw new Error("Authentication has failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUser();
  }, []);

  return (
    <div className="w-screen h-screen px-3 md:px-[5%] lg:px-[10%] ">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Root;
