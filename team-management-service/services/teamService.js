import db from '../config/db.js';
import { Team } from '../models/teamModel.js';
import { v4 as uuidv4 } from 'uuid';

const isTeamNameTaken = async (name) => {
    try {
        const result = await db.view('teams', 'by_name', { key: name });
        return result.rows.length > 0;
    } catch (error) {
        throw new Error('Error checking team name');
    }
};

export const createTeam = async (teamData) => {
    const isTaken = await isTeamNameTaken(teamData.name);
    if (isTaken) {
        throw new Error('Team name is already taken');
    }
    
    const teamId = uuidv4();

    const newTeam = new Team({
        id: teamId,
        name: teamData.name,
        captainId: teamData.captainId,
        createdAt: Date.now()
    });

    if (teamData.teamLogo) newTeam.teamLogo = teamData.teamLogo;
    if (teamData.gameTitles) newTeam.gameTitles = teamData.gameTitles;

    await db.insert(newTeam);
    return newTeam;
};

export const getTeamById = async (teamId) => {
    try {
        const teamDoc = await db.get(teamId);

        return teamDoc;
    } catch (error) {
        throw new Error('Team not found');
    }
}

export const updateTeam = async (teamId, updatedData) => {
    try {
        const teamDoc = await db.get(teamId);
        const team = new Team(teamDoc);

        team.init(updatedData);

        await db.insert({ ...team, _rev: teamDoc._rev });
        return team;
    } catch (error) {
        throw new Error('Error updating team');
    }
};

export const deleteTeam = async (teamId) => {
    try {
        const teamDoc = await db.get(teamId);
        
        await db.destroy(teamId, teamDoc._rev);
        return { message: 'Team deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting team');
    }
};