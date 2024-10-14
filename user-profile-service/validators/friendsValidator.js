import Joi from 'joi';

// Схема для додавання або видалення друзів
export const friendsSchema = Joi.object({
    userId: Joi.string().uuid().required(),
    friendId: Joi.string().uuid().required()
});