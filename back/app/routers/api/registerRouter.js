//! Les requires:
//? Controller
const { registerController: controller }= require('../../controllers/api');
//? Middleware de validation des données
const validate = require('../../validation/validator');
//? Middleware addChatEngine
const addUserChat = require('../../middlewares/Chat/addUser')
//? Schema pour le middelware de validation des données
const {
    associationSchema, 
    benevoleSchema} = require('../../validation/schemas')
//? Middleware Try/Catch pour les controller
const controllerHandler = require('../../helpers/controllerHandler');


//! Configuration du router
const express = require('express');
const router = express.Router();

//? Route enregistrement Association
router.route('/association')
/**
     * POST /api/register/association
     * @summary Register an association
     * @tags Register
     * @param {Association} body.required - Association info
     * @return {Object<Association>} 200 - Success response
     */
    .post(validate('body', associationSchema),addUserChat,controllerHandler(controller.createAssociation))

//? Route enregistrement Benevole
router.route('/benevole')
/**
     * POST /api/register/benevole
     * @summary Register a benevole
     * @tags Register
     * @param {Benevole} body.required - Benevole info
     * @return {Object<Benevole>} 200 - Success response
     */
    .post(validate('body', benevoleSchema),addUserChat,controllerHandler(controller.createBenevole))

module.exports = router