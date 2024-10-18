import { createMatch, updateMatchInfo, getMatchById } from '../services/matchService.js';
import { matchSchema } from '../validators/matchValidator.js';

export const createMatchController = async (req, res) => {
	const { error } = matchSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	try {
		const match = await createMatch(req.body);
		res.status(201).json(match);
	} catch (err) {
		res.status(500).json({ message: 'Error creating match', error: err.message });
	}
};

export const updateMatchInfoController = async (req, res) => {
    const { matchId } = req.params;
    const updatedData = req.body;

    try {
        const match = updateMatchInfo(matchId, updatedData);
        res.status(200).json(match);
    } catch (error) {
        res.status(500).json({ message: 'Error updating match', error: error.message });
    }
}

export const getMatchController = async (req, res) => {
    const { matchId } = req.params;

    try {
        const match = await getMatchById(matchId);
        res.status(200).json(match);
    } catch (error) {
        res.status(404).json({ message: 'Match not found', error: error.message });
    }
};