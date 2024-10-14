import db from '../config/db.js';
import { User } from '../models/userModel.js';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../utils/hash.js';

export const findUserByUsernameOrEmail = async (username, email) => {
    const query = {
        selector: {
            $or: [
                { username: username },
                { email: email }
            ]
        }
    };

    const userDocs = await db.find(query);
    return userDocs.docs;
};

export const createUser = async ({ login, password, email, firstName, lastName, nickName }) => {
    const hashedPassword = await hashPassword(password);
    const userId = uuidv4();

    const newUser = new User({
        id: userId,
        username: login,
        email: email,
        password: hashedPassword,
        nickName: nickName
    });

    newUser.init({
        firstName: firstName,
        lastName: lastName,
        joinDate: Date.now()
    });

    await db.insert(newUser);
    return newUser;
};