const CoreDatamapper = require('./coreDatamapper');
const client = require('../clients/database');

class Benevole extends CoreDatamapper {
    tableName = 'benevole';

    /**
     * Knex (SQL) request that find the volunteer by their email
     * @param {email} email 
     * @returns Return the volunteer with the good email
     */
    async findByEmail(email) {
        //! Version SQL classique
        /*
        const preparedQuery = {
            text: `SELECT * FROM "${this.tableName}" WHERE email = $1`,
            values: [email],
        };

        const result = await this.client.query(preparedQuery);
        if (!result.rows[0]) {
            return null;
        }

        return result.rows[0];
        
        */

        //! Version Knex
        const query = this.knex(this.tableName)
            .select('email',
                'first_name',
                'last_name',
                'phone',
                'description',
                'adress',
                'zip_code',
                'city',
                'country')
            .where('email', email)
            .returning('*');
        const rows = await query;

        return rows[0];

    }
    
}

module.exports = new Benevole(client);
