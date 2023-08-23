const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const accountRoutes = require('./routers/accountRouter')
const customerRoutes = require('./routers/customerRouter')
const fixerRoutes = require('./routers/fixerRouter')

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

app.use('/account', accountRoutes)
app.use('/customer', customerRoutes)
app.use('/fixer', fixerRoutes)

// //ITEMS

// // Get all items
// app.get('/item', async (req, res) => {
//   try {
//     const { rows } = await db.query('SELECT * FROM items')
//     res.json(rows)

//   } catch (error) {
//     console.error(error)
//     res.status(500).json({message: 'Error retrieving items'}) 
//   }
// })

// // Create new item
// app.post('/item', async (req, res) => {
//   const { user_name, item_name, item_description, price } = req.body
//   try {
//     const customerResult = await db.query('SELECT * FROM customers JOIN accounts ON customers.account_id = accounts.account_id WHERE accounts.user_name = $1', [user_name])
//     const customer = customerResult.rows[0]
//     if(!customer) {
//       return res.status(404).json({message: 'Customer not found'})
//     }
//     const query = `
//       INSERT INTO items (seller_id, item_name, item_description, price)
//       VALUES ($1, $2, $3, $4)
//       RETURNING *
//     `
//     const values = [customer.customer_id, item_name, item_description, price]
//     const { rows } = await db.query(query, values)
//     const item = rows[0]
//     await db.query('UPDATE customers SET items_for_sale = items_for_sale + 1 WHERE customer_id = $1', [customer.customer_id])
//     res.status(201).json(item)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({message: 'Error creating item'})
//   }
// })

// // Get single item
// app.get('/item/:id', async (req, res) => {
//   try {
//     const { rows } = await db.query('SELECT * FROM items WHERE item_id = $1', [req.params.id]) 
//     if (!rows[0]) {
//       return res.status(404).json({ message: 'Item not found' })
//     }
//     res.json(rows[0])
//   } catch (error) {
//      console.error(error)
//      res.status(500).json({ message: 'Error retrieving item' }) 
//   }
// })

// // Edit items
// app.patch('/item/:id', async (req, res) => {
//   try {
//     const itemId = req.params.id
//     const updates = req.body
//     const query = `
//       UPDATE items 
//       SET item_name = $1, item_description = $2, price = $3
//       WHERE item_id = $4
//       RETURNING *
//     `
//     const values = [updates.item_name, updates.item_description, updates.price, itemId]
//     const { rows } = await db.query(query, values)
//     if(!rows[0]) {
//       return res.status(404).json({message: 'Fixer not found'})
//     }
//     res.json(rows[0])
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({message: 'Error updating fixer profile'})
//   }
// })

// // Delete item
// app.delete('/item/:id', async (req, res) => {
//   try {
//     const itemId = req.params.id;
//     const query = `DELETE FROM items WHERE item_id = $1`;
//     await db.query(query, [itemId]);
//     const result = await db.query('SELECT * FROM items WHERE item_id = $1', [itemId]);
//     if(!result.rowCount) {
//       return res.status(404).json({message: 'Item not found'});
//     }
//     res.sendStatus(204);
//   } catch (error) {
//      console.error(error);
//      res.status(500).json({message: 'Error deleting item'}); 
//   }
// })

// // JOB ADVERTS

// // Get all items
// app.get('/job', async (req, res) => {
//   try {
//     const { rows } = await db.query('SELECT * FROM jobs')
//     res.json(rows)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({message: 'Error retrieving jobs'}) 
//   }
// })

// // Create new job
// app.post('/job', async (req, res) => {
//   const { user_name, job_name, job_description } = req.body
//   try {
//     const customerResult = await db.query('SELECT * FROM customers JOIN accounts ON customers.account_id = accounts.account_id WHERE accounts.user_name = $1', [user_name])
//     const customer = customerResult.rows[0]
//     if(!customer) {
//       return res.status(404).json({message: 'Customer not found'})
//     }
//     const query = `
//       INSERT INTO jobs (customer_id, job_name, job_description)
//       VALUES ($1, $2, $3)
//       RETURNING *
//     `
//     const values = [customer.customer_id, job_name, job_description]
//     const { rows } = await db.query(query, values)
//     const job = rows[0]
//     await db.query('UPDATE customers SET active_requests = active_requests + 1 WHERE customer_id = $1', [customer.customer_id])
//     res.status(201).json(job)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({message: 'Error creating job'}) 
//   }
// })

// // Edit job advert
// app.patch('/job/:id', async (req, res) => {
//   try {
//     const jobId = req.params.id
//     const updates = req.body
//     const query = `
//       UPDATE jobs 
//       SET job_name = $1, job_description = $2, available = $3, completed = $4
//       WHERE job_id = $5
//       RETURNING *
//     `
//     const values = [updates.job_name, updates.job_description, updates.available, updates.completed, jobId]
//     const { rows } = await db.query(query, values)
//     if(!rows[0]) {
//       return res.status(404).json({message: 'Job not found'})
//     }
//     res.json(rows[0])
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({message: 'Error updating job advert'})
//   }
// })

// // Get single job request
// app.get('/job/:id', async (req, res) => {
//   try {
//     const { rows } = await db.query('SELECT * FROM jobs WHERE job_id = $1', [req.params.id]) 
//     if (!rows[0]) {
//       return res.status(404).json({ message: 'Job not found' })
//     }
//     res.json(rows[0])
//   } catch (error) {
//      console.error(error)
//      res.status(500).json({ message: 'Error retrieving job' }) 
//   }
// })

// // Delete job
// app.delete('/job/:id', async (req, res) => {
//   try {
//     const job = await db.query('SELECT * FROM jobs WHERE job_id = $1', [req.params.id])
//     if(!job.rows[0]) {
//       return res.status(404).json({message: 'Job not found'})
//     }
//     await db.query('UPDATE customers SET active_requests = active_requests - 1 WHERE customer_id = $1', [job.rows[0].customer_id])
//     await db.query('DELETE FROM jobs WHERE job_id = $1', [req.params.id])
//     res.sendStatus(204)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({message: 'Error deleting job'})
//   }
// })

module.exports = app