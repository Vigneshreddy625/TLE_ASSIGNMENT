import {
  Home,
  PanelLeftDashed,
  PanelRightDashed,
  LayoutGrid,
  X,
  Menu,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import ModeToggle from "../Darkmode/ToggleMode";
import logo from "../../assets/tlelogo.png";
import { img } from "framer-motion/client";

const navItems = [
  { icon: Home, label: "Home", path: "home" },
  { icon: LayoutGrid, label: "Assignment", path: "table" },
];

function Navbar({ onToggleCollapse, isMobile, isOpen, onClose }) {
  const [collapsed, setCollapsed] = useState(true);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1];

  const toggleCollapse = useCallback(() => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);

    if (onToggleCollapse) {
      onToggleCollapse(newCollapsedState);
    }
  }, [collapsed, onToggleCollapse]);

  const handleNavigation = useCallback(
    (path) => {
      navigate(path);
      if (isMobile) {
        setMobileDropdownOpen(false);
      }
    },
    [navigate, isMobile]
  );

  const isActive = useCallback(
    (path) => {
      return currentPath === path;
    },
    [currentPath]
  );

  useEffect(() => {
    if (onToggleCollapse) {
      onToggleCollapse(collapsed);
    }
  }, []);

  if (isMobile) {
    return (
      <>
        <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 h-14">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="TLE Logo" className="w-6 h-6" />
              <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                TLE
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="">
                <ModeToggle />
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
              >
                {mobileDropdownOpen ? (
                  <X size={20} className="text-gray-700 dark:text-white" />
                ) : (
                  <Menu size={20} className="text-gray-700 dark:text-white" />
                )}
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {mobileDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="px-4 pb-4 bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-gray-700"
              >
                {navItems.map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center py-3 px-3 rounded-lg mt-2 cursor-pointer transition-colors ${
                      isActive(item.path)
                        ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : "hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-700 dark:text-white"
                    }`}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <item.icon
                      size={18}
                      className={`mr-3 ${
                        isActive(item.path)
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    />
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </>
    );
  }

  return (
    <motion.div
      className="hidden lg:flex bg-[#ECECEC] dark:bg-[#302c2c] rounded-lg shadow-md flex-col h-full border border-gray-300 dark:border-none overflow-hidden"
      animate={{
        width: collapsed ? "5rem" : "14rem",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <div className="flex items-center w-full mb-2 px-5 py-4 border-b border-gray-400">
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                className="font-semibold text-gray-700 dark:text-white block whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                TLE Eliminators
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleCollapse}
        >
            <img src={logo} alt="" className={`w-5 h-5 cursor-pointer ${collapsed ? "mr-2" : "mr-0"}`} />
        </motion.div>
      </div>

      <div className="flex flex-col space-y-4 px-5 py-2 flex-1">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`flex items-center w-full py-2 px-2 rounded-lg hover:bg-blue-200 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-200 space-x-2 ${
              isActive(item.path) ? "bg-blue-200 dark:bg-gray-500" : ""
            }`}
            onClick={() => handleNavigation(item.path)}
          >
            <div className="flex items-center justify-center w-6 h-6 flex-shrink-0">
              {typeof item.icon === "function" ? (
                <item.icon />
              ) : (
                <item.icon
                  size={20}
                  className="text-gray-800 dark:text-white hover:text-blue-600"
                />
              )}
            </div>

            <div className="ml-3 overflow-hidden">
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    className="text-gray-700 dark:text-white block whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Navbar;
