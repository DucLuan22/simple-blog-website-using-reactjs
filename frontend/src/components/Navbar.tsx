import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useCounterStore } from "@/store";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import axios from "axios";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const setNotAuthenticated = useCounterStore(
    (state) => state.setNotAuthenticated
  );
  const isAuthenticated = useCounterStore((state) => state.isAuthenticated);
  const user = useCounterStore((state) => state.user);

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("No access token found in localStorage");
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signout`,
        { id: user?.id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Clear the access token from localStorage
      localStorage.removeItem("accessToken");

      // Clear the authentication state in Zustand store
      setNotAuthenticated();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleToggleNavMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const NavLink = () => (
    <>
      <Link to="/">Homepage</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/about">About</Link>
      {isAuthenticated && <Link to="/write">Write</Link>}
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                src={user?.avatar_url}
                referrerPolicy="no-referrer"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/profile" className="w-full h-full">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </>
  );

  const NavSocialIcon = () => (
    <>
      <div className="w-[30px]">
        <img src="/logos/facebook.svg" alt="Facebook" />
      </div>
      <div className="w-[30px]">
        <img src="/logos/instagram.svg" alt="Instagram" />
      </div>
      <div className="w-[30px]">
        <img src="/logos/tiktok.svg" alt="TikTok" />
      </div>
      <div className="w-[35px]">
        <img src="/logos/youtube.svg" alt="YouTube" />
      </div>
    </>
  );

  return (
    <nav className="flex justify-between py-5 items-center flex-wrap">
      <div className="hover:cursor-pointer" onClick={handleToggleNavMenu}>
        {!isOpen ? (
          <Menu className="w-6 h-6 visible md:hidden" />
        ) : (
          <X className="w-6 h-6 visible md:hidden" />
        )}
      </div>

      <ul className="md:flex gap-x-4 hidden md:visible">
        <NavSocialIcon />
      </ul>

      <p className="font-bold text-2xl mx-auto inline-block">luanblog</p>

      <div className="flex gap-x-4 items-center">
        <ThemeToggle />
        <div className="md:flex md:visible hidden gap-4 font-semibold items-center">
          <NavLink />
        </div>
      </div>

      <div
        className={cn(
          `relative transition-all duration-100 ease-in-out flex flex-col items-center basis-full gap-y-4 mt-5  ${
            isOpen ? "h-auto opacity-100" : "h-0 opacity-0"
          }`,
          !isOpen && "invisible -translate-y-14"
        )}
      >
        <NavLink />
        <div className="flex gap-5 mt-2 ">
          <NavSocialIcon />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
