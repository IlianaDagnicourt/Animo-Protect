const logger = require('./logger');

/**
 * Middleware that respond to a next method with an error as argument
 * @param {object} err Error class
 * @param {object} res Express response object
 */

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next){
    logger.error(err);

    let statusCode = 500;
    let message= err.message;

    if (err.name === 'ApiError') {
        statusCode = err.infos?.statusCode ?? 400;
        message = err.infos?.details || err.message;
    }

    //! Token Error
    else if(err.name === 'A token is required for authentication') {
        statusCode = err.infos?.statusCode ?? 400;
        message = err.message;
    }
    else if(err.name === 'Invalid Token') {
        statusCode = err.infos?.statusCode ?? 498;
        message = err.message;
    }

    //! Annonces Error
    else if(err.name === `Annonces not found`) {
        statusCode = err.infos?.statusCode ?? 404;
        message = err.message;
    }
    else if(err.name === 'All the field must be specify') {
        statusCode = err.infos?.statusCode ?? 400;
        message = err.message;
    } 
    else if(err.name === 'This announcement does not exists') {
        statusCode = err.infos?.statusCode ?? 404;
        message = err.message;
    }
    else if(err.name === 'This announcement does not exist anymore') {
        statusCode = err.infos?.statusCode ?? 404;
        message = err.message;
    }

    //! Association Error
    else if(err.name === 'Association not found') {
        statusCode = err.infos?.statusCode ?? 404;
        message = err.message;
    }
    else if(err.name === 'This association does not exists') {
        statusCode = err.infos?.statusCode ?? 404;
        message = err.message;
    }
    else if(err.name === 'This association does not exist anymore') {
        statusCode = err.infos?.statusCode ?? 404
        message = err.message;
    }

    //! Benevole Error
    else if(err.name === 'This volunteer was not found') {
        statusCode = err.infos?.statusCode ?? 404;
        message = err.message;
    }
    else if(err.name === 'This volunteer does not exists') {
        statusCode = err.infos?.statusCode ?? 404;
        message = err.message;
    }
    else if(err.name === 'This volunteer does not exist anymore') {
        statusCode = err.infos?.statusCode ?? 404;
        message = err.message;
    }

    //! Login Errors
    else if(err.name === 'All input is required') {
        statusCode = err.infos?.statusCode ?? 400;
        message = err.message;
    }
    else if(err.name === 'Invalid Credentials') {
        statusCode = err.infos?.statusCode ?? 400;
        message = err.message;
    }
    else if(err.name === 'You have to register an account !') {
        statusCode = err.infos?.statusCode ?? 400;
        message = err.message;
    }
    

    //! Register Error
    else if(err.name === 'Error password not match') {
        statusCode = err.infos?.statusCode ?? 401;
        message = err.message;
    }
    else if(err.name === 'Association Already Exist. Please Login') {
        statusCode = err.infos?.statusCode ?? 400;
        message = err.message;
    }
    else if(err.name === 'Benevole Already Exist. Please Login') {
        statusCode = err.infos?.statusCode ?? 409;
        message = err.message;

    }
    //! Status Error
    else if(err.name === 'This status was not found') {
        statusCode = err.infos?.statusCode ?? 404;
        message = err.message;
    }
    else if(err.name === 'The title is required') {
        statusCode = err.infos?.statusCode ?? 400;
        message = err.message;
    }
    else if(err.name === 'This status does not exists') {
        statusCode = err.infos?.statusCode ?? 404;
        message = err.message;
    }
    else if(err.name === 'This status does not exist anymore') {
        statusCode = err.infos?.statusCode ?? 404;
        message = err.message;
    }
    
    //! task Error
    else if(err.name === 'This task was not found') {
        statusCode = err.infos?.statusCode ?? 404;
        message = err.message;
    }
    else if(err.name === 'The description is required') {
        statusCode = err.infos?.statusCode ?? 400;
        message = err.message;
    }
    else if(err.name === 'This task does not exist anymore') {
        statusCode = err.infos?.statusCode ?? 404;
        message = err.message;
    }
    else if(err.name === 'This task does not exists') {
        statusCode = err.infos?.statusCode ?? 404;
        message = err.message;
    }
    else if(err.name === 'Bad Request') {
        statusCode = err.infos?.statusCode ?? 400;
        message = 'Mauvais formatage des données ';
    }


    
    res.status(statusCode).json({ error: message });
}
module.exports = errorHandler