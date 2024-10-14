import { addFriend, removeFriend, getFriendsList } from '../services/friendsService.js';
import { friendsSchema } from '../validators/friendsValidator.js';

export const addNewFriend = async (req, res) => {
    const { error } = friendsSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { userId, friendId } = req.body;

    try {
        const friends = await addFriend(userId, friendId);
        res.status(200).json(friends);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeExistingFriend = async (req, res) => {
    const { error } = friendsSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { userId, friendId } = req.body;

    try {
        const friends = await removeFriend(userId, friendId);
        res.status(200).json(friends);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getFriends = async (req, res) => {
    const { userId } = req.params;
    
    try {
        const friends = await getFriendsList(userId);
        res.status(200).json(friends);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
