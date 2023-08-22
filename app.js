const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const db = require('./db/connect')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger('dev'))

app.get('/', (req, res) => {
    res.json({
      name: "Florin recycle cafe",
      description: "Come and save the environment with us"
    })
})

// ACCOUNTS

// Get all accounts
app.get('/account', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM accounts')
    res.json(rows)  
  } catch (err) {
    console.error(err.message)
  }
})

// Create new account 
app.post('/account', async (req, res) => {
  try {
    const { email, user_name, user_password } = req.body
    const query = `
      INSERT INTO accounts (email, user_name, user_password) 
      VALUES ($1, $2, $3)
      RETURNING *
    `
    const values = [email, user_name, user_password]
    const { rows } = await db.query(query, values)
    res.status(201).json(rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creating account' })
  }
})

// Get single account
app.get('/account/:id', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM accounts WHERE account_id = $1', [req.params.id]) 
    if (!rows[0]) {
      return res.status(404).json({ message: 'Account not found' })
    }
    res.json(rows[0])
  } catch (error) {
     console.error(error)
     res.status(500).json({ message: 'Error retrieving account' }) 
  }
})

// CUSTOMERS

// Get all customers
app.get('/customer', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM customers')
    res.json(rows) 
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Error retrieving customers'})
  }
})

// Get single customer
app.get('/customer/:id', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM customers WHERE customer_id = $1', [req.params.id])

    if(!rows[0]) {
      return res.status(404).json({message: 'Customer not found'})
    }

    res.json(rows[0])

  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Error retrieving customer'})
  }
})

// Create new customer
app.post('/customer', async (req, res) => {
  const { user_name } = req.body
  try {
    const accountResult = await db.query('SELECT * FROM accounts WHERE user_name = $1', [user_name]) 
    const account = accountResult.rows[0]
    if(!account) {
      return res.status(404).json({message: 'User not found'})
    }
    const query = `
      INSERT INTO customers (account_id)
      VALUES ($1)
      RETURNING *  
    `
    const values = [account.account_id]
    const { rows } = await db.query(query, values)
    res.status(201).json(rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Error creating customer'})
  }
})

// Delete customer profile
app.delete('/customer/:id', async (req, res) => {

  try {
    const customerId = req.params.id;
    const query = `DELETE FROM customers WHERE customer_id = $1`;
    await db.query(query, [customerId]);
    const result = await db.query('SELECT * FROM customers WHERE customer_id = $1', [customerId]);
    if(!result.rowCount) {
      return res.status(404).json({message: 'Customer not found'});
    }
    res.sendStatus(204);
  } catch (error) {
     console.error(error);
     res.status(500).json({message: 'Error deleting customer profile'}); 
  }
})

//FIXERS

// Get all fixers
app.get('/fixer', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM fixers')
    res.json(rows)  
  } catch (err) {
    console.error(err.message)
  }
})

// Get single fixer profile
app.get('/fixer/:id', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM fixers WHERE fixer_id = $1', [req.params.id]) 
    if (!rows[0]) {
      return res.status(404).json({ message: 'Account not found' })
    }
    res.json(rows[0])
  } catch (error) {
     console.error(error)
     res.status(500).json({ message: 'Error retrieving account' }) 
  }
})

// Create fixer profile
app.post('/fixer', async (req, res) => {
  const { user_name, bio, experience } = req.body;
  try {
    const accountResult = await db.query('SELECT * FROM accounts WHERE user_name = $1', [user_name]);
    const account = accountResult.rows[0];
    if (!account) {
      return res.status(404).json({ message: 'User not found' });
    }
    const query = `
      INSERT INTO fixers (account_id, bio, experience) 
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [account.account_id, bio, experience];
    const { rows } = await db.query(query, values);
    const insertedFixer = rows[0];
    res.status(201).json(insertedFixer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating fixer' });
  }
});

// Edit fixer profile
app.patch('/fixer/:id', async (req, res) => {
  try {
    const fixerId = req.params.id
    const updates = req.body
    const query = `
      UPDATE fixers 
      SET bio = $1, experience = $2  
      WHERE fixer_id = $3
      RETURNING *
    `
    const values = [updates.bio, updates.experience, fixerId]
    const { rows } = await db.query(query, values)
    if(!rows[0]) {
      return res.status(404).json({message: 'Fixer not found'})
    }
    res.json(rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Error updating fixer profile'})
  }
})
  
// Delete fixer profile
app.delete('/fixer/:id', async (req, res) => {
  try {
    const fixerId = req.params.id;
    const query = `DELETE FROM fixers WHERE fixer_id = $1`;
    await db.query(query, [fixerId]);
    const result = await db.query('SELECT * FROM fixers WHERE fixer_id = $1', [fixerId]);
    if(!result.rowCount) {
      return res.status(404).json({message: 'Fixer not found'});
    }
    res.sendStatus(204);
  } catch (error) {
     console.error(error);
     res.status(500).json({message: 'Error deleting fixer profile'}); 
  }
})

//ITEMS

// Get all items
app.get('/item', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM items')
    res.json(rows)

  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Error retrieving items'}) 
  }
})

// Create new item
app.post('/item', async (req, res) => {
  const { user_name, item_name, item_description, price } = req.body
  try {
    const customerResult = await db.query('SELECT * FROM customers JOIN accounts ON customers.account_id = accounts.account_id WHERE accounts.user_name = $1', [user_name])
    const customer = customerResult.rows[0]
    if(!customer) {
      return res.status(404).json({message: 'Customer not found'})
    }
    const query = `
      INSERT INTO items (seller_id, item_name, item_description, price)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `
    const values = [customer.customer_id, item_name, item_description, price]
    const { rows } = await db.query(query, values)
    const item = rows[0]
    await db.query('UPDATE customers SET items_for_sale = items_for_sale + 1 WHERE customer_id = $1', [customer.customer_id])
    res.status(201).json(item)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Error creating item'})
  }
})

// Get single item
app.get('/item/:id', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM items WHERE item_id = $1', [req.params.id]) 
    if (!rows[0]) {
      return res.status(404).json({ message: 'Item not found' })
    }
    res.json(rows[0])
  } catch (error) {
     console.error(error)
     res.status(500).json({ message: 'Error retrieving item' }) 
  }
})

// Edit items
app.patch('/item/:id', async (req, res) => {
  try {
    const itemId = req.params.id
    const updates = req.body
    const query = `
      UPDATE items 
      SET item_name = $1, item_description = $2, price = $3
      WHERE item_id = $4
      RETURNING *
    `
    const values = [updates.item_name, updates.item_description, updates.price, itemId]
    const { rows } = await db.query(query, values)
    if(!rows[0]) {
      return res.status(404).json({message: 'Fixer not found'})
    }
    res.json(rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Error updating fixer profile'})
  }
})

// Delete item
app.delete('/item/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const query = `DELETE FROM items WHERE item_id = $1`;
    await db.query(query, [itemId]);
    const result = await db.query('SELECT * FROM items WHERE item_id = $1', [itemId]);
    if(!result.rowCount) {
      return res.status(404).json({message: 'Item not found'});
    }
    res.sendStatus(204);
  } catch (error) {
     console.error(error);
     res.status(500).json({message: 'Error deleting item'}); 
  }
})

// JOB ADVERTS

// Get all items
app.get('/job', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM jobs')
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Error retrieving jobs'}) 
  }
})

// Create new job
app.post('/job', async (req, res) => {
  const { user_name, job_name, job_description } = req.body
  try {
    const customerResult = await db.query('SELECT * FROM customers JOIN accounts ON customers.account_id = accounts.account_id WHERE accounts.user_name = $1', [user_name])
    const customer = customerResult.rows[0]
    if(!customer) {
      return res.status(404).json({message: 'Customer not found'})
    }
    const query = `
      INSERT INTO jobs (customer_id, job_name, job_description)
      VALUES ($1, $2, $3)
      RETURNING *
    `
    const values = [customer.customer_id, job_name, job_description]
    const { rows } = await db.query(query, values)
    const job = rows[0]
    await db.query('UPDATE customers SET active_requests = active_requests + 1 WHERE customer_id = $1', [customer.customer_id])
    res.status(201).json(job)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Error creating job'}) 
  }
})

// Edit job advert
app.patch('/job/:id', async (req, res) => {
  try {
    const jobId = req.params.id
    const updates = req.body
    const query = `
      UPDATE jobs 
      SET job_name = $1, job_description = $2, available = $3, completed = $4
      WHERE job_id = $5
      RETURNING *
    `
    const values = [updates.job_name, updates.job_description, updates.available, updates.completed, jobId]
    const { rows } = await db.query(query, values)
    if(!rows[0]) {
      return res.status(404).json({message: 'Job not found'})
    }
    res.json(rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Error updating job advert'})
  }
})

// Get single job request
app.get('/job/:id', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM jobs WHERE job_id = $1', [req.params.id]) 
    if (!rows[0]) {
      return res.status(404).json({ message: 'Job not found' })
    }
    res.json(rows[0])
  } catch (error) {
     console.error(error)
     res.status(500).json({ message: 'Error retrieving job' }) 
  }
})

// Delete job
app.delete('/job/:id', async (req, res) => {
  try {
    const job = await db.query('SELECT * FROM jobs WHERE job_id = $1', [req.params.id])
    if(!job.rows[0]) {
      return res.status(404).json({message: 'Job not found'})
    }
    await db.query('UPDATE customers SET active_requests = active_requests - 1 WHERE customer_id = $1', [job.rows[0].customer_id])
    await db.query('DELETE FROM jobs WHERE job_id = $1', [req.params.id])
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Error deleting job'})
  }
})

module.exports = app