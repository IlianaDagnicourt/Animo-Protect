const annonceController = require('./annonceController');
const associationController = require('./associationController');
const benevoleController = require('./benevoleController');
const statusController = require('./statusController');
const taskController = require('./taskController');
const loginController = require('./loginController');
const registerController = require('./registerController');


const apiController = {
    /**
     * Default API controller to show documention url.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    home(req, res) {
        const fullUrl = `${req.protocol}://${req.get('host')}`;
        return res.json({
            documentation_url: `${fullUrl}${process.env.API_DOCUMENTATION_ROUTE}`,
        });
    },
};

module.exports = { 
    apiController, 
    annonceController, 
    associationController, 
    benevoleController, 
    statusController, 
    taskController,
    loginController,
    registerController
};
