import React from "react";

export const CronChange = ({ value, onChange }) => {
  const formatHour = (hour) => {
    const suffix = hour >= 12 ? "PM" : "AM";
    const display = hour % 12 === 0 ? 12 : hour % 12;
    return `${display} ${suffix}`;
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
      <label
        htmlFor="hour"
        className="text-sm sm:text-xl font-medium text-gray-700 dark:text-gray-200"
      >
        Cron Schedule (Daily):
      </label>
      <select
        id="hour"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-1.5 backdrop-blur-sm rounded-md border border-gray-300 dark:border-gray-700 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {Array.from({ length: 24 }, (_, i) => (
          <option key={i} value={`0 ${i} * * *`}>
            {formatHour(i)}
          </option>
        ))}
      </select>
    </div>
  );
};