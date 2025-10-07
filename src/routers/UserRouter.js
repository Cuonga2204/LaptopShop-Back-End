const express = require("express");
const userController = require("../controllers/UserController");
const {
  authAdminMiddleware,
  authUserMiddleware,
} = require("../middleware/Auth.middleware");
const { validateRequest } = require("../middleware/validateRequest.middleware");
const uploadImage = require("../middleware/uploadImage.middleware");
const { LoginSchema, SignupSchema } = require("../validations/auth");
const router = express.Router();

router.post(
  "/sign-up",
  validateRequest(SignupSchema, "body"),
  uploadImage.single("avatar"),
  userController.createUser
);
router.post(
  "/sign-in",
  validateRequest(LoginSchema, "body"),
  userController.loginUser
);
router.put(
  "/update-user/:id",
  uploadImage.single("avatar"),
  userController.updateUser
);
router.delete(
  "/delete-user/:id",
  authAdminMiddleware,
  userController.deleteUser
);
router.get("/get-all", userController.getAllUser);
router.get(
  "/get-details/:id",
  authUserMiddleware,
  userController.getDetailsUser
);
// router.post('/refresh_token', userController.refreshToken);
module.exports = router;
