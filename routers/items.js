const { Router } = require('express');

const itemsController = require('../controllers/items');

const router = Router();

router.get('/', itemsController.index);
router.post('/', itemsController.create);

module.exports = router;