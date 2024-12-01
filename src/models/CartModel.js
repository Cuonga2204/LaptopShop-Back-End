const mongoose = require('mongoose');
const cartItemSchema = require('./CartItem'); // Import schema CartItem

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Liên kết với model User
        required: true,
    },
    userName: {
        type: mongoose.Schema.Types.String,

    },
    items: [cartItemSchema], // Mảng các sản phẩm trong giỏ hàng
    totalPrice: {
        type: Number,
        default: 0, // Tổng giá trị của giỏ hàng
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
