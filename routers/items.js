const { Router } = require('express');

const itemsController = require('../controllers/items');

const router = Router();

router.get('/', itemsController.index);
router.get('/:id', itemsController.showById);
router.post('/', itemsController.create);
router.patch('/:id', itemsController.update);

module.exports = router;