const db = require('../db/connect')

class Customer {
    constructor (data) {
        this.customer_id = data.customer_id
        this.account_id = data.account_id
        this.active_requests = data.active_requests
        this.items_for_sale = data.items_for_sale
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM customers;")
        if (response.rows.length === 0) {
          throw new Error('No customers available')
        }
        return response.rows.map(c => new Customer(c))
    }

    static async findById(customerId) {
        const response = await db.query('SELECT * FROM customers WHERE customer_id = $1', [customerId])
        if (response.rows.length != 1) {
          throw new Error('Unable to locate customer')
        }
        return new Customer(response.rows[0])
    }

    static async create(account_id) {
        try {
        const query = `
            INSERT INTO customers (account_id)
            VALUES ($1)
            RETURNING *
        `;

        const values = [account_id];
        const { rows } = await db.query(query, values);
        return new Customer(rows[0]);
        } catch (error) {
        throw new Error('Error creating customer');
        }
    }

    async destroy() {
        await db.query('DELETE FROM jobs WHERE customer_id = $1', [this.customer_id])
        await db.query(`DELETE FROM customers WHERE customer_id = $1`, [this.customer_id])
        return 'Customer deleted'
    }
}

module.exports = Customer