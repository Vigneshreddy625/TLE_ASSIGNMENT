import React from "react";

const StatsCard = ({ title, value, icon: Icon, gradient, bgGradient, iconGradient }) => {
  return (
    <div className={`group relative bg-gradient-to-br ${bgGradient} p-3 sm:p-4 rounded-xl sm:rounded-2xl border ${gradient} hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-xs font-semibold mb-0.5 ${title.includes('Total') ? 'text-blue-600 dark:text-blue-400' : title.includes('Average') ? 'text-yellow-600 dark:text-yellow-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
            {title}
          </p>
          <p className={`text-xl sm:text-2xl font-bold ${title.includes('Total') ? 'text-blue-900 dark:text-blue-100' : title.includes('Average') ? 'text-yellow-900 dark:text-yellow-100' : 'text-emerald-900 dark:text-emerald-100'}`}>
            {value}
          </p>
        </div>
        <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${iconGradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;