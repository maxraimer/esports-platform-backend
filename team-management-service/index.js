import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import teamRoutes from './routes/teamRoutes.js';
import rosterRoutes from './routes/rosterRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/teams', teamRoutes);
app.use('/roster', rosterRoutes);

app.get('/', (req, res) => {
    res.send('Team Management Service is running');
});

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
    console.log(`Team Management Service is running on http://localhost:${port}`);
});
