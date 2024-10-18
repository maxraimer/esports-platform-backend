import express from 'express';
import { createMatchController, updateMatchInfoController, getMatchController } from '../controllers/matchController.js';

const router = express.Router();

router.post('/', createMatchController);
router.patch('/:matchId', updateMatchInfoController);
router.get('/:matchId', getMatchController);

export default router;