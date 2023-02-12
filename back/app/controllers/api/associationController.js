//! Les requires:
//? Model
const AssociationModel = require('../../models/associationModel');
//? Bcrypt pour le hashage des Mdp
const bcrypt = require('bcryptjs');
//? Constructeur d'erreurs
const {ApiError}= require('../../errors');


const associationController ={
    
    // ? Toutes les associations
    /**
     * Association controller to get all associations.
     * @param {_} _ Express request object (not used)
     * @param {object} res Express response object
     * @returns Return all the associations
     */
    async getAllAssociation(req, res){
        const allAssociations = await AssociationModel.findAll();

        res.json(
            allAssociations
        );
    },


    // ? Détail d'une association
    /**
     * Association controller to get an association.
     * @param {integer} req The id of the association
     * @param {object} res Express response object
     * @returns Return the details of the association
     */
    async getAssociationDetails(req, res){
        const id = Number(req.params.id);

        const associationDetail = await AssociationModel.findByPk(id);
        if(!associationDetail){
            throw new ApiError('Association not found');
        }
        return res.json(
            associationDetail
        );
    },


    // ? Mettre a jour une association
    /**
     * Association controller to update an association.
     * @param {object} req Contains the body for the update change & the id of the association
     * @param {object} res Express response object (updated association)
     * @returns Return the new Association
     */
    async updateAssociation(req, res){

        if(req.user.user_id != req.params.id){
            throw new ApiError('You are not allowed to do this');
        }
        
        const association = await AssociationModel.findByPk(req.params.id);
     
        if(!association){
            throw new ApiError('This association does not exists');
        }
        
        //* Dans le cas où un des champs sont remplis
        if(req.body){
    
            //! Dans le cas ou une association met a jours son mot de passe
            // !! A voir comment faire ici c'est hypothetique !!
            if(req.body.password || req.body.repeat_password){
                if(req.body.password ==! req.body.repeat_password){
                    throw new ApiError('Error password not match');
                }
    
                const encryptedPassword = await bcrypt.hash(req.body.password, 10); 
                    
                req.body.password = encryptedPassword;
            }
            // ! --

            const id = req.params.id;
            const savedAssociation = await AssociationModel.update({id}, req.body);
                
            return res.json(
                savedAssociation
            );   
        }
    },
    
    // ? Supprimer une association 
    /**
     * Association controller to delete an association.
     * @param {integer} req The id of association
     * @param {StatusCode} res HTTP status Code
     * @returns  Return a statusCode 204
     */
    async deleteAssociation(req, res){

        if(req.user){

            const isAssociationDeleted = await AssociationModel.delete(req.params.id);

            
            if (!isAssociationDeleted) { 
                throw new ApiError('This association does not exist anymore');
            }
            
            return res.status(204).json();
        }
        else{
            throw new ApiError('You must have a valid Token')
        }
    },
}
module.exports = associationController;
