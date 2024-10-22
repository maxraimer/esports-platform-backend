import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import gatewayRoutes from './routes/gatewayRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// Маршрути API Gateway
app.use('/api', gatewayRoutes);

// Обробка 404 помилок
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`API Gateway running on http://localhost:${port}`);
});