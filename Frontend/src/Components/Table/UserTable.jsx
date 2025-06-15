import React from "react";
import UserTableRow from "./UserTableRow";
import UserMobileCard from "./UserMobileCard";

const UserTable = ({ paginatedUsers, avatarColors, selectedUsers, onSelectionChange, onSelectAll, isAllSelected }) => {
  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900/80 dark:to-gray-800/80 border-b border-gray-200/50 dark:border-gray-700/50">
              <th className="p-4 text-center text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </th>
              <th className="p-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Name
              </th>
              <th className="p-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Email
              </th>
              <th className="p-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Phone
              </th>
              <th className="p-4 text-center text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Codeforce
              </th>
              <th className="p-4 text-center text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Current Rating
              </th>
              <th className="p-4 text-center text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Max Rating
              </th>
              <th className="p-4 text-center text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
            {paginatedUsers.map((user, index) => (
              <UserTableRow
                key={user.id}
                user={user}
                index={index}
                avatarColors={avatarColors}
                isSelected={selectedUsers.includes(user.id)}
                onSelectionChange={onSelectionChange}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-gray-200/50 dark:divide-gray-700/50">
        {paginatedUsers.map((user, index) => (
          <UserMobileCard
            key={user.id}
            user={user}
            index={index}
            avatarColors={avatarColors}
            isSelected={selectedUsers.includes(user.id)}
            onSelectionChange={onSelectionChange}
          />
        ))}
      </div>
    </>
  );
};

export default UserTable;