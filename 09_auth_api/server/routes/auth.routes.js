const Router = require('express');
const userController = require('../controllers/userController');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/sign-up', userController.registration);
router.post('/sign-in', userController.login);
router.post('/refresh-tokens', authMiddleware, userController.refreshTokens);

module.exports = router;
