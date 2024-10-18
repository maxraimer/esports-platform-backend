import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import matchRoutes from './routes/matchRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Маршрути для матчів
app.use('/matches', matchRoutes);

app.get('/', (req, res) => {
    res.send('Match Coordination Service is running');
});

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
    console.log(`Match Coordination Service running on http://localhost:${port}`);
});
