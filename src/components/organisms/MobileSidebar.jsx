import React from "react";
import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { motion, AnimatePresence } from "framer-motion";

const MobileSidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { path: "/", icon: "LayoutDashboard", label: "Dashboard" },
    { path: "/patients", icon: "Users", label: "Patients" },
    { path: "/appointments", icon: "Calendar", label: "Appointments" },
    { path: "/doctors", icon: "Stethoscope", label: "Doctors" },
    { path: "/departments", icon: "Building2", label: "Departments" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 w-64 bg-white min-h-screen z-50 lg:hidden shadow-xl"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <ApperIcon name="Heart" size={24} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">CareFlow</h1>
                    <p className="text-xs text-gray-600">Hospital Management</p>
                  </div>
                </div>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  <ApperIcon name="X" size={24} />
                </button>
              </div>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      onClick={onClose}
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
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;