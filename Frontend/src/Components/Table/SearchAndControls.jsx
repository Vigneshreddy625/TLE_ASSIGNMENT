import React from "react";
import { Search, Download } from "lucide-react";

const SearchAndControls = ({
  searchTerm,
  setSearchTerm,
  itemsPerPage,
  setItemsPerPage,
  downloadCSV,
}) => {
  return (
    <div className="bg-gradient-to-r from-gray-50/80 to-blue-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-sm py-3 sm:py-4 px-3 sm:px-6 border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4 z-10" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:outline-none w-full sm:w-64 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between items-center sm:justify-end sm:space-x-4 w-full sm:w-auto">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-700 dark:text-gray-300 font-medium">
              Show
            </label>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-3 py-1.5 border-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm text-gray-900 dark:text-white shadow"
            >
              {[5, 10, 25, 50].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={downloadCSV}
            className="group relative bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-2">
              <Download className="w-4 h-4 group-hover:animate-bounce" />
              <span>Export</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndControls;
