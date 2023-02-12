const CoreDatamapper = require('./coreDatamapper');
const client = require('../clients/database');

class Task extends CoreDatamapper {
    tableName = 'task';

    /**
     * A Knex (SQL) Function who find the announcement with the same task
     * @param {integer} annonceId 
     * @returns A list of Announcement
     */
    //! j'en suis ici c'est ca qui marche pas pour l'instant
    async findByAnnonce(annonceId) {
        const query = this.knex(this.tableName)
            .select('task.description')
            .join(
                'annonce_has_task',
                'annonce_has_task.task_id',
                'task.id',
            )
            .where('annonce_id', annonceId)
            .returning('*');

        const rows = await query;
        
        return rows;
    }

}

module.exports = new Task(client);
