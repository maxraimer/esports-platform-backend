import db from '../config/db.js';
import { User } from '../models/userModel.js';

export const addFriend = async (userId, friendId) => {
    try {
        const userDoc = await db.get(userId);
        const user = new User({id: userId, username: userDoc.username});
        user.init(userDoc);

        if (!user.friends.includes(friendId)) {
            user.friends.push(friendId);
            await db.insert({...user, _rev: userDoc._rev});
            return { message: 'Friend added successfully', friends: user.friends };
        } else {
            return { message: 'User already has that friend' };
        }
    } catch (error) {
        throw new Error('Error adding friend');
    }
}

export const removeFriend = async (userId, friendId) => {
    try {
        const userDoc = await db.get(userId);
        const user = new User({id: userId, username: userDoc.username});
        user.init(userDoc);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter(id => id !== friendId);
            await db.insert({...user, _rev: userDoc._rev});
            return { message: 'Friend removed successfully', friends: user.friends };
        } else {
            return { message: `User doesn't have that friend` };
        }
    } catch (error) {
        throw new Error('Error removing friend');
    }
}

export const getFriendsList = async (userId) => {
    try {
        const userDoc = await db.get(userId);
        return userDoc.friends;
    } catch (error) {
        throw new Error('Error fetching friends list');
    }
};