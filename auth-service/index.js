// index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// Підключення маршрутизаторів
app.use('/auth', authRoutes);

// Точка входу для перевірки роботи сервера
app.get('/', (req, res) => {
    res.send('Auth Service is running');
});

app.listen(port, () => {
    console.log(`Auth service is running on http://localhost:${port}`);
});
