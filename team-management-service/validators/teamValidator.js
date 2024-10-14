import Joi from 'joi';

export const createTeamSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    captainId: Joi.string().uuid().required(),
    teamLogo: Joi.string().uri().optional(),
    gameTitles: Joi.array().items(Joi.string().min(2)).optional(),
});

export const updateTeamSchema = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    captainId: Joi.string().uuid().optional(),
    teamLogo: Joi.string().uri().optional(),
    gameTitles: Joi.array().items(Joi.string().min(2)).optional(),
    stats: Joi.object().optional(),
    matchHistory: Joi.array().items(Joi.object()).optional(),
    tournamentHistory: Joi.array().items(Joi.object()).optional(),
    socials: Joi.array().items(Joi.string()).optional(),
    isPro: Joi.boolean().optional(),
    isVerified: Joi.boolean().optional(),
});