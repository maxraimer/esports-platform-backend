import db from '../config/db.js';
import { User } from '../models/userModel.js';

export const logActivity = async (userId, activity) => {
    try {
        const userDoc = await db.get(userId);
        const user = new User({id: userId, username: userDoc.username});
        user.init(userDoc);

        user.activities.push({
            activity,
            timestamp: Date.now()
        });
        
        await db.insert({...user, _rev: userDoc._rev});
        return user.activities;
    } catch (error) {
        throw new Error('Error logging activity');
    }
}

export const getUserActivities = async (userId) => {
    try {
        const userDoc = await db.get(userId);
        return userDoc.activities;
    } catch (error) {
        throw new Error('Error fetching friends list');
    }
};