import React from "react";
import { Users, Award, TrendingUp, Star } from "lucide-react";
import ModeToggle from "../Darkmode/ToggleMode";
import AddUser from "../Tcrud/AddUser";
import StatsCard from "./StatsCard";

const Header = ({ users }) => {
  const avgRating =
    users.reduce((acc, user) => acc + user.currentRating, 0) / users.length;
  const avgmaxRating =
    users.reduce((acc, user) => acc + user.maxRating, 0) / users.length;
  const topPerformers = users.filter((u) => u.currentRating >= 4.7).length;
  return (
    <div className="mb-4 sm:mb-6 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl sm:rounded-3xl blur-3xl"></div>
      <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-white/20 dark:border-gray-700/30 shadow-xl">
        <div className="md:hidden absolute top-2 right-2">
          <AddUser />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                TLE Directory
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base font-medium">
                Discover amazing people and their achievements ✨
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-end">
            <AddUser />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          <StatsCard
            title="Total Members"
            value={users.length}
            icon={Users}
            gradient="border-blue-200/50 dark:border-blue-700/30"
            bgGradient="from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30"
            iconGradient="from-blue-500 to-indigo-600"
          />
          <StatsCard
            title="Average Rating"
            value={avgRating.toFixed(1)}
            icon={Award}
            gradient="border-yellow-200/50 dark:border-yellow-700/30"
            bgGradient="from-yellow-50 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30"
            iconGradient="from-yellow-500 to-orange-600"
          />
          <StatsCard
            title="Top Performers"
            value={topPerformers}
            icon={TrendingUp}
            gradient="border-emerald-200/50 dark:border-emerald-700/30"
            bgGradient="from-emerald-50 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30"
            iconGradient="from-emerald-500 to-teal-600"
          />
          <StatsCard
            title="Max Rating"
            value={avgmaxRating.toFixed(1)}
            icon={Star}
            gradient="border-indigo-300/50 dark:border-indigo-600/40"
            bgGradient="from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30"
            iconGradient="from-indigo-400 to-indigo-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
