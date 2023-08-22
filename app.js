const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const db = require('../database/connect')

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

app.get('/item', (req, res) => {
    res.json(items) 
})

app.post('/item', (req, res) => {
    const newItem = req.body
    const id = items.length + 1
    items.push({...newItem, id: parseInt(id)})
    res.status(201).json(newItem) 
})

app.get('/item/:id', (req, res) => {
    const id = parseInt(req.params.id)
    console.log(id)
    const item = items.find(a => a.id === id)
    if (!item) {
      return res.status(404).json({message: 'Item not found'})
    }
    res.json(item)
})

app.delete('/item/:id', (req, res) => {
    const id = req.params.id
    const index = items.findIndex(p => p.id === parseInt(id))
  
    if (index === -1) {
      return res.status(404).json({message: 'Item not found'})
    }
    items.splice(index, 1)
    res.sendStatus(204)
})

// JOB ADVERTS

app.get('/job', (req, res) => {
    res.json(jobs) 
})

app.post('/job', (req, res) => {
    const newJob = req.body
    const id = jobs.length + 1
    jobs.push({...newJob, id: parseInt(id)})
    res.status(201).json(newJob) 
})

app.get('/job/:id', (req, res) => {
    const id = parseInt(req.params.id)
    console.log(id)
    const job = jobs.find(a => a.id === id)
    if (!job) {
      return res.status(404).json({message: 'Job not found'})
    }
    res.json(job)
})

app.delete('/job/:id', (req, res) => {
    const id = req.params.id
    const index = jobs.findIndex(p => p.id === parseInt(id))
  
    if (index === -1) {
      return res.status(404).json({message: 'Job not found'})
    }
    jobs.splice(index, 1)
    res.sendStatus(204)
})

module.exports = app