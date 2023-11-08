const Router = require('express');
const shortLinkerController = require('../controllers/shortLinkerController');
const router = new Router();

router.post('/shortlinker', shortLinkerController.generateShortLink);

router.get('/:shorturl', shortLinkerController.redirectOriginal);

module.exports = router;
