const Account = require('../models/cafeAccount')

// model/DB -> controller -> router -> app -> localhost:3000/countries

async function index(req, res) {
  try {
    const accounts = await Account.getAll()
    res.status(200).json(accounts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function show(req, res) {
  try {
    const accountId = req.params.id
    const account = await Account.findById(accountId)
    res.status(200).json(account)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

async function create(req, res) {
  try {
    const data = req.body
    console.log(data)
    const newAccount = await Account.create(data)
    res.status(201).json(newAccount)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

module.exports = {
  index,
  show,
  create
}