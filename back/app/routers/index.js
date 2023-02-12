const express = require('express');

const apiRouter = require('./api');
const websiteRouter = require('./website');
const errorHandler = require('../helpers/errorHandler');
const router = express.Router();

// On préfixe les routers Quand on utilise de router préfixé afin de regrouper des famille de
// routes, il faut bien faire attention à l'ordre des routers. Il faut aller du plus précis à celui
// qui indique la route la plus proche de la racine
router.use('/api', apiRouter);
router.use('/', websiteRouter);

router.use(errorHandler);

module.exports = router;