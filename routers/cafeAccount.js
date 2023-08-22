// model/DB -> controller -> router -> app -> localhost:3000/countries/:name
const { Router } = require('express')
const cafeController = require('../controllers/cafeAccount')

const cafeRouter = Router()

cafeRouter.get('/', cafeController.index)
cafeRouter.get('/:id', cafeController.show)
cafeRouter.post('/', cafeController.create)


module.exports = cafeRouter