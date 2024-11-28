const express = require("express");
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { authUserMiddleware } = require('../middleware/AuthMiddleware');

router.post("/create", OrderController.createOrder);
router.post("/getAll", OrderController.getUserOrders);
router.delete("/delete/:orderId", OrderController.deleteOrder);
router.get("/detail/:orderId", OrderController.getOrderDetail);
module.exports = router;