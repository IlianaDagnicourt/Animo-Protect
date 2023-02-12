const Joi = require('joi');

const schema = Joi.object({

    title: Joi.string()
        .min(5)
        .max(60)
        .required(),

});

module.exports = schema;
