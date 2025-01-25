import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Temp = ({ children }: any) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} />
      {/* Main content */}
      <div className="flex-1 flex flex-col p-3 space-y-3">
        {/* Navbar */}
        <Navbar setSidebarOpen={setSidebarOpen} isSidebarOpen={isSidebarOpen} />
        {children}
      </div>
    </div>
  );
};

export default Temp;
