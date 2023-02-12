//! Les requires:
//? Model
const StatusModel = require('../../models/statusModel');
//? Constructeur d'erreurs
const {ApiError}= require('../../errors');



const statusController= {

    // ? Recuperation de tous les status
    /**
   * Status controller to get all status
   * @param {_} req Express request object (not used)
   * @param {array} res Express request Array 
   * @returns Return the list of all status
   */
    async getAllStatus(req, res){
        const allStatus = await StatusModel.findAll();

        return res.json({
            allStatus
        })
    },


    // ? Détail d'un statut 
    /**
     * Status controller to get a status.
     * @param {integer} req The status id
     * @param {object} res Express response object
     * @returns Return the details of the status
     */
    async getStatusDetails(req, res){
        const id = Number(req.params.id);

        const statusDetail = await StatusModel.findByPk(id);
        if(!statusDetail){
            throw new ApiError('This status was not found');
        }
        res.json(
            statusDetail
        );
    },

    // ? Créer un statut
    /**
     * Function who created a new status in BDD
     * @param {object} req  Contains the title of the status
     * @param {object} res Express response object
     * @returns Return the new status
     */
    async createStatut(req, res){



        if(!req.body.title){
            throw new ApiError('The title is required');
        }
    
    
        const cloneStatus = {
            title: req.body.title,
        } 
        
        const newStatus = await StatusModel.create(cloneStatus);
        
        return res.json(
            newStatus
        )
  


    },


    // ? Mettre a jour les statuts
    /**
     * Status controller to update a status.
     * @param {object} req Contains the update Body & the id of the status
     * @param {object} res Express response object
     * @returns Return the Updated Status
     */

    async updateStatus(req, res){

 
        const status = await StatusModel.findByPk(req.params.id);
    
        if(!status){
            throw new ApiError('This status does not exists');
    
        }
    
        //* Dans le cas où on update le title
        if(req.body.title){
    
            const id = req.params.id;
            const savedStatus = await StatusModel.update({id}, req.body);
                
            return res.json(
                savedStatus
            );
            
        }
 


    },
    

    // ? Supprimer un Statut
    /**
     * Status controller to delete a status.
    * @param {integer} req The status id
     * @param {StatusCode} res HTTP statusCode
     * @returns Return a statusCode 204
     */

    async deleteStatus(req, res){

        const isStatusDeleted = await StatusModel.delete(req.params.id);
    
        if(!isStatusDeleted) { 
            throw new ApiError('This status does not exist anymore');
        }
    
        return res.status(204).json();
        


    },
}
module.exports = statusController
