const bcrypt = require('bcrypt')

const Account = require('../models/cafeAccount')
const Token = require('../models/Token')

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

async function register(req, res) {
  try {
    const data = req.body;

    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS))

    // encrypt password
    data.password = await bcrypt.hash(data.password, salt)

    // save username & encrypted password
    const result = await UserActivation.create(data)
    res.status(201).send(result)
  } catch {
    res.status(400).json({error: error.message})
  }
}

module.exports = {
  index,
  show,
  create,
  register
}