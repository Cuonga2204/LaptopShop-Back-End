const express = require('express');
const userController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require('../middleware/AuthMiddleware');
const uploadImage = require('../middleware/uploadImageMiddleware');
const router = express.Router();

router.post('/sign-up', uploadImage.single('avatar'), userController.createUser);
router.post('/sign-in', userController.loginUser);
router.put('/update-user/:id', uploadImage.single('avatar'), userController.updateUser);
router.delete('/delete-user/:id', authMiddleware, userController.deleteUser);
router.get('/getAll', userController.getAllUser);
router.get('/get-details/:id', userController.getDetailsUser);
router.post('/refresh_token', userController.refreshToken);
module.exports = router;