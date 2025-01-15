import {
  Bookmark,
  CircleGauge,
  FileText,
  Home,
  Notebook,
  User,
} from "lucide-react";
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
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 z-50 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white shadow-lg w-64 lg:translate-x-0 lg:static lg:w-64`}
      >
        <div className="p-6 mt-8 lg:mt-0">
          {/* Navigation links */}
          <nav className="mt-6">
            <ul className="space-y-2 text-gray-600 font-sans font-semibold">
              <li className="">
                <Link
                  onClick={toggleSidebar}
                  to="/admin"
                  className="flex items-center space-x-3 py-2 px-4 rounded-md transition duration-200 hover:bg-blue-100 hover:text-blue-700"
                >
                  <CircleGauge className="w-6 h-6" />

                  {/* Replace with appropriate icon */}
                  <span className=""> Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  onClick={toggleSidebar}
                  className="flex items-center space-x-3 py-2 px-4 rounded-md transition duration-200 hover:bg-blue-100 hover:text-blue-700"
                >
                  <User className="w-6 h-6" />
                  {/* Replace with appropriate icon */}
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/post-history"
                  onClick={toggleSidebar}
                  className="flex items-center space-x-3 py-2 px-4 rounded-md transition duration-200 hover:bg-blue-100 hover:text-blue-700"
                >
                  <FileText className="w-6 h-6" />
                  {/* Replace with appropriate icon */}
                  <span>Posts</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/bookmark"
                  onClick={toggleSidebar}
                  className="flex items-center space-x-3 py-2 px-4 rounded-md transition duration-200 hover:bg-blue-100 hover:text-blue-700"
                >
                  <Bookmark className="w-6 h-6" />
                  {/* Replace with appropriate icon */}
                  <span>Bookmarks</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={toggleSidebar}
                  className="flex items-center space-x-3 py-2 px-4 rounded-md transition duration-200 hover:bg-blue-100 hover:text-blue-700"
                >
                  <Home className="w-6 h-6" />
                  {/* Replace with appropriate icon */}
                  <span>Homepage</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header for mobile */}
        <header className="z-50 flex items-center justify-between p-4 text-gray-600 lg:hidden">
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
          <p className="text-xl font-bold">luanblog</p>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
