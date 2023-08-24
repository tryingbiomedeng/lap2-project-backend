const bcrypt = require('bcrypt')

const Account = require('../models/cafeAccount')
const Customer = require('../models/cafeCustomer')
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
    data.user_password = await bcrypt.hash(data.user_password, salt)
    console.log(data);

    // save username & encrypted password
    const result = await Account.create(data)
    // create customer
    console.log(result.account_id);
    await Customer.create(result.account_id)
    res.status(201).send(result)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

async function login(req, res) {
  const data = req.body;

  try {
    const user = await Account.findByUserName(data.user_name)

    const authenticated = await bcrypt.compare(data.user_password, user.user_password)

    if (!authenticated) {
      throw new Error("Incorrect credentials.")
    } else {
      const token = await Token.create(user.account_id)
      const customer_id = await Account.findCustomerId(user.account_id)
      const id = customer_id.customer_id
      res.status(200).json({authenticated: true, token: token.token, id: id})
    }
  } catch (error) {
    res.status(401).json({error: error.message})
  }
}

async function logout(req,res) {
  try {
    const validToken = await Token.showByToken(req.headers["authorization"])
    const user = Account.findById(validToken.account_id) // needed?
    await validToken.destroy()
    res.send({authenticated: false})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

module.exports = {
  index,
  show,
  create,
  register,
  login,
  logout
}