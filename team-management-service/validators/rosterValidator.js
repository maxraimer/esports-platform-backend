import Joi from 'joi';

export const addPlayerSchema = Joi.object({
    teamId: Joi.string().uuid().required(),
    playerId: Joi.string().uuid().required(),
    gameTitle: Joi.string().min(2).max(50).required(),
});

export const removePlayerSchema = Joi.object({
    teamId: Joi.string().uuid().required(),
    playerId: Joi.string().uuid().required(),
    gameTitle: Joi.string().min(2).max(50).required(),
});