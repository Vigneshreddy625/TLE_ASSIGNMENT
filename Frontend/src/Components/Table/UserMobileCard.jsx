import React from "react";
import { Mail, Phone, Eye, Edit, Trash } from "lucide-react";

const UserMobileCard = ({ user, index, avatarColors, isSelected, onSelectionChange }) => {
  return (
    <div className="p-4 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300">
      <div className="flex items-start space-x-3">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelectionChange(user.id, e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-1"
          />
          <div
            className={`w-12 h-12 bg-gradient-to-r ${
              avatarColors[index % avatarColors.length]
            } rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow-lg flex-shrink-0`}
          >
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {user.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Member since 2024
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span>{user.currentRating}</span>
              <span>{user.maxRating}</span>
            </div>
          </div>

          <div className="space-y-1 mb-3">
            <div className="flex items-center space-x-2 text-xs text-gray-700 dark:text-gray-300">
              <Mail className="w-3 h-3 text-blue-500" />
              <span className="truncate">{user.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-700 dark:text-gray-300">
              <Phone className="w-3 h-3 text-green-500" />
              <span>{user.phone}</span>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2">
            <button className="w-8 h-8 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all">
              <Eye className="w-4 h-4 mx-auto" />
            </button>
            <button className="w-7 h-7 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all">
              <Edit className="w-3 h-3 mx-auto" />
            </button>
            <button className="w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all">
              <Trash className="w-3 h-3 mx-auto" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMobileCard;