import { logActivity, getUserActivities } from '../services/activityService.js';

export const addActivity = async (req, res) => {
    const { userId } = req.body;
    const { activity } = req.body;
    try {
        const activities = await logActivity(userId, activity);
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getActivities = async (req, res) => {
    const { userId } = req.params;
    try {
        const activities = await getUserActivities(userId);
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
