//! Middleware verification des tokens classique
const jwt = require("jsonwebtoken");
const config = process.env;

/**
 * 
 * @param {object} req Contains the token
 * @param {_} res Express response object (Not used)
 * @param {*} next Pass to the next middelware if token Match
 * @returns 
 */
const decodeToken = async (req, res, next) => {
    
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        console.log('Header Token',token);
    
        const userDecoded = jwt.verify(token, config.TOKEN_KEY);

        console.log('req.user',userDecoded);
        req.user = userDecoded;
        
        return next();
        
    } catch (err){
        next()
    }
}

module.exports = decodeToken;