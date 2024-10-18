import db from '../config/db.js';
import { User } from '../models/userModel.js';

export const getUserProfile = async (userId) => {
    try {
        const userDoc = await db.get(userId);
        return userDoc;
    } catch (error) {
        throw new Error('User not found');
    }
}

export const updateUserProfile = async (userId, updatedData) => {
    try {
        const userDoc = await db.get(userId);
        const user = new User({id: userId, username: userDoc.username});
        user.init(userDoc);
        user.init(updatedData);
        await db.insert({...user, password: userDoc.password, _rev: userDoc._rev});
        return user;
    } catch (error) {
        throw new Error('User probably not found');
    }
}