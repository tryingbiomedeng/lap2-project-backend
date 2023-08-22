const db = require('../database/connect')

class Account {
    constructor (data) {
        this.account_id = data.account_id
        this.email = data.email
        this.user_name = data.user_name
        this.user_password = data.user_password
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM accounts;")
        if (response.rows.length === 0) {
          throw new Error('No accounts available')
        }
        return response.rows.map(c => new Account(c))
      }
}


module.exports = Account