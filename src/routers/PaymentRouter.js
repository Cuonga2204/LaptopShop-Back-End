const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/PaymentController");

// === Tạo URL thanh toán ===
router.post("/create", paymentController.createPaymentUrl);

// === Xử lý khi VNPay redirect về FE ===
router.get("/payment-return", paymentController.vnpayReturn);

// === Webhook IPN: VNPay gọi ngược về server ===
// router.get("/vnpay-ipn", paymentController.vnpayIPN);

module.exports = router;
