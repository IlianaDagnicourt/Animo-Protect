const Joi = require('joi');

const schema = Joi.object({
    title: Joi.string()
        .min(5)
        .max(60),
    description: Joi.string()
        .min(5)
        .max(1000),
    quotas: Joi.number()
        .max(10)
        .integer(),
    status_id: Joi.number().integer().min(1),
    tasks: Joi.array().items(Joi.number()),
    date: Joi.date(),
    city: Joi.string(),
    country: Joi.string()
        .max(35),

});

module.exports = schema;
