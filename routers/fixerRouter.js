const { Router } = require('express')
const fixerController = require('../controllers/cafeFixer')
const fixerRouter = Router()

fixerRouter.get('/', fixerController.index)
fixerRouter.get('/:id', fixerController.show)
fixerRouter.post('/', fixerController.create)
fixerRouter.patch('/:id', fixerController.update)
fixerRouter.delete('/:id', fixerController.destroy)

module.exports = fixerRouter