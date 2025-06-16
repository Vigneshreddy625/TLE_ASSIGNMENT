import History from '../models/history.model.js';
import { getDateRange } from '../utils/dateHelper.js';

export const getUserHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { days = 365 } = req.query;
    
    const dateRange = getDateRange(days);
    
    const history = await History.find({
      user: userId,
      date: { $gte: dateRange.startDate, $lte: dateRange.endDate }
    }).sort({ date: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserRatingData = async (req, res) => {
  try {
    const { userId } = req.params;
    const { days = 365 } = req.query;
    
    const dateRange = getDateRange(days);
    
    const ratingData = await History.find({
      user: userId,
      date: { $gte: dateRange.startDate, $lte: dateRange.endDate }
    })
    .select('date newRating contestName')
    .sort({ date: 1 });

    res.json(ratingData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};