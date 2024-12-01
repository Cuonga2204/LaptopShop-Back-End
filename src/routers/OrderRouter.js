const express = require("express");
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { authUserMiddleware } = require('../middleware/AuthMiddleware');

router.post("/create", OrderController.createOrder);
router.post("/getAll", OrderController.getUserOrders);
router.get("/getAllOrder", OrderController.getAllOrders);
router.delete("/delete/:orderId", OrderController.deleteOrder);
router.get("/detail/:orderId", OrderController.getOrderDetail);
router.put("/update-status", OrderController.updateOrderStatus);
module.exports = router;