const CoreDatamapper = require('./coreDatamapper');
const client = require('../clients/database');

class Login extends CoreDatamapper {
    
    /**
     * Login function who find an user in the all Database with their email
     * @param {email} email The login email
     * @returns Return the matching user
     */
    async findInAllEmail(email){

        const query=this.knex.queryBuilder()
            .select('id','email','password','role')
            .from('association')
            .where('email',email)
            .union([
                this.knex.queryBuilder()
                    .select('id','email','password','role')
                    .from('benevole')
                    .where('email',email)

            ])
            
        const rows = await query
        return rows[0];
            
    }

    /**
     * Login function who find the information of the connectedUser
     * @param {email} email the login email
     * @returns An object who contains some user information
     */
    async findInfo(email){


        const query=this.knex.queryBuilder()
            .select(
                'id',
                'adress',
                'zip_code',
                'city',
                'country',
                'role',
                'username',
                'secret'
            )
            .from('benevole')
            .where('email',email)

            .unionAll([
                this.knex.queryBuilder()
                    .select(
                        'id',
                        'adress',
                        'zip_code',
                        'city',
                        'country',
                        'role',
                        'username',
                        'secret'
                    )
                    .from('association')
                    .where('email',email)
    
            ])

        const rows = await query        
        return rows[0];

    }

}

module.exports = new Login(client);
