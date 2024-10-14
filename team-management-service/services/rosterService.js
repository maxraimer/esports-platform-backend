import db from '../config/db.js';
import { Team } from '../models/teamModel.js';

export const addPlayerToTeam = async (teamId, playerId, gameTitle) => {
    try {
        const teamDoc = await db.get(teamId);
        const team = new Team(teamDoc);
        team.addPlayer(playerId, gameTitle);

        await db.insert({...team, _rev: teamDoc._rev});
        return team;
    } catch (error) {
        throw new Error('Error adding player to the team');
    }
}

export const removePlayerFromTeam = async (teamId, playerId, gameTitle) => {
    try {
        const teamDoc = await db.get(teamId);
        const team = new Team(teamDoc);
        team.removePlayer(playerId, gameTitle);

        await db.insert({...team, _rev: teamDoc._rev});
        return team;
    } catch (error) {
        throw new Error('Error removing player from the team');
    }
}