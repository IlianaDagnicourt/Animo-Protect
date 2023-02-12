const Joi = require('joi');
const JoiPostalCode = Joi.extend(require('joi-postalcode','joi-phone-number'))
const JoiPhone = Joi.extend(require('joi-phone-number'));
const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const schema = Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    phone: JoiPhone.string().phoneNumber({ defaultCountry: 'FR'}),
    description: Joi.string()
        .max(1000),
    password: Joi.string()
        .regex(new RegExp(pattern)),
    repeat_password: Joi.ref('password'),
    adress: Joi.string(),
    zip_code: JoiPostalCode.string().postalCode('FR'),
    city: Joi.string()
        .max(45),
    country: Joi.string()
        .max(35),
    picture: Joi.string().uri(),

});

module.exports = schema;
