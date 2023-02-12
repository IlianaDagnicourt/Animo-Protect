const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const tokenService = {

    /**
     * Middleware Function who create a API token.
     * @param {object} user Express request object (Object containt user hashed password & email )
     * @param {string} password Express request object (Req.body.password)
     * @returns Return Object user with API Token
     */
    createtoken(user, password){

        if(bcrypt.compareSync(password, user.password)) {
            //? Creation du token jwt
            const token = jwt.sign(
                { user_id: user.id,
                    role: user.role },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            //? save user token
            user.token = token;
            
            console.log(user);
            return user
        }


    }
}

module.exports = tokenService