
//! Les requires:
//? Controller
const { taskController: controller }= require('../../controllers/api');
//? Middleware de validation des données
const validate = require('../../validation/validator');
//? Middleware de verification du JWT
const checkRole = require('../../middlewares/checkRole');
//? Middleware de verification de connection
const checkedLogged = require('../../middlewares/checkedLogged');
//? Schema pour le middelware de validation des données
const {taskSchema: schema} = require('../../validation/schemas');
//? Middleware Try/Catch pour les controller
const controllerHandler = require('../../helpers/controllerHandler');



//! Configuration du router
const express = require('express');
const router = express.Router();

//? Route générale
router.route('/')
//* Recuperer toutes les tâches
/**
     * GET /api/tasks
     * @summary Get all tasks
     * @tags Status
     * @return {Array<Tasks>} 200 - Success response
     */
    .get(controllerHandler(controller.getAllTask))

//* Ajouter une tâche
    /**
     * POST /api/tasks
     * @summary Create a tasks
     * @tags Status
     * @return {Object<Task>} 200 - Success response
     */
    .post(checkRole('admin'), validate('body', schema),controllerHandler(controller.createTask))

//? Route taches par id
router.route('/:id(\\d+)')
//* Detail d'une tâche
/**
     * GET /api/tasks/{id}
     * @summary Get task detail
     * @tags Status
     * @param {integer} task.id - task id
     * @return {Object<Task>} 200 - Success response
     */
    .get(controllerHandler(controller.getTaskDetails))

//* Update une tâche
    /**
     * POST /api/tasks/{id}
     * @summary Update a tasks
     * @tags Status
     * @param {integer} task.id - task id
     * @param {Task} body.required - Task info
     * @return {Object<task>} 200 - Success response
     */
    .patch(checkedLogged,checkRole('admin'), validate('body', schema), controllerHandler(controller.updateTask))

//* Supprimer une tâche
/**
     * DELETE /api/tasks/{id}
     * @summary Delete a tasks
     * @tags Status
     * @param {integer} task.id - task id
     * @return {Object} 200 - Success response
     */
    .delete(checkedLogged,checkRole('admin'), controllerHandler(controller.deleteTask))
module.exports = router