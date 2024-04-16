import { Menu, Moon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const NavLink = () => {
    return (
      <>
        <Link to="/">Homepage</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
      </>
    );
  };

  const NavSocialIcon = () => {
    return (
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
  };

  const handleToggleNavMenu = () => {
    setIsOpen(!isOpen);
  };

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
      <h1 className="font-bold text-2xl mx-auto">luanblog</h1>

      <div className="flex gap-4">
        <Moon className="w-6 h-6" />
        <div className="md:flex md:visible hidden gap-4 font-semibold">
          <NavLink />
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col items-center basis-full gap-y-4 mt-5">
          <NavLink />
          <div className="flex gap-5 mt-2">
            <NavSocialIcon />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
