const Joi = require('joi');
const JoiPostalCode = Joi.extend(require('joi-postalcode'))
const JoiPhone = Joi.extend(require('joi-phone-number'));
const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const schema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    first_name: Joi.string()
        .required(),
    last_name: Joi.string()
        .required(),
    phone: JoiPhone.string().phoneNumber({ defaultCountry: 'FR'}),
    description: Joi.string()
        .max(1000),
    password: Joi.string()
        .regex(new RegExp(pattern))
        .required(),
    repeat_password: Joi.ref('password'),
    adress: Joi.string()
        .required(),
    zip_code: JoiPostalCode.string().postalCode('FR').required(),
    city: Joi.string()
        .max(45)
        .required(),
    token: Joi.string().token(),
    country: Joi.string()
        .max(35)
        .required(),
    username: Joi.string()
        .required(),
    secret: Joi.string()
        .required(),
    picture: Joi.string().uri(),


});

module.exports = schema;
