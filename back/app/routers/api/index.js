//! Index du routeur (GROS ECHANGEUR)



//* Require des differentes routes
const annonceRouter = require('./annonceRouter');
const associationRouter = require('./associationRouter');
const benevoleRouter = require('./benevoleRouter');
const loginRouter = require('./loginRouter');
const statusRouter = require('./statusRouter');
const taskRouter = require('./taskRouter');
const registerRouter = require('./registerRouter');

//* Require du controller permettant l'acces a la doc
const { apiController } = require('../../controllers/api');

//* Require du constucteur d'erreur API
const { ApiError } = require('../../errors');


//! Configuration du routeur
const express = require('express');
const router = express.Router();

//? Route par défaut de l'API, ici on a mis la documentation
router.all('/', apiController.home);


//? Ici on dispatche les route selon la requetes
//* Router des annonces
router.use('/annonces', annonceRouter);

//* Router des associations
router.use('/associations', associationRouter);

//* Router des benevoles
router.use('/benevoles', benevoleRouter);

//* Router pour le loggin
router.use('/login', loginRouter);

//* Router pour l'enregistrement
router.use('/register', registerRouter);

//* Router des status
router.use('/status', statusRouter);

//* Router des tâches
router.use('/tasks', taskRouter);





router.use(() => {
    throw new ApiError('API Route not found');
});

module.exports = router;