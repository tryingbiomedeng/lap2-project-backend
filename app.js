const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const accounts = require('./accounts')
const profiles = require('./profiles')

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
    const account = req.body
    console.log("line 24", account)
    accounts.push(account)
    res.status(201).json(account)
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

module.exports = app