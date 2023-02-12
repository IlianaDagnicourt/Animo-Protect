//! Les requires:
//? Model
const TaskModel = require('../../models/taskModel');
//? Constructeur d'erreurs'
const {ApiError}= require('../../errors');



const taskController= {

    // ? Toutes les tâches
    /**
   * Task controller to get all tasks
   * @param {_} req Express request object (not used)
   * @param {array} res Express request Array
   * @returns Return a list of tasks
   */
    async getAllTask(req, res){
        const allTask = await TaskModel.findAll();

        return res.json(
            allTask
        )
    },

    // ? Détail d'une taches
    /**
     * Task controller to get a task.
     * @param {integer} req The id of the task
     * @param {object} res Express response object
     * @returns Return the detail of a task
     */
    async getTaskDetails(req, res){
        const id = Number(req.params.id);

        const taskDetail = await TaskModel.findByPk(id);

        if(!taskDetail){
            throw new ApiError('This task was not found');
        }

        return res.json(
            taskDetail
        );
    },


    // ? Créer une taches
    /**
     * 
     * @param {object} req Contains taks fields
     * @param {ocject} res Express response object
     * @returns Return the new task
     */
    async createTask(req, res){

        if(!req.body.description){
            throw new ApiError('The description is required');
        }
    
    
        const cloneTask = {
            description: req.body.description,
        } 
        
        const newTask = await TaskModel.create(cloneTask);
        
        return res.json(
            newTask
        )
 


    },
    

    // ? Mettre a jour les tâches
    /**
     * Task controller to update a task.
     * @param {object} req Contains the update body & the task id
     * @param {object} res Express response object
     * @returns Return the updated task
     */
    async updateTask(req, res){

        const task = await TaskModel.findByPk(req.params.id);
    
        if(!task){
            throw new ApiError('This task does not exist anymore');
        }
    
        //* Dans le cas où on update la description
        if(req.body.description){
    
            const id = req.params.id;
    
            const savedTask = await TaskModel.update({id}, req.body);
                
            return res.json(
                savedTask
            );
            
        }

    },
    
    // ? Supprimer une tâches
    /**
     * Benevole controller to delete a task.
     * @param {integer} req The task id
     * @param {StatusCode} res HTTP statusCode
     * @returns Return a statusCode 204
     */
    async deleteTask(req, res){


        const isTaskDeleted = await TaskModel.delete(req.params.id);
    
        if (!isTaskDeleted) { 
            throw new ApiError('This task does not exists');
        }
    
        return res.status(204).json();
 

    },
}
module.exports = taskController
