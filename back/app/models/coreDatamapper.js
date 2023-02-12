
module.exports = class CoreDatamapper {
    tableName;

    constructor(client) {
        this.client = client;
        this.knex = client;
    }
    //! Fonction CRUD avec Knex

    //* Fonction recherche par id

    /**
     * A CoreModel Function who find a element by their id in the selected tableName
     * @param {integer} id the element
     * @returns Return the selected element
     */
    async findByPk(id) {

        //? Preparation de la query avec .knex(NomDeLaTable)
        const query = this.knex(this.tableName)
            //? Et ensuite on enchaine avec le select('Les champs qu'on souhaite')
            .select('*')
            //? le ou les filtre
            .where('id', id)
            //? Et ce qu'on souhaite retourner
            .returning('*');

        //? On stocke le resultat de la query dans un constante
        const rows = await query;
        
        //? Qu'on return ensuite [0] pour la premiere ligne
        return rows[0];
    }
  
    //* Fonction recherche global ( avec option parametre)
    /**
     * A CoreModel Fucntion wo find all the element (with posibility of parametre) in the selected tableName 
     * @param {Knex param} params .where() / .or() - Knex parameter for  
     * @returns Return en Array of the all éléments
     */
    async findAll(params) {
        //? On prepare la query de recherche global
        const query = this.knex(this.tableName).select('*');

        //! -- S'il y a un parametre --
        //? Dans le cas ou c'est where
        if (params?.$where) {
            //? 
            Object.entries(params.$where).forEach(([param, value]) => {
                if (param === '$or') {
                    query.where((builder) => {
                        Object.entries(value).forEach(([key, val]) => {
                            builder.orWhere(key, val);
                        });
                    });
                } else if (typeof value === 'object') {
                    Object.entries(value).forEach(([key, val]) => {
                        let operator;
                        switch (key) {
                        case '$ne':
                            operator = '<>';
                            break;
                        default:
                            operator = '=';
                            break;
                        }
                        query.where(key, operator, val);
                    });
                } else {
                    query.where(param, value);
                }
            });
        }
        const rows = await (process.env.CACHE_ENABLED)
            ? query.cache(process.env.SQL_CACHE_TTL)
            : query;

        return rows;
    }

    /**
     * A CoreModel Function who created an element in the selected tableName
     * @param {object} inputData Contains the Data to insert in BDD 
     * @returns Return the created element
     */
    async create(inputData) {
        const query = this.knex(this.tableName)
            .insert(inputData)
            .returning('*');

        const rows = await query;

        return rows[0];
    }

    /**
     * A CoreModel Function who updated the selected element
     * @param {integer} id The element id to update in the tableName
     * @param {object} inputData Contains hte data you want to update 
     * @returns Return the updated element
     */
    async update({id}, inputData) {
        const query = this.knex(this.tableName)
            .update({ ...inputData, updated_at: new Date() })
            .where({id})
            .returning('*');

        const rows = await query;

        return rows[0];
    }

    /**
     * A CoreModel Function who deleted the selected element
     * @param {integer} id The Element id to delete
     * @returns Return the deleted element.
     */
    async delete(id) {
        const query = this.knex(this.tableName).delete().where({ id }).returning('*');
        const rows = await query;
        return !!rows[0];
    }

    //! Fonction CRUD version SQL classique
    /*
    
    async findByPk(id) {
        const preparedQuery = {
            text: `SELECT * FROM "${this.tableName}" WHERE id = $1`,
            values: [id],
        };

        const result = await this.client.query(preparedQuery);

        if (!result.rows[0]) {
            return null;
        }

        return result.rows[0];
    }

    async findAll(params) {
        let filter = '';
        const values = [];

        if (params?.$where) {
            const filters = [];
            let indexPlaceholder = 1;

            Object.entries(params.$where).forEach(([param, value]) => {
                if (param === '$or') {
                    const filtersOr = [];
                    Object.entries(value).forEach(([key, val]) => {
                        filtersOr.push(`"${key}" = $${indexPlaceholder}`);
                        values.push(val);
                        indexPlaceholder += 1;
                    });
                    filters.push(`(${filtersOr.join(' OR ')})`);
                } else {
                    filters.push(`"${param}" = $${indexPlaceholder}`);
                    values.push(value);
                    indexPlaceholder += 1;
                }
            });
            filter = `WHERE ${filters.join(' AND ')}`;
        }

        const preparedQuery = {
            text: `
                SELECT * FROM "${this.tableName}"
                ${filter}
            `,
            values,
        };

        const result = await this.client.query(preparedQuery);

        return result.rows;
    }

    */

};
