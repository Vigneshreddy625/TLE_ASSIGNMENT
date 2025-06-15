import { Trophy, TrendingUp, Calendar, Award } from "lucide-react";
import React, { useMemo, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const contestHistory = [
  {
    contest: "Codeforces Round #123",
    date: "2025-03-17",
    rating: 1500,
    rank: 20,
    unsolved: 3,
    change: 0,
  },
  {
    contest: "Codeforces Round #124",
    date: "2025-03-25",
    rating: 1550,
    rank: 5,
    unsolved: 1,
    change: +50,
  },
  {
    contest: "Codeforces Round #125",
    date: "2025-04-02",
    rating: 1480,
    rank: 50,
    unsolved: 4,
    change: -70,
  },
  {
    contest: "Codeforces Round #126",
    date: "2025-04-10",
    rating: 1380,
    rank: 8,
    unsolved: 2,
    change: +100,
  },
  {
    contest: "Codeforces Round #127",
    date: "2025-04-18",
    rating: 1200,
    rank: 45,
    unsolved: 3,
    change: -80,
  },
  {
    contest: "Codeforces Round #128",
    date: "2025-04-26",
    rating: 900,
    rank: 10,
    unsolved: 1,
    change: +100,
  },
  {
    contest: "Codeforces Round #129",
    date: "2025-05-04",
    rating: 700,
    rank: 35,
    unsolved: 2,
    change: -80,
  },
  {
    contest: "Codeforces Round #130",
    date: "2025-05-12",
    rating: 520,
    rank: 9,
    unsolved: 1,
    change: +100,
  },
  {
    contest: "Codeforces Round #131",
    date: "2025-05-20",
    rating: 430,
    rank: 30,
    unsolved: 3,
    change: -70,
  },
  {
    contest: "Codeforces Round #132",
    date: "2025-05-28",
    rating: 450,
    rank: 7,
    unsolved: 1,
    change: +100,
  },
  {
    contest: "Codeforces Round #133",
    date: "2025-06-05",
    rating: 320,
    rank: 28,
    unsolved: 2,
    change: -70,
  },
  {
    contest: "Codeforces Round #134",
    date: "2025-06-10",
    rating: 1380,
    rank: 6,
    unsolved: 0,
    change: +100,
  },
  {
    contest: "Codeforces Round #135",
    date: "2025-06-13",
    rating: 1200,
    rank: 25,
    unsolved: 3,
    change: -80,
  },
  {
    contest: "Codeforces Round #136",
    date: "2025-06-15",
    rating: 1000,
    rank: 5,
    unsolved: 1,
    change: +100,
  },
];

const ContestHistory = () => {
  const [contestFilter, setContestFilter] = useState(30);

  const filteredContests = useMemo(() => {
    if (contestFilter === Infinity) return contestHistory;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - contestFilter);
    return contestHistory.filter(
      (contest) => new Date(contest.date) >= cutoffDate
    );
  }, [contestFilter]);

  const stats = useMemo(() => {
    const current = contestHistory[contestHistory.length - 1];
    const previous = contestHistory[contestHistory.length - 2];
    const bestRank = Math.min(...filteredContests.map((c) => c.rank));
    const totalContests = filteredContests.length;
    const ratingGrowth = current.rating - contestHistory[0].rating;

    return {
      currentRating: current.rating,
      ratingChange: current.rating - previous.rating,
      bestRank,
      totalContests,
      ratingGrowth,
    };
  }, [filteredContests]);

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl p-2 lg:p-4 shadow-xl dark:shadow-2xl">
      <div className="max-w-4xl mx-auto space-y-4 px-2 sm:px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Contest Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Track your competitive programming journey
              </p>
            </div>
          </div>

          <select
            value={contestFilter}
            onChange={(e) => setContestFilter(Number(e.target.value))}
            className="w-full md:w-auto px-3 py-2 sm:px-4 sm:py-3 bg-white/90 dark:bg-gray-700/90 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white backdrop-blur-sm"
          >
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
            <option value={365}>Last 365 days</option>
            <option value={Infinity}>All time</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-8">
          {[
            {
              label: "Current Rating",
              value: stats.currentRating,
              icon: (
                <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              ),
              gradient:
                "bg-gradient-to-br from-purple-50 via-purple-100 to-indigo-100 dark:from-purple-900/30 dark:via-purple-800/30 dark:to-indigo-900/30",
              border: "border border-purple-200 dark:border-purple-800/50",
              iconBg: "bg-purple-200 dark:bg-purple-800/50",
              labelColor: "text-purple-700 dark:text-purple-300",
              valueColor: "text-purple-900 dark:text-purple-100",
              changeColor:
                stats.ratingChange >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400",
              change: `${stats.ratingChange >= 0 ? "+" : ""}${
                stats.ratingChange
              } from last`,
            },
            {
              label: "Best Rank",
              value: `#${stats.bestRank}`,
              icon: (
                <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              ),
              gradient:
                "bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-100 dark:from-blue-900/30 dark:via-blue-800/30 dark:to-cyan-900/30",
              border: "border border-blue-200 dark:border-blue-800/50",
              iconBg: "bg-blue-200 dark:bg-blue-800/50",
              labelColor: "text-blue-700 dark:text-blue-300",
              valueColor: "text-blue-900 dark:text-blue-100",
              change: "In period",
            },
            {
              label: "Total Contests",
              value: stats.totalContests,
              icon: (
                <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
              ),
              gradient:
                "bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 dark:from-green-900/30 dark:via-green-800/30 dark:to-emerald-900/30",
              border: "border border-green-200 dark:border-green-800/50",
              iconBg: "bg-green-200 dark:bg-green-800/50",
              labelColor: "text-green-700 dark:text-green-300",
              valueColor: "text-green-900 dark:text-green-100",
              change: "In period",
            },
            {
              label: "Rating Growth",
              value: `${stats.ratingGrowth}`,
              icon: (
                <TrendingUp className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              ),
              gradient:
                "bg-gradient-to-br from-orange-50 via-orange-100 to-red-100 dark:from-orange-900/30 dark:via-orange-800/30 dark:to-red-900/30",
              border: "border border-orange-200 dark:border-orange-800/50",
              iconBg: "bg-orange-200 dark:bg-orange-800/50",
              labelColor: "text-orange-700 dark:text-orange-300",
              valueColor: "text-orange-900 dark:text-orange-100",
              change: "Since first",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className={`p-2 md:p-4 rounded-xl ${card.gradient} ${card.border} hover:shadow-lg transition-all duration-300`}
            >
                <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-2 md:rounded-lg ${card.iconBg}`}>
                  {card.icon}
                </div>
                <span className={`text-sm font-semibold ${card.labelColor}`}>
                  {card.label}
                </span>
              </div>
              <div className={`text-lg font-bold mb-1 ${card.valueColor}`}>
                {card.value}
              </div>
              </div>
              <div
                className={`text-sm truncate ${
                  card.changeColor || card.labelColor
                }`}
              >
                {card.change}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-3 md:p-6 shadow-lg border-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Rating Progress
          </h2>
          <div className="h-64 sm:h-64 dark:text-black">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[...filteredContests].reverse()}>
                <defs>
                  <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  className="dark:stroke-slate-600"
                />
                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                  className="dark:stroke-slate-400"
                  fontSize={11}
                  tickFormatter={(date) =>
                    new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
                <YAxis
                  stroke="#64748b"
                  className="dark:stroke-slate-400"
                  fontSize={11}
                />
                <Tooltip
                  formatter={(value) => [value, "Rating"]}
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  }}
                  wrapperClassName="dark:[&>div]:!bg-slate-800 dark:[&>div]:!text-white"
                />
                <Area
                  type="monotone"
                  dataKey="rating"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRating)"
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, fill: "#1d4ed8", strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border-0 max-h-[320px] overflow-auto">
          <div className="p-3 md:p-6 bg-gray-100 dark:bg-gray-900 border-b border-gray-100 dark:border-slate-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Contests
            </h2>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-slate-700 overflow-y-auto h-full">
            {filteredContests.slice(0, 8).map((contest, index) => (
              <div
  key={index}
  className="p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors duration-200"
>
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    {/* Left section: Title, Date, and Rank (Rank goes beside title only on mobile) */}
    <div className="w-full sm:flex-1 sm:min-w-0">
      {/* Top row in mobile: title + rank */}
      <div className="flex justify-between sm:block">
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">
            {contest.contest}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1">
            {new Date(contest.date).toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Show Rank only on mobile beside title */}
        <div className="text-right ml-4 sm:hidden">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
            Rank
          </p>
          <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
            #{contest.rank}
          </p>
        </div>
      </div>
    </div>

    {/* Right section: Stats */}
    <div className="flex flex-wrap w-full sm:w-auto justify-between sm:justify-end items-start gap-4">
      {/* Show Rank again for desktop only */}
      <div className="text-center min-w-[60px] hidden sm:block">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
          Rank
        </p>
        <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
          #{contest.rank}
        </p>
      </div>

      <div className="text-center min-w-[60px]">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
          Unsolved
        </p>
        <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
          {contest.unsolved}
        </p>
      </div>

      <div className="text-center min-w-[60px]">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
          Rating
        </p>
        <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
          {contest.rating}
        </p>
      </div>

      <div className="text-center min-w-[60px]">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
          Change
        </p>
        <div
          className={`font-bold mt-1 px-2 py-1 rounded-md text-xs ${
            contest.change >= 0
              ? "text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30"
              : "text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30"
          }`}
        >
          {contest.change >= 0 ? "+" : ""}
          {contest.change}
        </div>
      </div>
    </div>
  </div>
</div>

            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestHistory;
