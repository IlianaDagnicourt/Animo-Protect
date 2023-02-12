const CoreDatamapper = require('./coreDatamapper');
const client = require('../clients/database');

const knex = require('../clients/database');

class Annonce extends CoreDatamapper {
    tableName = 'annonce';
    knex = knex;

    /**
     * Knex (SQL) request that recover details for an announcement and his associations
     * @param {integer} id The id of the announcement
     * @returns The details of the selected announcement and his associations
     */
    async annonceDetail (id){
        //! Version SQl
        /*
        //* Preparation de la query
        const preparedQuery = {
            text: `
            SELECT
            //* On selectionne les champs que l'on souhaite
            "annonce"."title",
            "annonce"."description",
            "association"."id"
            "association"."name",
            "annonce"."quotas",
            "annonce"."status",
            "association"."city",
            //* Ici on selectionne la premiere table
            FROM "annonce"
            //* Et on joint les autres tables que l'on souhaite en precisant les connexions entre les clefs primaire et etrangere
            JOIN "association" ON "annonce"."association_id" = "association"."id"
            //* On choisi le filtre
            WHERE "annonce"."id" = $1;
            
            values: [id],
        };

        const result = await this.client.query(preparedQuery);

        if (!result.rows[0]) {
            return null;
        }

        return result.rows[0];

        */

        //! Version knex
        const query = this.knex(this.tableName)
            .select('annonce.title',
                'annonce.description',
                'association.id',
                'association.name',
                'annonce.quotas',
                knex.ref('status.title').as('status'),
                'annonce.city',
                'association.username'
            )
            .join(
                'association',
                'annonce.association_id',
                'association.id')
            .join(
                'status',
                'annonce.status_id',
                'status.id'
            )
            .where('annonce.id', id)
            .returning('*');
        const rows = await query;

        return rows[0];

    }

    async addTasktoAnnonce(annonceId, taskId){
        const query = this.knex('annonce_has_task')
            .insert(
                {annonce_id: annonceId,
                    task_id: taskId}
            );

        const rows = await query;

        return rows

    }

    async deleteTaskAnnonce(annonceId, taskId) {
        const query = this.knex.queryBuilder()
            .from('annonce_has_task')
            .where({
                'annonce_id':annonceId,
                'task_id': taskId
            })
            .del()

        const rows = await query;

        return rows[0];
    }

    /**
     * Knex (SQL) request that find the announcement by their tasks
     * @param {integer} taskId The task id 
     * @returns return announcements that have the desired tasks
     */
    async findByTask(taskId) {
        const query = this.knex(this.tableName)
            .select('*')
            .join(
                'annonce_has_task',
                'annonce_has_task.annonce_id',
                'annonce.id',
            )
            .where('task_id', taskId);

        const rows = await query;

        return rows;
    }

    /**
     *  Knex (SQL) request that find the announcement by theirs status
     * @param {integer} statusId  The status id
     * @returns return announcements that have the desired status
     */
    async findByStatus(statusId) {
        const query = this.knex(this.tableName)
            .select('*')
            .join(
                'status',
                'annonce.status_id',
                'status.id',
            )
            .where('status_id', statusId);

        const rows = await query;

        return rows;
    }

    /** 
    *  Knex (SQL) request that find the announcement by theirs association
    * @param {integer} associationId  The association id
    * @returns return announcements that have the desired association
    */
    async findByAssociation(associationId) {
        const query = this.knex(this.tableName)
            .select('annonce.title', 'annonce.description','annonce.status_id','annonce.city')
            .join(
                'association',
                'annonce.association_id',
                'association.id',
            )
            .where('association_id', associationId);

        const rows = await query;

        return rows;
    }


}

module.exports = new Annonce(client);