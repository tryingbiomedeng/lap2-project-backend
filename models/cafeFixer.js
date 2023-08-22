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

    // static async create(account_id) {
    //     try {
    //     const query = `
    //         INSERT INTO customers (account_id)
    //         VALUES ($1)
    //         RETURNING *
    //     `;

    //     const values = [account_id];
    //     const { rows } = await db.query(query, values);
    //     return new Customer(rows[0].account_id);
    //     } catch (error) {
    //     throw new Error('Error creating customer');
    //     }
    // }


    static async update(fixerId, updates) {
        try {
            const query = `
                UPDATE fixers 
                SET bio = $1, experience = $2  
                WHERE fixer_id = $3
                RETURNING *
            `;

            const values = [updates.bio, updates.experience, fixerId]; // Use updates here
            const { rows } = await db.query(query, values);

            if (!rows[0]) {
                throw new Error('Fixer not found');
            }

            const { fixer_id, bio, experience } = rows[0];
            return new Fixer({ fixer_id, bio, experience }); // Use an object to initialize Fixer
        } catch (error) {
            throw new Error('Error updating fixer profile');
        }
    }
  
    async destroy() {
        const response = await db.query(`DELETE FROM fixers WHERE fixer_id = $1`, [this.fixer_id])
        return new Fixer(response.rows[0])
    }
}

module.exports = Fixer