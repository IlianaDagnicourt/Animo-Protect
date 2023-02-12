
const {ApiError} = require('../errors')
/**
 * Factory which generate a data validation middleware function
 * @param {string} dataType - type of HTTP user input data source (query, body, or params)
 * @param {object} schema - Schema made with Joi.object()
 * @returns {object} express middleware function
 */
const middlewareFactory = (dataType, schema) => async (req, res, next) => {
    try {
        // DataType peut-être query, body, params…
        // Et cette information est récupérer au moment de créer le middleware côté router.
        await schema.validateAsync(req[dataType]);
        /// Si ca se passe bien on passe au controller (middleware suivant)
        next();
    } catch (err) {
        next(new ApiError(err.message, {statusCode: 400, details: err.details}));

    }
};

module.exports = middlewareFactory;
