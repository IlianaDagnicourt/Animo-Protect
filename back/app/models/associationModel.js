const CoreDatamapper = require('./coreDatamapper');
const client = require('../clients/database');

class Association extends CoreDatamapper {
    tableName = 'association';

    /**
     * Knex (SQL) request that find the associaion by their Siren
     * @param {integer} siren 
     * @returns Return the association with the good siren
     */
    async findBySiren(siren) {

        //! Version SQL Classique
        /*
        const preparedQuery = {
            text: `SELECT * FROM "${this.tableName}" WHERE siren = $1`,
            values: [siren],
        };

        const result = await this.client.query(preparedQuery);
        console.log(result.rows);
        if (!result.rows[0]) {
            return null;
        }

        return result.rows[0];
        
        */

        //! Version Knex 
        const query = this.knex(this.tableName)
            .select('*')
            .where('siren', siren)
            .returning('name');
        const rows = await query;

        return rows[0];

    }

    /**
     * Knex (SQL) request that find the association by their email
     * @param {email} email 
     * @returns Return the association with the good email
     */
    async findByEmail(email) {

        const query = this.knex(this.tableName)
            .select('*')
            .where('email', email)
            .returning('email','password');
        const rows = await query;

        return rows[0];

    }

 


}

module.exports = new Association(client);