// index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import profileRoutes from './routes/profileRoutes.js';
import friendsRoutes from './routes/friendsRoutes.js';
import activityRoutes from './routes/activityRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// Маршрути
app.use('/profile', profileRoutes);
app.use('/friends', friendsRoutes);
app.use('/activity', activityRoutes);

// Точка входу для перевірки роботи сервера
app.get('/', (req, res) => {
    res.send('User Profile Service is running');
});

app.listen(port, () => {
    console.log(`User Profile Service is running on http://localhost:${port}`);
});
