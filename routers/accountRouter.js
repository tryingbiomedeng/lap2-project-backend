// model/DB -> controller -> router -> app -> localhost:3000/countries/:name
const { Router } = require('express')
const accountController = require('../controllers/cafeAccount')
const accountRouter = Router()

accountRouter.get('/', accountController.index)
accountRouter.get('/:id', accountController.show)
accountRouter.post('/', accountController.create)

module.exports = accountRouter