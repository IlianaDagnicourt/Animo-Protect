//! Les requires:
//? Models
const { BenevoleModel, AssociationModel} = require('../../models');
//? Bcrypt pour le hashage des Mdp
const bcrypt = require('bcryptjs');
//? Constructeur d'erreurs'
const {ApiError} = require('../../errors');

const registerController= {

    //? Creation d'association
    /**
     * Function who created a new Association in BDD and hashed password
     * @param {object} req  Contains association fields for the register
     * @param {ocject} res  Express response object
     * @returns Return the new association's Information
     */
    async createAssociation(req, res){
        //? Etape 1:
        //* Recuperer les datas de l'association

        const {
            siren, 
            name,
            adress,
            email,
            password,
            repeat_password,
            zip_code,
            city,
            country,
            phone,
            username,
            secret,
            description,
            picture
        } = req.body;

        //! Verification
        if (!(siren && name && adress && email && password && repeat_password && zip_code && city && country && username && secret)) {
            throw new ApiError('All input is required');
        }
        //! Verification password match
        if(password ==! repeat_password){
            throw new ApiError('Error password not match');
        }

        //? Etape 2:
        //* Verifie si l'association existe deja en BDD
        const isAssociation = await AssociationModel.findBySiren(siren);

        //! Si elle existe 
        if (isAssociation) {
            throw new ApiError('Association Already Exist. Please Login');

        }
        
        //? Etape 3:

        //* Encryptage du mdp
        const encryptedPassword = await bcrypt.hash(password, 10);        
        
        //* Creation association en BDD
        const association = await AssociationModel.create({
            siren,
            name,
            adress,
            zip_code,
            city,
            country,
            phone,
            email: email.toLowerCase(),
            password: encryptedPassword,
            username,
            secret,
            picture,
            description
        });


        return res.status(201).json(
            association
        );

    },

    /**
     * Function who created a new Benevole in BDD ans hashed password
     * @param {object} req Contains the Benevole fields for the register
     * @param {ocject} res Express response object
     * @returns Return the new Benevole's Information
     */
    async createBenevole (req, res){
        //? Etape 1:
        //* Recuperation des infos
        const {
            phone,
            first_name,
            last_name,
            adress,
            email,
            password,
            repeat_password,
            zip_code,
            country,
            city,
            username,
            secret
        }= req.body;

        //! Si tous les champs ne sont pas rempli
        if (!(
            first_name &&
            last_name &&
            phone &&
            adress &&
            email &&
            password &&
            repeat_password &&
            zip_code &&
            country&& 
            city && 
            username &&
            secret
        )) {
            throw new ApiError('All input is required');
        }


        //! Verification password match
        if(password ===! repeat_password){
            throw new ApiError('Error password not match');
        }

        //? Etape 2:
        //* Verifie si le bénévole existe deja en BDD 
        const isBenevole = await BenevoleModel.findByEmail(email);

        //! S'il existe
        if(isBenevole) {
            throw new ApiError('Benevole Already Exist. Please Login');

        }

        //? Etape 3:
        //* On encryptage le mdp
        const encryptedPassword = await bcrypt.hash(password, 10);
    
        //* On remplace le mdp de req.body par celui encrypté
        req.body.password = encryptedPassword;
        
        //* On lower case les emails
        req.body.email = email.toLowerCase();     

        //* On supprime le champs repeat_password
        delete req.body.repeat_password;

        //* Creation benevole base de donnée
        const benevole = await BenevoleModel.create(req.body);

        

        return res.status(201).json(
            benevole
        );
        
    
    
    }
}
module.exports =registerController