import { findUserByUsernameOrEmail, createUser } from '../services/userService.js';
import { registerValidationSchema, loginValidationSchema } from '../validators/authValidator.js';
import { User } from '../models/user.js';
import { comparePasswords } from '../utils/hash.js';
import { generateToken } from '../utils/token.js';

export const login = async (req, res) => {
    const { error } = loginValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Data is invalid', error: error.details[0].message });
    }

    const { username, email, password } = req.body;

    try {
        // Пошук користувача в БД
        const users = await findUserByUsernameOrEmail(username, email);

        // Якщо нема в БД - повертаємо помилку
        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Якщо документів більше 1 в БД - повертаємо помилку
        if (users.length !== 1) {
            return res.status(409).json({ message: 'Too many responses from DB' });
        }

        const userData = users[0];

        // Перевірка пароля
        const passwordMatch = await comparePasswords(password, userData.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Wrong password' });
        }

        // Створення екземпляра класу User
        const user = new User({
            id: userData._id,
            username: userData.username,
            email: userData.email
        });
        user.init(userData);

        // Генерація токена (симуляція)
        const token = generateToken(user);
        console.log('User authorized:', userData._id);

        return res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const register = async (req, res) => {
    const { error } = registerValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Data is invalid', error: error.details[0].message });
    }

    const { login, password, email, firstName, lastName, nickName } = req.body;

    try {
        // Перевірка чи немає користувача з тим же login або email
        const existingUsers = await findUserByUsernameOrEmail(login, email);

        if (existingUsers.length > 0) {
            return res.status(409).json({ message: 'User with this login or email already exists.' });
        }

        // Створення нового користувача
        const response = await createUser({ login, password, email, firstName, lastName, nickName });

        console.log('User registered:', response.id);
        return res.status(201).json({ message: 'User registered successfully', userId: response.id });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
