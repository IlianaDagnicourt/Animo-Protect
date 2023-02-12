//! Ici on créer le serveur express

//* Require
const express = require('express');
const router = require('./routers');
// const apidocs = require('./helpers/apidocs');
const cors = require('cors');
const decodeToken = require('./middlewares/JWTauth');

//* Creation du serveur express
const app = express();

require('./helpers/apidocs')(app);

//* methode pour utiliser les urlencoded et les json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("trust proxy", 1);
//* Utilisation de l'app pour la documentation
// apidocs(app);

//* On lève la restriction CORS pour nos amis React
app.use(cors({

    // origin: '*',
    origin: ['http://localhost:8080'],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    credentials: true,
}));

app.use(decodeToken)

//! La suite dans le router
app.use(router);



module.exports =  app;
