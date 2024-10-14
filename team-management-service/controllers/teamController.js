import { createTeam, getTeamById, updateTeam, deleteTeam } from '../services/teamService.js';
import { createTeamSchema, updateTeamSchema } from '../validators/teamValidator.js';

export const createNewTeam = async (req, res) => {
    const { error } = createTeamSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Data validation error', error: error.details[0].message });
    }

    const { name, captainId, teamLogo, gameTitles } = req.body;
    
    try {
        const team = await createTeam({ name, captainId, teamLogo, gameTitles });
        res.status(201).json(team);
    } catch (error) {
        if (error.message === 'Team name is already taken') {
            return res.status(409).json({ message: 'Error creating new team', error: error.message });
        }
        res.status(500).json({ message: 'Error creating new team', error: error.message });
    }
};

export const getTeam = async (req, res) => {
    const { teamId } = req.params;
    try {
        const team = await getTeamById(teamId);
        res.status(200).json(team);
    } catch (error) {
        res.status(404).json({ message: 'Team not found', error: error.message });
    }
};

export const updateExistingTeam = async (req, res) => {
    const { error } = updateTeamSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Data validation error', error: error.details[0].message });
    }

    const { teamId } = req.params;
    const updatedData = req.body;

    try {
        const updatedTeam = await updateTeam(teamId, updatedData);
        res.status(200).json(updatedTeam);
    } catch (error) {
        res.status(500).json({ message: 'Error updating team', error: error.message});
    }
};

export const deleteExistingTeam = async (req, res) => {
    const { teamId } = req.params;
    try {
        const result = await deleteTeam(teamId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting team', error: error.message });
    }
};