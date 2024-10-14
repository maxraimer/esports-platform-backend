import express from 'express';
import { addActivity, getActivities } from '../controllers/activityController.js';

const router = express.Router();

router.post('/log', addActivity);
router.get('/:userId', getActivities);

export default router;
