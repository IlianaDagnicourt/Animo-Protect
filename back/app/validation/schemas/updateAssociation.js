const Joi = require('joi');
const JoiPostalCode = Joi.extend(require('joi-postalcode'));
const JoiPhone = Joi.extend(require('joi-phone-number'));

const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const schema = Joi.object({

    name: Joi.string(),
    password: Joi.string()
        .regex(new RegExp(pattern)),
    repeat_password: Joi.ref('password'),
    adress: Joi.string(),
    description: Joi.string()
        .max(1000),
    zip_code: JoiPostalCode.string().postalCode('FR'),
    phone: JoiPhone.string().phoneNumber({ defaultCountry: 'FR'}),
    city: Joi.string()
        .max(45),
    picture: Joi.string().uri(),
    country: Joi.string()
        .max(35),

});

module.exports = schema;
