import express from 'express';
import { addNewFriend, removeExistingFriend, getFriends } from '../controllers/friendsController.js';

const router = express.Router();

router.post('/add', addNewFriend);
router.post('/remove', removeExistingFriend);
router.get('/:userId', getFriends);

export default router;
