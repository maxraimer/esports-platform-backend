import express from 'express';
import { createNewTeam, getTeam, updateExistingTeam, deleteExistingTeam } from '../controllers/teamController.js';

const router = express.Router();

router.post('/create', createNewTeam);
router.get('/:teamId', getTeam);
router.put('/:teamId', updateExistingTeam);
router.delete('/:teamId', deleteExistingTeam);

export default router;