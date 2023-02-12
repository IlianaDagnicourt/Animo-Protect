const Joi = require('joi');

const schema = Joi.object({
    title: Joi.string()
        .min(5)
        .max(60)
        .required(),
    description: Joi.string()
        .min(5)
        .max(1000)
        .required(),
    quotas: Joi.number()
        .max(10)
        .integer()
        .required(),
    city: Joi.string().required(),
    association_id: Joi.number().integer().min(1).required(),
    status_id: Joi.number().integer().min(1),
    tasks: Joi.array().items(Joi.number()),
    date: Joi.date()
        .required(),

});

module.exports = schema;
