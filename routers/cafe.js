// model/DB -> controller -> router -> app -> localhost:3000/countries/:name
const { Router } = require('express')
const cafeController = require('../../controllers/cafe')

const cafeRouter = Router()

cafeRouter.get('/', cafeController.index)


module.exports = cafeRouter