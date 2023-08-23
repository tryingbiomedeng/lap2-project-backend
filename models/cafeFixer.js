const db = require('../db/connect')

class Fixer {
    constructor (data) {
        this.fixer_id = data.fixer_id
        this.account_id = data.account_id
        this.bio = data.bio
        this.experience = data.experience
        this.jobs_done = data.jobs_done
        this.rating = data.rating
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM fixers;")
        if (response.rows.length === 0) {
          throw new Error('No fixers available')
        }
        return response.rows.map(c => new Fixer(c))
    }

    static async findById(fixerId) {
        const response = await db.query('SELECT * FROM fixers WHERE fixer_id = $1', [fixerId])
        if (response.rows.length != 1) {
          throw new Error('Unable to locate fixer')
        }
        return new Fixer(response.rows[0])
    }

    static async create(data) {
        console.log('Reached Fixer.create')
        try {
        const query = `
            INSERT INTO fixers (account_id, bio, experience)
            VALUES ($1, $2, $3)
            RETURNING *`;

        const values = [data.account_id, data.bio, data.experience]

        const { rows } = await db.query(query, values);
        return new Fixer(rows[0]);
        } catch (error) {
            throw new Error('Error creating fixer');
        }
    }

    static async update(fixerId, updates) {
        try {
            const query = `
                UPDATE fixers 
                SET bio = $1, experience = $2  
                WHERE fixer_id = $3
                RETURNING *
            `;

            const values = [updates.bio, updates.experience, fixerId]
            const { rows } = await db.query(query, values)
            if (!rows[0]) {
                throw new Error('Fixer not found')
            }

            const { fixer_id, bio, experience } = rows[0]
            return new Fixer({ fixer_id, bio, experience })
        } catch (error) {
            throw error
        }
    }
  
    async destroy() {
        await db.query(`DELETE FROM fixers WHERE fixer_id = $1`, [this.fixer_id])
        return 'Fixer deleted'
    }
}

module.exports = Fixer