import React from "react";
import { Mail, Phone, Eye, Edit, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditUser from "../Tcrud/EditUser";
import DeleteUser from "../Tcrud/DeleteUser";

const UserMobileCard = ({
  user,
  index,
  avatarColors,
  isSelected,
  onSelectionChange,
}) => {
  const navigate = useNavigate();
  const handleProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div
      className="p-4 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300"
      onClick={() => handleProfile(user.id)}
    >
      <div className="flex items-start space-x-3">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isSelected}
            onClick={(e) => e.stopPropagation()}
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

          <div className="flex items-center justify-center space-x-1">
            <button
              className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-200 hover:scale-110 active:scale-95 group cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleProfile(user.id);
              }}
            >
              <Eye className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" />
            </button>
            <div onClick={(e) => e.stopPropagation()}>
              <EditUser user={user} />
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              <DeleteUser user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMobileCard;
