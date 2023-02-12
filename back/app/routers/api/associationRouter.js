//! Les requires:
//? Controller
const { associationController: controller }= require('../../controllers/api');
//? Middleware de validation des données
const validate = require('../../validation/validator');
//? Middleware de verification du JWT
const checkRole = require('../../middlewares/checkRole');
//? Middleware de verification de connection
const checkedLogged = require('../../middlewares/checkedLogged')
//? Schema pour le middelware de validation des données
const {
    updateAssociationSchema: updateSchema

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
//* Recuperer toutes les associations
    /**
     * GET /api/associations
     * @summary Get all associations
     * @tags Associations
     * @return {Array<Association>} 200 - Success response
     */
    .get(controllerHandler(controller.getAllAssociation))

//? Route association par id
router.route('/:id(\\d+)')
//*Detail d'une association
    /**
     * GET /api/associations/{id}
     * @summary Get association details
     * @tags Associations
     * @param {integer} association.id - association's id
     * @return {object} 200 - Success response
     */
    .get(controllerHandler(controller.getAssociationDetails))

//* Update une association
    /**
     * PATCH /api/associations/{id}
     * @summary Update association
     * @tags Associations
     * @param {integer} association.id  - association's id
     * @param {Association} body.required - Association info
     * @return {object} 200 - Success response
     */
    .patch(checkedLogged,checkRole('association'), validate('body', updateSchema), controllerHandler(controller.updateAssociation))
//* Supprimer une association
    /**
     * DELETE /api/associations/{id}
     * @summary Delete association
     * @tags Associations
     * @param {integer} association.id  - association's id'
     * @return {object} 200 - Success response
     */
    .delete(checkedLogged,checkRole('association'),deleteChatUser, controllerHandler(controller.deleteAssociation))


module.exports = router