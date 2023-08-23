const Customer = require('../models/cafeCustomer')
const Account = require('../models/cafeAccount')

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

async function create(req, res) {
    const { user_name } = req.body
    console.log(req.body)
    try {
      const account = await Account.findByUserName(user_name);
      if (!account) {
        return res.status(404).json({ message: 'User not found' });
      }
  
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