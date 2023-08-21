const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const accounts = require('./accounts')

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

module.exports = app