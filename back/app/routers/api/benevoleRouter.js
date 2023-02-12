//! Les requires:
//? Controller
const { benevoleController: controller }= require('../../controllers/api');
//? Middleware de validation des données
const validate = require('../../validation/validator');
//? Middleware de verification du JWT
const checkRole = require('../../middlewares/checkRole');
//? Middleware de verification de connection
const checkedLogged = require('../../middlewares/checkedLogged')
//? Schema pour le middelware de validation des données
const {
    updateBenevoleSchema: updateSchema
} = require('../../validation/schemas');
//? Middleware Try/Catch pour les controller
const controllerHandler = require('../../helpers/controllerHandler');
//? Middleware addChatEngine
const deleteChatUser = require('../../middlewares/Chat/deleteUser')


//! Configuration du router
const express = require('express');
const router = express.Router();

//? Route général
router.route('/')
//* Recuperer tous les benevoles
/**
     * GET /api/benevoles
     * @summary Get all benevoles
     * @tags Benevoles
     * @return {Array<Benevoles>} 200 - Success response
     */
    .get(controllerHandler(controller.getAllBenevole))

//? Route benevole par id
router.route('/:id(\\d+)')
//* Detail d'un benevole
/**
     * GET /api/benevoles/{id}
     * @summary Get a benevole detail
     * @tags Benevoles
     * @param {integer} benevole.id - Benevole id
     * @return {Array<Benevoles>} 200 - Success response
     */
    .get(controllerHandler(controller.getBenevoleDetails))

//* Update un benevole
/**
     * UPDATE /api/benevoles/{id}
     * @summary Update a benevole
     * @tags Benevoles
     * @param {integer} benevole.id - Benevole id
     * @param {Benevole} body.required - Benevole info
     * @return {Array<Benevoles>} 200 - Success response
     */
    .patch(checkedLogged,checkRole('benevole'), validate('body', updateSchema), controllerHandler(controller.updateBenevole))

//* Supprimer un benevole
/**
     * DELETE /api/benevoles/{id}
     * @summary Get a benevole detail
     * @tags Benevoles
     * @param {integer} benevole.id - Benevole id
     * @return {Array<Benevoles>} 200 - Success response
     */
    .delete(checkedLogged,checkRole('benevole'),deleteChatUser, controllerHandler(controller.deleteBenevole))
module.exports = router