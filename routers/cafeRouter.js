// model/DB -> controller -> router -> app -> localhost:3000/countries/:name
const { Router } = require('express')
const accountController = require('../controllers/cafeAccount')
const customerController = require('../controllers/cafeCustomer')
const fixerController = require('../controllers/cafeFixer')

const cafeRouter = Router()

cafeRouter.get('/account', accountController.index)
cafeRouter.get('/account/:id', accountController.show)
cafeRouter.post('/account', accountController.create)

cafeRouter.get('/customer', customerController.index)
cafeRouter.get('/customer/:id', customerController.show)
cafeRouter.post('/customer', customerController.create)
cafeRouter.delete('/customer/:id', customerController.destroy)

cafeRouter.get('/fixer', fixerController.index)
cafeRouter.get('/fixer/:id', fixerController.show)
cafeRouter.post('/fixer', fixerController.create)
cafeRouter.patch('/fixer/:id', fixerController.update)
cafeRouter.delete('/fixer/:id', fixerController.destroy)

module.exports = cafeRouter