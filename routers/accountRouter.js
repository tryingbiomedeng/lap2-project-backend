// model/DB -> controller -> router -> app -> localhost:3000/countries/:name
const { Router } = require('express')
const accountController = require('../controllers/cafeAccount')
const authenticator = require('../middleware/authenticator.js')

const accountRouter = Router()

accountRouter.get('/', accountController.index)
accountRouter.get('/:id', accountController.show)
accountRouter.post('/', accountController.create)
accountRouter.post('/register', accountController.register)
accountRouter.post('/login', accountController.login)
accountRouter.post('/logout', authenticator, accountController.logout)

module.exports = accountRouter