import dotenv from 'dotenv';

dotenv.config();

export const services = {
    authService: process.env.AUTH_SERVICE_URL,
    userProfileService: process.env.USER_PROFILE_SERVICE_URL,
    teamService: process.env.TEAM_MANAGEMENT_SERVICE_URL,
    matchService: process.env.MATCH_COORDINATION_SERVICE_URL
};