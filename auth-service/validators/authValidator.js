import Joi from 'joi';

export const registerValidationSchema = Joi.object({
    login: Joi.string().min(6).max(16).required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    nickName: Joi.string().min(2).max(30).required(),
});

export const loginValidationSchema = Joi.object({
    username: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).required(),
}).or('username', 'email');  // Вимагає хоча б одне з полів