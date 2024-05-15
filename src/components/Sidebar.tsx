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
    <div>
      <div className="flex h-screen">
        <div
          className={`fixed inset-0 z-30 transition-transform transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } bg-gray-800 text-white w-64 h-full lg:translate-x-0 lg:static lg:w-64`}
        >
          <div className="p-4 mt-16 lg:mt-0">
            <h1 className="text-2xl font-bold">Sidebar</h1>
            <nav className="mt-6">
              <ul>
                <li>
                  <Link
                    to="/"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="flex-1 flex flex-col z-50">
          <header className="flex items-center justify-between p-4 bg-gray-800 text-white lg:hidden">
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
            <h1 className="text-xl font-bold">My App</h1>
          </header>
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
