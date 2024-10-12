import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import nano from 'nano';
import bcrypt from 'bcrypt';
import { User } from './models/user.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

const couch = nano(process.env.DB);
const db = couch.db.use('platform_users');

app.use(express.json());
app.use(cors());

const saltRounds = 10;

app.post('/login', async (req, res) => {
    const { username, email, password } = req.body;
    
    // Перевірка наявності username/email та password
    if ((!username && !email) || !password) {
        return res.status(400).json({ message: 'Username or email and password are required.' });
    }

	try {
		// Пошук користувача в БД
		const query = {
			selector: {
				$or: [
					{ username: username },
					{ email: email }
				]
			}
		};

		const userDocs = await db.find(query);

		// Якщо нема в БД - повертаємо помилку
		if (userDocs.docs.length === 0) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		// Якщо документів більше 1 в БД - повертаємо помилку
		if (userDocs.docs.length !== 1) {
			return res.status(409).json({ message: 'Too many responses from DB' });
		}

		const userData = userDocs.docs[0];

		const passwordMatch = await bcrypt.compare(password, userData.password);

		if (!passwordMatch) {
			return res.status(401).json({ message: 'Wrong password' });
		}

		const user = new User({
			id: userData._id,
			username: userData.username,
			email: userData.email
		});
		user.init(userData);

		const token = uuidv4();
		console.log('User authorized:', userData._id);
		return res.status(200).json({ message: 'Login successful', token, user });
	} catch (error) {
		console.error('Error during login:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

app.post('/register', async (req, res) => {
	const { login, password, email, firstName, lastName, nickName } = req.body;

	if (!login || !password || !email || !firstName || !lastName || !nickName) {
		return res.status(400).json({ message: 'All fields are required.' });
	}

	try {
		const existingUser = await db.find({
			selector: {
				$or: [
					{ username: login },
					{ email: email }
				]
			}
		});

		if (existingUser.docs.length > 0) {
			return res.status(409).json({ message: 'User with this login or email already exists.' });
		}

		// Хешуємо пароль перед збереженням
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// Створюємо новий екземпляр користувача
        const newUser = new User({
            id: uuidv4(),  // Генеруємо унікальний ID
            username: login,
            email: email,
			password: hashedPassword
        });

		// Ініціалізація інших даних
        newUser.init({
            firstName: firstName,
            lastName: lastName,
            nickName: nickName,
            joinDate: Date.now(),  // Додаємо дату реєстрації
        });

		// Збереження користувача в базу даних
        const response = await db.insert(newUser);

		// Повертаємо успішну відповідь
		console.log('User registered:', newUser.id);
        return res.status(201).json({ message: 'User registered successfully', userId: response.id });
	} catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Auth service is running on http://localhost:${port}`);
});
