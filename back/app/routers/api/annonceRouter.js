//! Les requires:
//? Controller
const { annonceController: controller }= require('../../controllers/api');
//? Middleware de validation des données
const validate = require('../../validation/validator');
//? Middleware de verification du role
const checkRole = require('../../middlewares/checkRole');
//? Middleware de verification de connection
const checkedLogged = require('../../middlewares/checkedLogged')
//? Schema pour le middelware de validation des données
const {
    annonceSchema: schema,
    updateAnnonceSchema : updateSchema
} = require('../../validation/schemas');
//? Middleware Try/Catch pour les controller
const controllerHandler = require('../../helpers/controllerHandler');


//! Configuration du router
const express = require('express');
const router = express.Router();

//? Route général
router.route('/')
//* Recuperer toutes les annonces
/**
     * GET /api/annonces
     * @summary Get all announcement
     * @tags Annonces
     * @return {Array<Annonces>} 200 - Success response
     */
    .get(controllerHandler(controller.getAllAnnonce))

//* Créer une annonce
/**
     * POST /api/annonces
     * @summary Create an announcement
     * @tags Annonces
     * @param {Annonce} body.required - Announcement info 
     * @return {object} 200 - Success response
     */
    .post(checkedLogged,checkRole('association'),validate('body', schema), controllerHandler(controller.createAnnonce));

//? Route Annonce par id 
router.route('/:id(\\d+)')
//* Detail d'une annonce
/**
     * GET /api/annonces/{id}
     * @summary Get an announcement detail
     * @tags Annonces
     * @param {integer} annonce.id - announcement id
     * @return {Object} 200 - Success response
     */
    .get(controllerHandler(controller.getAnnonceDetails))

//* Update une annonce
/**
     * PATCH /api/annonces/{id}
     * @summary Update announcement
     * @tags Annonces
     * @param {integer} annonce.id - announcement id
     * @param {Annonce} body.required - Announcement info
     * @return {Object} 200 - Success response
     */
    .patch(checkedLogged,checkRole('association'),validate('body', updateSchema), controllerHandler(controller.updateAnnonce))
//* Supprimer une annonce
/**
     * DELETE /api/annonces/{id}
     * @summary Delete an announcement 
     * @tags Annonces
     * @param {integer} annonce.id - announcement id
     * @return {Object} 200 - Success response
     */
    .delete(checkedLogged,checkRole('association'),controllerHandler(controller.deleteAnnonce));

    
//? Route Annonce par tâches    
router.route('/task/:id(\\d+)')
//* Recuperer les annonces par tâches
/**
     * GET /api/annonces/task/{id}
     * @summary Get announcements by their task
     * @tags Annonces by tasks
     * @param {integer} task.id - task's id
     * @return {Array<Annonces>} 200 - Success response
     */
    .get(controllerHandler(controller.getAnnonceByTask));

//? Route Annonce par Association    
router.route('/association/:id(\\d+)')
//* Recuperer les annonces par tâches
/**
     * GET /api/annonces/task/{id}
     * @summary Get announcements by their task
     * @tags Annonces by tasks
     * @param {integer} task.id - task's id
     * @return {Array<Annonces>} 200 - Success response
     */
    .get(controllerHandler(controller.getAnnonceByAssociation));


//? Route Annonce par status    
router.route('/status/:id(\\d+)')
//* Recuperer les annonces par Status
    /**
     * GET /api/annonces/status/{id}
     * @summary Get announcements by their status
     * @tags Annonces by status
     * @param {integer} status.id - status id
     * @return {Array<Annonces>} 200 - Success response
     */
    .get(controllerHandler(controller.getAnnonceByStatus));

    

module.exports = router