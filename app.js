const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const accounts = require('./data/accounts')
const profiles = require('./data/profiles')
const items = require('./data/items')
const jobs = require('./data/jobs')

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

app.get('/account', (req, res) => {
    res.json(accounts)
})

app.post('/account', (req, res) => {
    const newAccount = req.body
    const id = accounts.length + 1
    accounts.push({...newAccount, id: parseInt(id)})
    res.status(201).json(newAccount) 
})
  
app.get('/account/:id', (req, res) => {
    const id = parseInt(req.params.id)
    console.log(id)
    const account = accounts.find(a => a.id === id)
    if (!account) {
      return res.status(404).json({message: 'Account not found'})
    }
    res.json(account)
})


//PROFILES

app.get('/profile', (req, res) => {
    res.json(profiles) 
})

app.get('/profile/:id', (req, res) => {
    const id = req.params.id
    const profile = profiles.find(p => p.id === parseInt(id))
    if (!profile) {
      return res.status(404).json({message: 'Profile not found'})
    }
    res.json(profile)
})
  
app.post('/profile', (req, res) => {
    const newProfile = req.body
    const id = profiles.length + 1
    profiles.push({...newProfile, id: parseInt(id)})
    res.status(201).json(newProfile) 
})
  
app.patch('/profile/:id', (req, res) => {
    const id = req.params.id
    const updates = req.body
    const profile = profiles.find(p => p.id === parseInt(id))
  
    if (!profile) {
      return res.status(404).json({message: 'Profile not found'})
    }
    Object.assign(profile, updates)
    res.json(profile)
})
  
app.delete('/profile/:id', (req, res) => {
    const id = req.params.id
    const index = profiles.findIndex(p => p.id === parseInt(id))
  
    if (index === -1) {
      return res.status(404).json({message: 'Profile not found'})
    }
    profiles.splice(index, 1)
    res.sendStatus(204)
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