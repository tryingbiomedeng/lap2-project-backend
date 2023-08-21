const { v4: uuidv4 } = require('uuid');

const db = require('../../database/connect'); // Change at production

class Token {
  constructor({token_id, account_id, token}) {
    this.token_id = token_id;
    this.account_id = account_id;
    this.token = token;
  }
}