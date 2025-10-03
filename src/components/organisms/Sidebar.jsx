import React from "react";
import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = () => {
  const navItems = [
    { path: "/", icon: "LayoutDashboard", label: "Dashboard" },
    { path: "/patients", icon: "Users", label: "Patients" },
    { path: "/appointments", icon: "Calendar", label: "Appointments" },
    { path: "/doctors", icon: "Stethoscope", label: "Doctors" },
    { path: "/departments", icon: "Building2", label: "Departments" }
  ];

  return (
    <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <ApperIcon name="Heart" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">CareFlow</h1>
            <p className="text-xs text-gray-600">Hospital Management</p>
          </div>
        </div>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <ApperIcon name={item.icon} size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;