const { Router } = require('express');

const itemsController = require('../controllers/items');
const authenticator = require('../middleware/authenticator')

const router = Router();

router.get('/', itemsController.index);
router.get('/:id', itemsController.showById);
router.post('/', itemsController.create);
router.patch('/:id', itemsController.update);
router.delete('/:id', itemsController.destroy);

module.exports = router;