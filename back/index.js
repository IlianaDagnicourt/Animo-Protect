//! Creation d'un serveur http classique

//* Require module http & dotenv
const { createServer } = require('http');
require('dotenv').config();

//* On utilise le module debug pour ameliorer l'affichage des erreurs
const debug = require('debug')('app:server');

//! -- Require de l'app
const app = require('./app');

const port = process.env.PORT;

//* On lance le serveur avec l'app
const server = createServer(app);

server.listen(port, () => {
    console.log(`🚀 Server Listening on http://localhost:${port}`);
});
