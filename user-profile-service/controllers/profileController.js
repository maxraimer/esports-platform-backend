import { getUserProfile, updateUserProfile } from '../services/profileService.js';

export const getProfile = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await getUserProfile(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateProfile = async (req, res) => {
    const { userId } = req.params;
    const updatedData = req.body;
    try {
        const updatedUser = await updateUserProfile(userId, updatedData);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
