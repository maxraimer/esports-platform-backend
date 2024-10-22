import express from 'express';
import axios from 'axios';
import { services } from '../config/services.js';

const router = express.Router();

// Роутинг до Authentication Service
router.post('/auth/login', async (req, res) => {
    try {
        const response = await axios.post(`${services.authService}/auth/login`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Authentication failed', error: error.response?.data.message });
    }
});

router.post('/auth/register', async (req, res) => {
    try {
        const response = await axios.post(`${services.authService}/auth/register`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Registration failed', error: error.response?.data.message });
    }
});



















// Роутинг до User Profile Service
router.get('/profile/:userId', async (req, res) => {
    try {
        const response = await axios.get(`${services.userProfileService}/profile/${req.params.userId}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Failed to fetch profile' });
    }
});

// Роутинг до Team Management Service
router.get('/teams/:teamId', async (req, res) => {
    try {
        const response = await axios.get(`${services.teamService}/teams/${req.params.teamId}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Failed to fetch team' });
    }
});

// Роутинг до Match Coordination Service
router.post('/matches', async (req, res) => {
    try {
        const response = await axios.post(`${services.matchService}/matches`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: 'Failed to create match' });
    }
});

export default router;