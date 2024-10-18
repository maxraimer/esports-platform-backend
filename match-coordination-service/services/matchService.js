import db from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import { Match } from '../models/matchModel.js';

export const createMatch = async (data) => {
    const matchId = uuidv4();
    const newMatch = new Match({id: matchId});
    newMatch.init(data);
    await db.insert(newMatch);
    return newMatch;
};

export const getMatchById = async (matchId) => {
    try {
        const matchDoc = await db.get(matchId);
        return matchDoc;
    } catch (error) {
        throw new Error('Match not found');
    }
};

export const updateMatchInfo = async (matchId, updatedData) => {
    try {
        const matchDoc = await db.get(matchId);
        const match = new Match({id: matchId});
        match.init(matchDoc);
        match.init(updatedData);
        await db.insert({...match, _rev: matchDoc._rev});
        return match;
    } catch (error) {
        throw new Error('Error updating match');
    }
}