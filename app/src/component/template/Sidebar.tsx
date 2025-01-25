import HandbagPng from "../../../public/Handbag.png";
import PackagePng from "../../../public/Package.png";
import User from "../../../public/User.png";
import { NavLink } from "react-router";
import Logout from "../../page/profile/Logout";

const Sidebar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  return (
    <aside
      id="sidebar"
      className={`fixed inset-y-0 left-0 w-64 z-50 bg-red-500 text-white space-y-6 transform transition-transform md:relative md:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex w-full items-center justify-between px-5 pt-5">
        <div className="flex flex-row gap-2">
          <img
            src={HandbagPng}
            className="w-5 h-5 object-contain max-w-full rounded"
            alt="Produk"
          />
          <h1 className="text-xl font-bold">SIMS Web App</h1>
        </div>
      </div>

      <nav>
        <NavLink
          to="/"
          className="block py-2.5 rounded hover:bg-gray-100/50  pl-5"
        >
          <div className="flex flex-row gap-2 items-center">
            <img
              src={PackagePng}
              className="w-5 h-5 object-contain max-w-full rounded"
              alt="Produk"
            />
            <h1 className="text-xl font-light">Produk</h1>
          </div>
        </NavLink>
        <NavLink
          to="/profile"
          className="block py-2.5 rounded hover:bg-gray-100/50  pl-5"
        >
          <div className="flex flex-row gap-2 items-center">
            <img
              src={User}
              className="w-5 h-5 object-contain max-w-full rounded"
              alt="Profile"
            />
            <h1 className="text-xl font-light">Profile</h1>
          </div>
        </NavLink>
        <Logout />
      </nav>
    </aside>
  );
};

export default Sidebar;
