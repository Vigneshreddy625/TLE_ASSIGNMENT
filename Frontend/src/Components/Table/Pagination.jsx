import React from "react";

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  sortedUsers,
  itemsPerPage
}) => {
  return (
    <div className="bg-gradient-to-r from-gray-50/80 to-blue-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-sm py-3 sm:py-4 px-3 sm:px-6 border-t border-gray-200/50 dark:border-gray-700/50">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 text-center sm:text-left">
          Showing{" "}
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {(currentPage - 1) * itemsPerPage + 1}
          </span>{" "}
          to{" "}
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {Math.min(currentPage * itemsPerPage, sortedUsers.length)}
          </span>{" "}
          of{" "}
          <span className="font-bold text-blue-600 dark:text-blue-400">
            {sortedUsers.length}
          </span>{" "}
          members
        </div>

        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white/70 dark:bg-gray-800/70 rounded-lg shadow backdrop-blur-sm"
          >
            Prev
          </button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1
              )
              .map((page, index, array) => (
                <React.Fragment key={page}>
                  {index > 0 && array[index - 1] !== page - 1 && (
                    <span className="px-1 text-xs text-gray-500 dark:text-gray-400">
                      ...
                    </span>
                  )}
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 text-xs font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 ${
                      page === currentPage
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow"
                        : "bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 shadow backdrop-blur-sm"
                    }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}
          </div>

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white/70 dark:bg-gray-800/70 rounded-lg shadow backdrop-blur-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;