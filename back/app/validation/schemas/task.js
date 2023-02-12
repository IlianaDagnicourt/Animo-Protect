const Joi = require('joi');

const schema = Joi.object({

    description: Joi.string()
        .max(40)
        .required(),
});

module.exports = schema;
