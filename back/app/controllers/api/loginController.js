//! Les requires:
//? Service de creation du token
const tokenService = require('../../services/token');
//? Model
const {LoginModel} = require('../../models');
//? Constructeur d'erreurs
const { ApiError}= require('../../errors');


const loginController= {

    /**
     * Login controller to log an user and create token.
     * @param {object} req Contains email & password
     * @param {object} res Express response object 
     * @returns Return the info of the authentificated User and his token
     */
    async login (req,res){
        //? Etape 1: 
        //* Recuperer info de l'user
        const email =req.body.email.toLowerCase();
        const password = req.body.password;
        

        //! Verifier que les champs sont bien rempli 
        if (!(email && password)) {
            throw new ApiError("All input is required");
        }
        
        //* Verifie si l'user existe en BDD 
        const user = await LoginModel.findInAllEmail(email);
        
        //! Dans le cas contraire
        if (!user){
            throw new ApiError('You have to register an account !');
        }

        //? Etape 2:

        //* Creation du token 
        const userToken = tokenService.createtoken(user, password);

        //! Si token invalide
        if(!userToken){
            throw new ApiError("Invalid Credentials");
        }

        //* Recuperation des infos de l'user
        const infoUser = await LoginModel.findInfo(email);


        //* Ajout du Token & du status connecté a l'user a renvoyer 
        const connectedUser= {
            ...infoUser,
            token: userToken.token,
        }

        console.log('Utilisateur connecté',connectedUser);

        return res.status(200).json(
            connectedUser
        );
                  
    }
} 

            
            
    

module.exports =loginController