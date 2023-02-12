//! Les requires:
//? Model
const BenevoleModel = require('../../models/benevoleModel');
//? Constructeur d'erreurs'
const {ApiError}= require('../../errors');




const benevoleController= {

    // ? Tous les bénévoles
    /**
     * Benevole controller to get all volunteers.
     * @param {_} _ Express request object (not used)
     * @param {array} res Express response Array
     * @returns Return a list of all volunteers
     */
    async getAllBenevole(req, res){
        const allBenevole = await BenevoleModel.findAll();

        return res.json({
            allBenevole
        });
    },

    // ? Détail d'un benevole
    /**
     * Benevole controller to get a volunteer.
     * @param {integer} req The if of the volunteer 
     * @param {object} res Express response object
     * @returns Return the detail of the volunteer
     */
    async getBenevoleDetails(req, res){
        const id = Number(req.params.id)

        const benevoleDetail = await BenevoleModel.findByPk(id);

        if(!benevoleDetail){
            throw new ApiError('This volunteer was not found');
        }
        return res.json(
            benevoleDetail
        );
    },


    // ? Mettre a jour un bénévole
    /**
     * Benevole controller to update a volunteer.
     * @param {Object} req Contains the update body & the id of the volunteer
     * @param {object} res Express response object
     * @returns Return the updated volunteer
     */

    async updateBenevole(req, res){

        if(req.user.user_id != req.params.id){
            throw new ApiError('You are not allowed to do this');
        }
       
        const benevole = await BenevoleModel.findByPk(req.params.id);
    
        if(!benevole){
            throw new ApiError('This volunteer does not exists');
    
        }    
        // * Dans le cas où un des champs est remplis
        if(req.body.email ||
                req.body.civility ||
                req.body.firstname ||
                req.body.lastname ||
                req.body.phone ||
                req.body.password ||
                req.body.adress ||
                req.body.zip_code ||
                req.body.city||
                req.body.picture ||
                req.body.description
        ){
            const id = req.params.id
            const savedBenevole = await BenevoleModel.update({id}, req.body);
                
            return res.json(
                savedBenevole
            );
        }
     
 
        
    },
    

    // ? Supprimer un bénévole 
    /**
     * Benevole controller to delete a volunteer.
     * @param {integer} req The volunteer id
     * @param {statusCode} res HTTP statusCode
     * @returns  Return a statusCode 204
     */
    async deleteBenevole(req, res){

        const isBenevoleDeleted = await BenevoleModel.delete(req.params.id);


        if (!isBenevoleDeleted) { 
            throw new ApiError('This volunteer does not exist anymore');
        }

        return res.status(204).json();
 
    },
}
module.exports = benevoleController
