//! Les requires:
//? Model
const {AnnonceModel, TaskModel} = require('../../models/');
//? Constructeur d'erreurs
const {ApiError}= require('../../errors');


const annonceController= {

    // ? Recuperer toutes les annonces
    /*
   * Function who get all the announcement
   * @param {_} req Express request object(not used) 
   * @param {Array} res Express response Object
   * @returns List of all annonces

   */
    async getAllAnnonce(req, res){
        const allAnnonce = await AnnonceModel.findAll();

        return res.json({
            allAnnonce
        });
    },

    //? Recuperer les annonces par tâches
    /**
     * Function who get all the annoucement with specific task
     * @param {integer} req The id of the desired task
     * @param {object} res Express response object
     * @returns Return a list of annoucement with desired Task
     */
    async getAnnonceByTask(req,res){
        const taskId= Number(req.params.id);

        const result = await AnnonceModel.findByTask(taskId);
        
        if(!result){
            throw new ApiError('No announcements with this task was not found');
        }

        return res.json({
            result
        });
    },
    //? Recuperer les annonces par association
    /**
     * Function who get all the announcement with specific associations
     * @param {integer} req The id of the desired association
     * @param {object} res Express response object
     * @returns Return a list of announcement with the desired Association
     */
    async getAnnonceByAssociation(req, res){

        const associationId= Number(req.params.id);

        const result = await AnnonceModel.findByAssociation(associationId);

        if(!result){
            throw new ApiError('No announcements with this association was not found');
        }

        return res.json(
            result
        );
    },


    //? Recuperer les annonces par status
    /**
     * Function who get all the announcement with specific status
     * @param {integer} req The id of the desired status
     * @param {object} res Express response object
     * @returns Return a list of announcement with the desired Status
     */
    async getAnnonceByStatus(req, res){

        const statusId= Number(req.params.id);

        const result = await AnnonceModel.findByStatus(statusId);

        if(!result){
            throw new ApiError('No announcements with this status was not found');
        }

        return res.json(
            result
        );
    },


    // ? Recuperer le détail d'une annonce 
    /**
     * Annonce controller to get details for one announcement
     * @param {integer} req  The id of the announcement
     * @param {object} res Express response object
     * @return Route API JSON response (detailled announcement)
     */
    async getAnnonceDetails(req, res){
        const id = Number(req.params.id);

        const annonceDetail = await AnnonceModel.annonceDetail(id);

        if(!annonceDetail){
            throw new ApiError('Annonces not found');
        }

        //* requete recuperer les taches qui sont associer a l'id
        annonceDetail.tasks = await TaskModel.findByAnnonce(id);
        return res.json(
            annonceDetail
        );
    },

 
    // ? Poster une annonce
    /**
     * Annonce Controller to create an announcement
     * @param {object} req Contains all the field of the annoucemement
     * @param {object} res Express response object
     * @returns Return the new announcement
     */
    async createAnnonce(req, res){
        
       
            
        //! Error First si un des champs n'est pas rempli
        if(!(req.body.title && req.body.description && req.body.quotas && req.body.date && req.body.city)){
            throw new ApiError('All the field must be specify');
        }
        
        const cloneAnnonce = {
            title: req.body.title,
            description: req.body.description,
            quotas: req.body.quotas,
            date: req.body.date,
            association_id:req.body.association_id,
            status_id:req.body.status_id,
            city: req.body.city,  
        };
                
        const newAnnonce = await AnnonceModel.create(cloneAnnonce);
        
        if(req.body.tasks){
            const tasksArray = req.body.tasks;
            
            await Promise.all(tasksArray.map(taskId => {
                                
                return AnnonceModel.addTasktoAnnonce(newAnnonce.id, taskId);
            }))    

        }
        return res.json(
            newAnnonce
        );


    },

    // ? Mettre a jour une annonce
    /**
     * Function who update an announcement
     * @param {object} req Contains the updated fiels of the announcement
     * @param {object} res  Express response object
     * @returns Return the updated announcement
     */
    async updateAnnonce(req, res){
        const id = req.params.id;
        const annonce = await AnnonceModel.findByPk(id);

        if(!annonce){
            throw new ApiError('This announcement does not exists');
    
        }
        const updateData ={
            title: req.body.title,
            description: req.body.description,
            quotas: req.body.quotas,
            data: req.body.data,
            status_id: req.body.status_id,
            city: req.body.city,
        }
        // * Dans le cas où un des champs est rempli
        if(updateData){

            const savedAnnonce = await AnnonceModel.update({id}, updateData);

            console.log(savedAnnonce);

            if(req.body.tasks){

                //* Recuperation des taches dans le body
                const tasksArray = req.body.tasks;
                //* Recherche s'il y a deja des tâches sur cette annonce
                const oldTasks = await TaskModel.findByAnnonce(savedAnnonce.id);
    
                //* Si c'est le cas on les supprime
    
                if (oldTasks.length) {
                    //* Promise.all permet de stocker toutes les promesse dans un tableau et des les executer en meme temps un fois la boucle fini
                    await Promise.all(tasksArray.map(taskId => {
                            
                        return AnnonceModel.deleteTaskAnnonce(savedAnnonce.id, taskId);
                    }));
                }
                //* Sinon on les crées
                await Promise.all(tasksArray.map(taskId => {
                                
                    return AnnonceModel.addTasktoAnnonce(savedAnnonce.id, taskId);
                }))
            }
            


            return res.json(
                savedAnnonce,

            );
        }
       

    },
    
    // ? Supprimer une annonce 
    /**
     * Function who delete an announcement
     * @param {integer} req the announcement id
     * @param {statusCode} res HTTP statusCode
     * @returns Return the statusCode 204
     */
    async deleteAnnonce(req, res){
      
        const isAnnonceDeleted = await AnnonceModel.delete(req.params.id);
        if (!isAnnonceDeleted) { 
            throw new ApiError('This announcement does not exist anymore');
        }
        return res.status(204).json();
        

    },



    
}

module.exports = annonceController;