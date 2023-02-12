const express = require('express');

const { websiteController } = require('../../controllers/website');
const { ApiError } = require('../../errors');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router.use((_, res, next) => {
    // On défini le content-type de la réponse en html pour détection de format d'erreur
    res.type('html');
    next();
});

router.get('/', controllerHandler(websiteController.home));

router.use(() => {
    throw new ApiError('Page not found');
});

module.exports = router;
