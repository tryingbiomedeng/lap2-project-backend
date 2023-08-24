const db = require('../db/connect')

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

    static async findById(accountId) {
        const response = await db.query('SELECT * FROM accounts WHERE account_id = $1', [accountId])
        if (response.rows.length != 1) {
          throw new Error('Unable to locate account')
        }
        return new Account(response.rows[0])
    }

    static async findCustomerId(accountId) {
      const response = await db.query('SELECT customer_id FROM customers JOIN accounts ON customers.account_id = accounts.account_id WHERE accounts.account_id = $1;', [accountId])
      if (response.rows.length != 1) {
        throw new Error('Unable to locate account')
      }
      return response.rows[0]
    }

    static async create(data) {
      const { email, user_name, user_password } = data   
      if (!email, !user_name, !user_password){
          throw new Error("Invalid user data.")
      }
      
      const response = await db.query(`
             INSERT INTO accounts (email, user_name, user_password) 
             VALUES ($1, $2, $3)
             RETURNING *`, 
             [email, user_name, user_password])
      return new Account(response.rows[0])
  }
  
  static async findByUserName(userName) {
    const query = 'SELECT * FROM accounts WHERE user_name = $1';
    const { rows } = await db.query(query, [userName]);
    return rows[0];
  }

}

module.exports = Account