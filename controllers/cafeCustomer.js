const Customer = require('../models/cafeCustomer')
const db = require('../db/connect')

// model/DB -> controller -> router -> app -> localhost:3000/countries

async function index(req, res) {
  try {
        const customers = await Customer.getAll()
        res.status(200).json(customers)
  } catch (err) {
        res.status(500).json({ error: err.message })
  }
}

async function show(req, res) {
  try {
        const customerId = req.params.id
        const customer = await Customer.findById(customerId)
        res.status(200).json(customer)
  } catch (err) {
        res.status(404).json({ error: err.message })
  }
}

// async function create(req, res) {
//   try {
//     const data = req.body
//     const newAccount = await Account.create(data)
//     res.status(201).json(newAccount)
//   } catch (err) {
//     res.status(400).json({ error: err.message })
//   }
// }

async function create(req, res) {
    const { user_name } = req.body
  
    try {
      // Check if the user_name is provided
      if (!user_name) {
        return res.status(400).json({ message: 'User_name is required.' });
      }
  
      // Check if the user_name exists in the accounts table
      const accountResult = await db.query('SELECT * FROM accounts WHERE user_name = $1', [user_name]);
      console.log(accountResult)
      const account = accountResult.rows[0];
      console.log(account)
  
      if (!account) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Create a new customer using the Customer model
      const newCustomer = await Customer.create(account.account_id);
  
      res.status(201).json(newCustomer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating customer' });
    }
}
  

async function destroy(req, res) {
    try {
        const customerId = req.params.id
        const customerToDelete = await Customer.findById(customerId)
        await customerToDelete.destroy()
        res.sendStatus(204)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

module.exports = {
  index,
  show,
  create,
  destroy
}