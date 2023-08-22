const Token = require('../models/Token.js');

async function authenticator(req, res, next) {
  try {
    const accountToken = req.headers["authorization"];

    if (accountToken == "null") {
      throw new Error('User not authenticated')
    } else {
      const validToken = await Token.showByToken(accountToken);
      next();
    }
  } catch (error) {
    res.status(403).json({error: error.message});
  }
}

module.exports = authenticator;