import { Award, Trophy, Bell, BellOff } from "lucide-react";
import { useState } from "react";
import EmailReminderToggle from "../Items/EmailToggle";

const ProfileHeader = ({ studentData}) => {
  const [autoEmailEnabled, setAutoEmailEnabled] = useState(true);
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900/20 border border-white/20 dark:border-slate-700/50 shadow-md dark:shadow-slate-900/40 backdrop-blur-xl">
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
    <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-indigo-400/20 to-cyan-500/20 rounded-full blur-xl animate-pulse delay-1000" />
  </div>

  <div className="relative px-4 py-4 sm:px-6 sm:py-5">
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
          <div className="relative">
            <img
              src={studentData.avatar}
              alt={studentData.name}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white dark:border-slate-800 object-cover shadow"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center shadow-sm">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent">
            {studentData.name}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            @{studentData.username}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 sm:gap-4">
        <div className="group relative rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/40 dark:border-slate-700/40 p-3 shadow hover:shadow-md transition hover:scale-[1.02]">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-400/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition" />
          <div className="relative flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-gradient-to-br from-yellow-400 to-orange-500 shadow">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">
                Current
              </div>
              <div className="text-base font-bold text-slate-900 dark:text-white">
                {studentData.currentRating}
              </div>
            </div>
          </div>
        </div>

        <div className="group relative rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/40 dark:border-slate-700/40 p-3 shadow hover:shadow-md transition hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition rounded-xl" />
          <div className="relative flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-gradient-to-br from-purple-500 to-pink-500 shadow">
              <Award className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">
                Max
              </div>
              <div className="text-base font-bold text-slate-900 dark:text-white">
                {studentData.maxRating}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-4 pt-2 border-t border-white/20 dark:border-slate-700/40">
      <div className="flex flex-row items-start sm:items-center justify-between gap-3">
        <div className="w-full lg:w-[250px] flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/40 dark:border-slate-700/40 shadow">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-md transition-colors ${autoEmailEnabled ? 'bg-blue-100 dark:bg-blue-900/50' : 'bg-slate-100 dark:bg-slate-700'}`}>
              {autoEmailEnabled ? (
                <Bell className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              ) : (
                <BellOff className="w-3.5 h-3.5 text-slate-500" />
              )}
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900 dark:text-white">
                Email Reminder
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {autoEmailEnabled ? 'Enabled' : 'Disabled'}
              </div>
            </div>
          </div>
          <EmailReminderToggle
            value={autoEmailEnabled}
            setValue={setAutoEmailEnabled}
          />
        </div>

        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm shadow-sm">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-900 dark:text-white">7</span> reminders sent
          </span>
        </div>

        <div className="absolute top-4 right-2 md:hidden flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm shadow-sm">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-900 dark:text-white">7</span> reminders sent
          </span>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default ProfileHeader;