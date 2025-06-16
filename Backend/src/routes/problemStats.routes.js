import express from 'express';
import { getUserProblemStats } from '../controllers/problemStats.controller.js';

const router = express.Router();

router.get('/user/:userId', getUserProblemStats);

export default router;