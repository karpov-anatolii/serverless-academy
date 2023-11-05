const Router = require('express');
const router = new Router();
const ipController = require('../controllers/ipController');

router.get('/', ipController.getCountryBody);
router.get('/:ip', ipController.getCountryParam);
module.exports = router;
