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
        console.log(updatedData);
        const userDoc = await db.get(userId);
        const user = new User({id: userId, username: userDoc.username});
        console.log(user);
        user.init(userDoc);
        console.log(user);
        user.init(updatedData);
        console.log(user);
        await db.insert({...user, _rev: userDoc._rev});
        return user;
    } catch (error) {
        throw new Error('Error updating profile');
    }
}