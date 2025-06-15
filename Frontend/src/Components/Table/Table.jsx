import React, { useState, useMemo } from "react";
import mockUsers from "../../mockUsers.json";
import Header from "./Header";
import SearchAndControls from "./SearchAndControls";
import UserTable from "./UserTable";
import Pagination from "./Pagination";

function Table() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [users, searchTerm]);

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "currentRating") {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [filteredUsers, sortField, sortDirection]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedUsers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  const handleSelectionChange = (userId, isSelected) => {
    if (isSelected) {
      setSelectedUsers(prev => [...prev, userId]);
    } else {
      setSelectedUsers(prev => prev.filter(id => id !== userId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedUsers(prev => {
        const currentPageIds = paginatedUsers.map(user => user.id);
        const newSelected = [...prev];
        currentPageIds.forEach(id => {
          if (!newSelected.includes(id)) {
            newSelected.push(id);
          }
        });
        return newSelected;
      });
    } else {
      const currentPageIds = paginatedUsers.map(user => user.id);
      setSelectedUsers(prev => prev.filter(id => !currentPageIds.includes(id)));
    }
  };

  const isAllSelected = paginatedUsers.length > 0 && 
    paginatedUsers.every(user => selectedUsers.includes(user.id));

  const handleBulkDelete = () => {
    if (selectedUsers.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedUsers.length} selected users?`)) {
      setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
    }
  };

  const handleBulkExport = () => {
    if (selectedUsers.length === 0) return;

    const selectedUserData = users.filter(user => selectedUsers.includes(user.id));
    const headers = [
      "Name",
      "Email",
      "Phone Number",
      "Codeforces",
      "Current Rating",
      "Max Rating",
    ];
    const csvContent = [
      headers.join(","),
      ...selectedUserData.map((user) =>
        [
          `"${user.name}"`,
          `"${user.email}"`,
          `"${user.phone}"`,
          `"${user.Codeforces}"`,
          `"${user.currentRating}"`,
          `"${user.maxRating}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `selected_users_${selectedUsers.length}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone Number",
      "Codeforces",
      "Current Rating",
      "Max Rating",
    ];
    const csvContent = [
      headers.join(","),
      ...sortedUsers.map((user) =>
        [
          `"${user.name}"`,
          `"${user.email}"`,
          `"${user.phone}"`,
          `"${user.Codeforces}"`,
          `"${user.currentRating}"`,
          `"${user.maxRating}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "user_directory.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const avatarColors = [
    "from-pink-400 to-rose-500",
    "from-purple-400 to-indigo-500",
    "from-blue-400 to-cyan-500",
    "from-green-400 to-emerald-500",
    "from-yellow-400 to-orange-500",
    "from-red-400 to-pink-500",
  ];

  return (
    <div className="min-h-screen transition-all duration-500">
      <div className="min-h-screen px-2 pb-2 lg:py-2">
        <div className="max-w-7xl mx-auto">
          <Header users={users} />

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-2xl sm:rounded-3xl blur-2xl"></div>
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700/30">
              
              <SearchAndControls
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                downloadCSV={downloadCSV}
                selectedUsers={selectedUsers}
                onBulkDelete={handleBulkDelete}
                onBulkExport={handleBulkExport}
                onClearSelection={() => setSelectedUsers([])}
              />

              {selectedUsers.length > 0 && (
                <div className="px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-700 dark:text-blue-300">
                      {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleBulkExport}
                        className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Export Selected
                      </button>
                      <button
                        onClick={handleBulkDelete}
                        className="px-3 py-1 text-xs bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        Delete Selected
                      </button>
                      <button
                        onClick={() => setSelectedUsers([])}
                        className="px-3 py-1 text-xs bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                      >
                        Clear Selection
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <UserTable
                paginatedUsers={paginatedUsers}
                avatarColors={avatarColors}
                selectedUsers={selectedUsers}
                onSelectionChange={handleSelectionChange}
                onSelectAll={handleSelectAll}
                isAllSelected={isAllSelected}
              />

              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                sortedUsers={sortedUsers}
                itemsPerPage={itemsPerPage}
              />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;