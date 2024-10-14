import Joi from 'joi';

// Схема для логування активностей
export const logActivitySchema = Joi.object({
    userId: Joi.string().uuid().required(),
    activity: Joi.string().min(3).max(255).required()
});