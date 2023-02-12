const {ApiError}= require('../errors');

const checkedLogged = (req, res, next) => {
    if(!req.user) {
        throw new ApiError('need to be logged');
    }
    next();
}

module.exports = checkedLogged