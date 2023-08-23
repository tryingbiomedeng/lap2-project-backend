const { Router } = require('express')
const customerController = require('../controllers/cafeCustomer')
const customerRouter = Router()

customerRouter.get('/', customerController.index)
customerRouter.get('/:id', customerController.show)
customerRouter.post('/', customerController.create)
customerRouter.delete('/:id', customerController.destroy)

module.exports = customerRouter