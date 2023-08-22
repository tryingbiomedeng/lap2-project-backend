const Account = require('../models/cafe')

// model/DB -> controller -> router -> app -> localhost:3000/countries


async function index(req, res) {
  try {
    // retrieve countries from the db
    const accounts = await Account.getAll()
    // send them as a response
    res.status(200).json(accounts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


module.exports = {
  index
}