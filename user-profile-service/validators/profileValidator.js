import Joi from 'joi';

export const updateProfileSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).optional(),
    lastName: Joi.string().min(2).max(50).optional(),
    nickName: Joi.string().min(2).max(50).optional(),
    profilePic: Joi.string().uri().optional()
});

export const userIdSchema = Joi.string().uuid().required();