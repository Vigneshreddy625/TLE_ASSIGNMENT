import { Award, Trophy } from "lucide-react";

const ProfileHeader = ({ studentData }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center sm:items-start gap-4 mb-4 p-4 sm:p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-purple-900/30 rounded-2xl border border-blue-100 dark:border-gray-700 shadow-xl dark:shadow-2xl backdrop-blur-sm">
      
      <div className="flex flex-row sm:items-center justify-center md:justify-start items-center gap-6 text-center sm:text-left w-full">
        <div className="relative">
          <img
            src={studentData.avatar}
            alt={studentData.name}
            className="w-16 h-16 md:w-24 sm:h-24 rounded-full border-4 border-white dark:border-gray-600 shadow-xl ring-4 ring-blue-100 dark:ring-gray-700"
          />
          <div className="absolute -bottom-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 bg-green-500 dark:bg-green-400 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
            <div className="w-3 h-3 bg-white dark:bg-gray-800 rounded-full" />
          </div>
        </div>

        <div>
          <h1 className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            {studentData.name}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-1">
            @{studentData.username}
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-center sm:justify-end items-center gap-4 sm:gap-6 w-full md:pt-6">
        <div className="flex items-center gap-3 px-4 py-1 md:py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-yellow-200 dark:border-yellow-800/50">
          <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 dark:text-yellow-400" />
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Current</div>
            <div className="font-bold text-gray-900 dark:text-white text-lg">{studentData.currentRating}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-1 md:py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-purple-200 dark:border-purple-800/50">
          <Award className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 dark:text-purple-400" />
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Max</div>
            <div className="font-bold text-gray-900 dark:text-white text-lg">{studentData.maxRating}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;