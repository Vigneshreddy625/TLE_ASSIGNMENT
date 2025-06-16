import express from 'express';
import { getUserHistory, getUserRatingData } from '../controllers/history.controller.js';

const router = express.Router();

router.get('/user/:userId', getUserHistory);
router.get('/user/:userId/rating', getUserRatingData);

export default router;