import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (user) => {
    const payload = {
        id: user._id,
        username: user.username,
        email: user.email
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};
