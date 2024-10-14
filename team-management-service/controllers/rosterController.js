import { addPlayerToTeam, removePlayerFromTeam } from '../services/rosterService.js';
import { addPlayerSchema, removePlayerSchema } from '../validators/rosterValidator.js';

export const addPlayer = async (req, res) => {
    const { error } = addPlayerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { teamId, playerId, gameTitle } = req.body;

    try {
        const team = await addPlayerToTeam(teamId, playerId, gameTitle);
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: 'Error adding player to team', error: error.message });
    }
};

export const removePlayer = async (req, res) => {
    const { error } = removePlayerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { teamId, playerId, gameTitle } = req.body;

    try {
        const team = await removePlayerFromTeam(teamId, playerId, gameTitle);
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: 'Error removing player from team', error: error.message });
    }
};
