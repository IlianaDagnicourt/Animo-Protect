
const websiteController = {

    /**
     * Home controller which display documentation link.
     * ExpressMiddleware signature
     * @param {object} _ Express request object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */

    home(req, res){
        const message = 'Hello World'
        res.json({ 
            message
        })
    }
}
module.exports = {
    websiteController,

};
