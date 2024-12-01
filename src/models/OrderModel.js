const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Liên kết với sản phẩm
        required: true,
    },
    nameProduct: {
        type: String,
        required: true,
    },
    imageProduct: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Liên kết với người dùng
        required: true,
    },
    userName: {
        type: String,
    },
    items: [orderItemSchema], // Các sản phẩm trong đơn hàng
    totalPrice: {
        type: Number,
        required: true,
    },
    shippingInfo: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String },
        address: { type: String, required: true },
    },
    status: {
        type: String,
        enum: ["Chờ xác nhận", "Chờ giao hàng", "Hoàn thành"],
        default: "Chờ xác nhận",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
