import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import historyRoutes from './routes/history.routes.js';
import problemStatsRoutes from './routes/problemStats.routes.js';
import { errorHandler } from "./middlewares/errorHandler.middleware.js"
import { startCronJobs, updateCronSchedule, getCurrentSchedule } from './services/cronService.js';

const app = express();

app.use(cors());
app.use(express.json());

const allowedOrigins = ['https://tle-mocha.vercel.app/home', 'http://localhost:5173/'];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/problem-stats', problemStatsRoutes);

app.get('/api/cron/schedule', (req, res) => {
  res.json({ schedule: getCurrentSchedule() });
});

app.post('/api/cron/schedule', (req, res) => {
  const { schedule } = req.body;
  updateCronSchedule(schedule);
  res.json({ message: 'Cron schedule updated', schedule });
});

app.use(errorHandler);

startCronJobs();

export default app;