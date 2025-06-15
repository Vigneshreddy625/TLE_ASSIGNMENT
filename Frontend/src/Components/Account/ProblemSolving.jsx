import React, { useState } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Calendar, Target, TrendingUp, Activity } from 'lucide-react';

const ProblemSolvingData = ({ problemsData }) => {
  const [problemFilter, setProblemFilter] = useState(30);

  const generateHeatmapData = (days) => {
    const data = [];
    const today = new Date();
    
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - days + 1);
    const startSunday = new Date(startDate);
    startSunday.setDate(startDate.getDate() - startDate.getDay());
    
    const endSaturday = new Date(today);
    endSaturday.setDate(today.getDate() + (6 - today.getDay()));
    
    const totalDays = Math.ceil((endSaturday - startSunday) / (1000 * 60 * 60 * 24)) + 1;
    
    for (let i = 0; i < totalDays; i++) {
      const date = new Date(startSunday);
      date.setDate(startSunday.getDate() + i);
      
      const daysSinceStart = Math.ceil((today - date) / (1000 * 60 * 60 * 24));
      const isInRange = daysSinceStart <= days - 1 && daysSinceStart >= 0;
      
      data.push({
        date: date.toISOString().split('T')[0],
        count: isInRange ? Math.floor(Math.random() * 6) : 0,
        day: date.getDay(),
        week: Math.floor(i / 7),
        isInRange
      });
    }
    return data;
  };

  const heatmapData = generateHeatmapData(problemFilter);

  const getIntensityClass = (count, isInRange) => {
    if (!isInRange || count === 0) return 'bg-gray-100 dark:bg-gray-800/50';
    if (count === 1) return 'bg-green-200 dark:bg-green-900/40';
    if (count === 2) return 'bg-green-300 dark:bg-green-700/50';
    if (count === 3) return 'bg-green-400 dark:bg-green-600/60';
    if (count >= 4) return 'bg-green-500 dark:bg-green-500/70';
    return 'bg-gray-100 dark:bg-gray-800/50';
  };

  const renderHeatmap = () => {
    const weeks = [];
    const weeksCount = Math.max(...heatmapData.map(d => d.week)) + 1;
    
    for (let week = 0; week < weeksCount; week++) {
      const weekData = heatmapData.filter(d => d.week === week);
      weeks.push(
        <div key={week} className="flex flex-col gap-1">
          {[0, 1, 2, 3, 4, 5, 6].map(day => {
            const dayData = weekData.find(d => d.day === day);
            return (
              <div
                key={`${week}-${day}`}
                className={`w-3 h-3 rounded ${dayData ? getIntensityClass(dayData.count, dayData.isInRange) : 'bg-gray-100 dark:bg-gray-800/50'} hover:ring-1 hover:ring-green-400 dark:hover:ring-green-500 transition-all duration-150 cursor-pointer`}
                title={dayData && dayData.isInRange ? `${dayData.date}: ${dayData.count} problems` : dayData ? dayData.date : ''}
              />
            );
          })}
        </div>
      );
    }
    return weeks;
  };

  const getMonthLabels = () => {
    const labels = [];
    const weeks = Math.max(...heatmapData.map(d => d.week)) + 1;
    const monthsShown = new Set();
    
    for (let week = 0; week < weeks; week++) {
      const weekData = heatmapData.filter(d => d.week === week);
      if (weekData.length > 0) {
        const firstDay = new Date(weekData[0].date);
        const month = firstDay.toLocaleDateString('en-US', { month: 'short' });
        
        if (!monthsShown.has(month) || week === 0) {
          labels.push({ week, month });
          monthsShown.add(month);
        } else {
          labels.push({ week, month: '' });
        }
      }
    }
    return labels;
  };

  const defaultProblemsData = {
    mostDifficult: { rating: 2400, name: "Dynamic Programming Challenge" },
    totalSolved: 1247,
    averageRating: 1650,
    averagePerDay: 3.2,
    ratingBuckets: [
      { range: "800-1000", count: 45 },
      { range: "1000-1200", count: 89 },
      { range: "1200-1400", count: 156 },
      { range: "1400-1600", count: 234 },
      { range: "1600-1800", count: 189 },
      { range: "1800-2000", count: 98 },
      { range: "2000+", count: 67 }
    ]
  };

  const data = problemsData || defaultProblemsData;

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl dark:shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400 bg-clip-text text-transparent flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 rounded-xl">
            <Target className="w-6 h-6 sm:w-7 sm:h-7 text-green-600 dark:text-green-400" />
          </div>
          Problem Solving Data
        </h2>
        <select
          value={problemFilter}
          onChange={(e) => setProblemFilter(Number(e.target.value))}
          className="px-3 py-2 sm:px-4 sm:py-3 bg-white/90 dark:bg-gray-700/90 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white backdrop-blur-sm"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
          <option value={180}>Last 180 days</option>
          <option value={365}>Last 365 days</option>
          <option value={Infinity}>All time</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="p-4 bg-gradient-to-br from-purple-50 via-purple-100 to-indigo-100 dark:from-purple-900/30 dark:via-purple-800/30 dark:to-indigo-900/30 rounded-xl border border-purple-200 dark:border-purple-800/50 hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-200 dark:bg-purple-800/50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">Most Difficult</span>
          </div>
          <div className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-1">{data.mostDifficult.rating}</div>
          </div>
          <div className="text-sm text-purple-600 dark:text-purple-400 truncate">{data.mostDifficult.name}</div>
        </div>

        <div className="p-4 bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-100 dark:from-blue-900/30 dark:via-blue-800/30 dark:to-cyan-900/30 rounded-xl border border-blue-200 dark:border-blue-800/50 hover:shadow-lg transition-all duration-300">
          <div className = "flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-200 dark:bg-blue-800/50 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Solved</span>
          </div>
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{data.totalSolved}</div>
        </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 dark:from-green-900/30 dark:via-green-800/30 dark:to-emerald-900/30 rounded-xl border border-green-200 dark:border-green-800/50 hover:shadow-lg transition-all duration-300">
          <div className = "flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-200 dark:bg-green-800/50 rounded-lg">
              <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm font-semibold text-green-700 dark:text-green-300">Avg Rating</span>
          </div>
          <div className="text-2xl font-bold text-green-900 dark:text-green-100">{data.averageRating}</div>
        </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-orange-50 via-orange-100 to-red-100 dark:from-orange-900/30 dark:via-orange-800/30 dark:to-red-900/30 rounded-xl border border-orange-200 dark:border-orange-800/50 hover:shadow-lg transition-all duration-300">
          <div className = "flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-200 dark:bg-orange-800/50 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">Per Day</span>
          </div>
          <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{data.averagePerDay}</div>
        </div>
        </div>
      </div>

      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-200">Problems by Rating</h3>
        <div className="h-60 sm:h-56 p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900/50 dark:to-green-900/20 rounded-xl border border-gray-100 dark:border-gray-700 dark:text-black">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.ratingBuckets}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-600" />
              <XAxis
                dataKey="range"
                stroke="#6b7280"
                className="dark:stroke-gray-400"
                fontSize={11}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis stroke="#6b7280" className="dark:stroke-gray-400" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)'
                }}
                className="dark:[&>div]:bg-gray-800/95 dark:[&>div]:border-gray-600 dark:[&>div]:text-black"
              />
              <Bar
                dataKey="count"
                fill="url(#barGradient)"
                radius={[6, 6, 0, 0]}
              />
              <defs>
                <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-200">
          Submission Heatmap (Last {problemFilter} days)
        </h3>
        <div className="p-4 bg-white dark:bg-gray-900/80 rounded-xl border border-gray-200 dark:border-gray-700">
          {/* Month labels */}
          <div className="flex gap-1 mb-2 ml-8">
            {getMonthLabels().map((label, index) => (
              <div key={index} className="w-3 text-xs text-gray-500 dark:text-gray-400 font-medium">
                {label.month}
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <div className="flex flex-col gap-1 mt-1">
              <div className="h-3 text-xs text-gray-500 dark:text-gray-400 font-medium"></div>
              <div className="h-3 text-xs text-gray-500 dark:text-gray-400 font-medium">Mon</div>
              <div className="h-3 text-xs text-gray-500 dark:text-gray-400 font-medium"></div>
              <div className="h-3 text-xs text-gray-500 dark:text-gray-400 font-medium">Wed</div>
              <div className="h-3 text-xs text-gray-500 dark:text-gray-400 font-medium"></div>
              <div className="h-3 text-xs text-gray-500 dark:text-gray-400 font-medium">Fri</div>
              <div className="h-3 text-xs text-gray-500 dark:text-gray-400 font-medium"></div>
            </div>
            
            <div className="flex gap-1 overflow-x-auto pb-2">
              {renderHeatmap()}
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {heatmapData.filter(d => d.isInRange).reduce((sum, d) => sum + d.count, 0)} problems in the last {problemFilter} days
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-gray-100 dark:bg-gray-800/50 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-200 dark:bg-green-900/40 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-300 dark:bg-green-700/50 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-400 dark:bg-green-600/60 rounded-sm"></div>
                <div className="w-3 h-3 bg-green-500 dark:bg-green-500/70 rounded-sm"></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolvingData;