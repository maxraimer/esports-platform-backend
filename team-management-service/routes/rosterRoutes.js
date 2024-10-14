import express from 'express';
import { addPlayer, removePlayer } from '../controllers/rosterController.js';

const router = express.Router();

router.post('/add', addPlayer);
router.post('/remove', removePlayer);

export default router;