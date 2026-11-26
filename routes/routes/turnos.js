const router = require('express').Router();
const controller = require('../controllers/turnos');

router.get('/', controller.listar);
router.get('/:id', controller.consultar);
router.post('/', controller.crear);

module.exports = router;
