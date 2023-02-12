//! Les requires:
//? Controller
const { statusController: controller }= require('../../controllers/api');
//? Middleware de validation des données
const validate = require('../../validation/validator');
//? Middleware de verification du JWT
const checkRole = require('../../middlewares/checkRole');
//? Middleware de verification de connection
const checkedLogged = require('../../middlewares/checkedLogged')

//? Schema pour le middelware de validation des données
const {
    statusSchema: schema,
    updateStatusSchema : updateSchema
} = require('../../validation/schemas');
//? Middleware Try/Catch pour les controller
const controllerHandler = require('../../helpers/controllerHandler');



//! Configuration du router
const express = require('express');
const router = express.Router();

//? Route général
router.route('/')
//* Recupérer tous les status
/**
     * GET /api/status
     * @summary Get all status
     * @tags Status
     * @return {Array<Status>} 200 - Success response
     */
    .get(controllerHandler(controller.getAllStatus))

//* Ajouter un status
/**
     * POST /api/status
     * @summary Create a status
     * @tags Status
     * @return {Object<Status>} 200 - Success response
     */
    .post(checkRole('admin'),validate('body', schema),controllerHandler(controller.createStatut))

//? Route status par id
router.route('/:id(\\d+)')
//* Detail d'un status
    /**
     * GET /api/status/{id}
     * @summary Get a status detail
     * @tags Status
     * @param {integer} status.id - status id
     * @return {Object<Status>} 200 - Success response
     */
    .get(controllerHandler(controller.getStatusDetails))

//* Mettre a jours un status
/**
     * PATCH /api/status/{id}
     * @summary Update a status
     * @tags Status
     * @param {integer} status.id - status id
     * @param {Status} body.required - Status info
     * @return {Object<Status>} 200 - Success response
     */
    .patch(checkedLogged,checkRole('admin'), validate('body', updateSchema), controllerHandler(controller.updateStatus))

//* Supprimer un status
/**
     * DELETE /api/status/{id}
     * @summary Delete a status
     * @tags Status
     * @param {integer} status.id - status id
     * @return {Object} 200 - Success response
     */
    .delete(checkedLogged,checkRole('admin'), controllerHandler(controller.deleteStatus))

module.exports = router