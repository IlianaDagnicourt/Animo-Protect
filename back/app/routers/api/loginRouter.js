//! Les requires:
//? Controller
const { loginController: controller }= require('../../controllers/api');
//? Middleware de validation des données
const validate = require('../../validation/validator');
//? Schema pour le middelware de validation des données
const loginSchema = require('../../validation/schemas/login');
//? Middleware Try/Catch pour les controller
const controllerHandler = require('../../helpers/controllerHandler');


//! Configuration du router
const express = require('express');
const router = express.Router();

//? Route générale
router.route('/')
//*Se connecter
/**
     * POST /api/login
     * @summary Login as user
     * @tags Login
     * @param {User} body.required - Email & Password
     * @return {Object<user>} 200 - Success response
     */
    .post(validate('body',loginSchema),controllerHandler(controller.login))


module.exports = router