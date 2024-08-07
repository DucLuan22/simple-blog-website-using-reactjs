import React, { useState } from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen">
      <div
        className={`fixed inset-y-0 z-50 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-gray-800 text-white w-64 lg:translate-x-0 lg:static lg:w-64`}
      >
        <div className="p-4 mt-8 lg:mt-0">
          <nav className="mt-6">
            <ul>
              <li>
                <Link
                  onClick={toggleSidebar}
                  to="/admin"
                  className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
                >
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  onClick={toggleSidebar}
                  className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/post-history"
                  onClick={toggleSidebar}
                  className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
                >
                  Post History
                </Link>
              </li>
              <li>
                <Link
                  to="/bookmark"
                  onClick={toggleSidebar}
                  className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
                >
                  Bookmark
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={toggleSidebar}
                  className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
                >
                  Return Home
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="z-50 flex items-center justify-between p-4 bg-gray-800 text-white lg:hidden">
          <button onClick={toggleSidebar} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
          <h1 className="text-xl font-bold">luanblog</h1>
        </header>
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
