import React from "react";
import { Mail, Phone, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import cflogo from "../../assets/cflogo.webp";
import EditUser from "../Tcrud/EditUser";
import DeleteUser from "../Tcrud/DeleteUser";

const UserTableRow = ({
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
    <tr
      className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300"
      onClick={() => handleProfile(user.id)}
    >
      <td className="px-4 py-2 align-middle">
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelectionChange(user.id, e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </td>

      <td className="px-4 py-2 align-middle">
        <div className="flex items-center space-x-3">
          <div
            className={`w-10 h-10 bg-gradient-to-r ${
              avatarColors[index % avatarColors.length]
            } rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow-lg`}
          >
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              {user.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Member since 2024
            </div>
          </div>
        </div>
      </td>

      <td className="px-4 py-2 align-middle text-sm text-gray-700 dark:text-gray-300">
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4 text-blue-500" />
          <span>{user.email}</span>
        </div>
      </td>

      <td className="px-4 py-2 align-middle text-sm text-gray-700 dark:text-gray-300">
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4 text-green-500" />
          <span>{user.phone}</span>
        </div>
      </td>

      <td className="px-4 py-2 text-center">
        <div className="flex items-center justify-center">
          <a href={user.Codeforces} target="_blank" rel="noopener noreferrer">
            <img src={cflogo} alt="Codeforces" className="w-8 h-8" />
          </a>
        </div>
      </td>

      <td className="px-4 py-2 align-middle text-center">
        <span>{user.currentRating}</span>
      </td>

      <td className="px-4 py-2 align-middle text-center">
        <span>{user.maxRating}</span>
      </td>

      <td className="px-4 py-2 align-middle text-center">
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
      </td>
    </tr>
  );
};

export default UserTableRow;
