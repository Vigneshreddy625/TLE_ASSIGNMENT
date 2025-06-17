import ProblemStats from "../models/problems.model.js"
import { getDateRange } from '../utils/dateHelper.js';

export const getUserProblemStats = async (req, res) => {
  try {
    const { userId } = req.params;
    const { days = 180 } = req.query;
    
    const dateRange = getDateRange(days);
    
    const problems = await ProblemStats.find({
      user: userId,
      date: { $gte: dateRange.startDate, $lte: dateRange.endDate }
    }).sort({ date: -1 });

    const stats = {
      totalProblems: problems.length,
      averageRating: problems.length > 0 ? 
        problems.reduce((sum, p) => sum + (p.rating || 0), 0) / problems.length : 0,
      averageProblemsPerDay: problems.length / parseInt(days),
      mostDifficultProblem: problems.reduce((max, p) => 
        (p.rating || 0) > (max.rating || 0) ? p : max, problems[0] || {}),
      ratingDistribution: getRatingDistribution(problems),
      heatmapData: getHeatmapData(problems, dateRange)
    };

    res.json({ problems, stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRatingDistribution = (problems) => {
  const buckets = {
    '800-999': 0,
    '1000-1199': 0,
    '1200-1399': 0,
    '1400-1599': 0,
    '1600-1799': 0,
    '1800-1999': 0,
    '2000-2199': 0,
    '2200+': 0
  };

  problems.forEach(problem => {
    const rating = problem.rating || 0;
    if (rating >= 800 && rating <= 999) buckets['800-999']++;
    else if (rating >= 1000 && rating <= 1199) buckets['1000-1199']++;
    else if (rating >= 1200 && rating <= 1399) buckets['1200-1399']++;
    else if (rating >= 1400 && rating <= 1599) buckets['1400-1599']++;
    else if (rating >= 1600 && rating <= 1799) buckets['1600-1799']++;
    else if (rating >= 1800 && rating <= 1999) buckets['1800-1999']++;
    else if (rating >= 2000 && rating <= 2199) buckets['2000-2199']++;
    else if (rating >= 2200) buckets['2200+']++;
  });

  return Object.entries(buckets).map(([range, count]) => ({ range, count }));
};

const getHeatmapData = (problems, dateRange) => {
  const heatmap = {};
  const current = new Date(dateRange.startDate);
  
  while (current <= dateRange.endDate) {
    const dateStr = current.toISOString().split('T')[0];
    heatmap[dateStr] = 0;
    current.setDate(current.getDate() + 1);
  }

  problems.forEach(problem => {
    const dateStr = problem.date.toISOString().split('T')[0];
    if (heatmap.hasOwnProperty(dateStr)) {
      heatmap[dateStr]++;
    }
  });

  return Object.entries(heatmap).map(([date, count]) => ({ date, count }));
};