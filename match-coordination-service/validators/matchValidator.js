import Joi from 'joi';

export const matchSchema = Joi.object({
	format: Joi.string().valid('bo1', 'bo3', 'bo5').required(),
});
