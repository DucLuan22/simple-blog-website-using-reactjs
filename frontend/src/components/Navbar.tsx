import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useCounterStore } from "@/store";
import { Menu, X, Search } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import axios from "axios";
import { Input } from "./ui/input";
import SearchBar from "./navbar/SearchBar";
import useSearchedPosts from "@/hooks/useGetSearchedPosts";
import SearchResults from "./navbar/SearchResults";
import useDebouncedValue from "@/hooks/useDebouncedValue";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebouncedValue(searchValue, 500);
  const {
    data: posts = [],
    isLoading,
    isError,
    error,
  } = useSearchedPosts(debouncedValue);
  const setNotAuthenticated = useCounterStore(
    (state) => state.setNotAuthenticated
  );
  const isAuthenticated = useCounterStore((state) => state.isAuthenticated);
  const user = useCounterStore((state) => state.user);

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signout`,
        { id: user?.id },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      localStorage.removeItem("accessToken");
      setNotAuthenticated();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleToggleNavMenu = () => setIsOpen((prev) => !prev);
  const handleToggleSearch = () => setIsSearchOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setIsOpen(false);
        setIsSearchOpen(false);
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
          <DropdownMenuTrigger aria-label="User Menu">
            <Avatar>
              <AvatarImage
                src={user?.avatar_url}
                referrerPolicy="no-referrer"
              />
              <AvatarFallback>
                {user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </>
  );

  return (
    <nav className="flex flex-wrap items-center justify-between py-5">
      <button
        onClick={handleToggleNavMenu}
        className="md:hidden"
        aria-label="Toggle Navigation"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <p className="font-bold text-2xl">luanblog</p>

      <div className="relative hidden md:inline">
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
        {debouncedValue && (
          <SearchResults
            posts={posts}
            isLoading={isLoading}
            isError={isError}
            error={error}
          />
        )}
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button
          onClick={handleToggleSearch}
          className="md:hidden"
          aria-label="Toggle Search"
        >
          <Search className="w-6 h-6" />
        </button>
        <div className="hidden md:flex items-center gap-4">
          <NavLink />
        </div>
      </div>

      {isSearchOpen && (
        <div className="w-full relative mt-4">
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          {debouncedValue && (
            <SearchResults
              posts={posts}
              isLoading={isLoading}
              isError={isError}
              error={error}
            />
          )}
        </div>
      )}

      {isOpen && (
        <div className="flex flex-col items-center w-full gap-4 mt-5">
          <NavLink />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
