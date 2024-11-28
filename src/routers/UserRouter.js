const express = require('express');
const userController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require('../middleware/AuthMiddleware');
const router = express.Router();

router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.loginUser);
router.put('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', authMiddleware, userController.deleteUser);
router.get('/getAll', userController.getAllUser);
router.get('/get-details/:id', authMiddleware, userController.getDetailsUser);
router.post('/refresh_token', userController.refreshToken);
module.exports = router;