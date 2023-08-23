const { Router } = require('express');

const jobsController = require('../controllers/jobs');

const router = Router();

router.get('/', jobsController.index);
router.get('/:id', jobsController.showById);
router.post('/', jobsController.create);
router.patch('/:id', jobsController.update);
router.delete('/:id', jobsController.destroy);

module.exports = router;