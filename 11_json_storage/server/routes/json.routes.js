const Router = require('express');
const jsonController = require('../controllers/jsonController');
const router = new Router();

router.get('/', jsonController.getAll);
router.put('/:path', jsonController.writeFile);
router.get('/:path', jsonController.readFile);

module.exports = router;
