const Order = require('../models/OrderModel');
const Cart = require('../models/CartModel');
const User = require('../models/UserModel');
const mongoose = require("mongoose");
const createOrder = (userId, shippingInfo) => {
    return new Promise(async (resolve, reject) => {
        try {

            // Lấy giỏ hàng của người dùng
            const cart = await Cart.findOne({ userId: userId });
            const user = await User.findById(userId);
            console.log(user.email);

            if (!cart || cart.items.length === 0) {
                resolve({
                    status: "ERR",
                    message: "Cart is empty or not found",
                });
                return;
            }

            // Tạo đơn hàng từ giỏ hàng
            const order = new Order({
                userId: userId,
                userName: cart.userName,
                items: cart.items.map(item => ({
                    productId: item.product,
                    nameProduct: item.nameProduct,
                    imageProduct: item.imageProduct,
                    quantity: item.quantity,
                    price: item.price,
                })),
                totalPrice: cart.totalPrice,
                shippingInfo: { ...shippingInfo, email: user.email },
            });

            // Lưu đơn hàng
            await order.save();

            // Xóa giỏ hàng sau khi đặt hàng
            await Cart.findOneAndDelete({ userId: userId });

            resolve({
                status: "OK",
                message: "Order created successfully",
                data: order,
            });
        } catch (error) {
            reject(error);
        }
    });
};
const getUserOrders = (userId) => {

    return new Promise(async (resolve, reject) => {
        try {
            console.log(userId);
            console.log("Received userId:", userId);

            // Kiểm tra và chuyển đổi userId sang ObjectId nếu hợp lệ
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return resolve({
                    status: 'ERR',
                    message: 'Invalid userId',
                });
            }
            // const objectId = new mongoose.Types.ObjectId(userId);

            // Truy vấn danh sách đơn hàng theo userId


            const orders = await Order.find({ userId: userId }).sort({ createdAt: -1 });
            // const user = await User.findOne({userId: userId})
            console.log(orders);

            resolve({
                status: 'OK',
                message: 'Orders retrieved successfully',
                data: orders,
            });
        } catch (error) {
            reject({
                status: 'ERR',
                message: error.message,
            });
        }
    });
};
const getAllOrders = () => {

    return new Promise(async (resolve, reject) => {
        try {

            const orders = await Order.find().sort({ createdAt: -1 });
            console.log(orders);
            resolve({
                status: 'OK',
                message: 'Orders retrieved successfully',
                data: orders,
            });
        } catch (error) {
            reject({
                status: 'ERR',
                message: error.message,
            });
        }
    });
};
const deleteOrder = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Kiểm tra xem đơn hàng có tồn tại không
            const checkOrder = await Order.findOne({
                _id: orderId,
            });

            if (!checkOrder) {
                resolve({
                    status: 'ERR',
                    message: 'Order not found',
                });
                return;
            }

            // Xóa đơn hàng
            const deletedOrder = await Order.findByIdAndDelete(orderId);
            console.log("Order đã xoá:", deletedOrder);

            resolve({
                status: 'OK',
                message: 'Order deleted successfully',
            });
        } catch (error) {
            reject({
                status: 'ERR',
                message: error.message,
            });
        }
    });
};
const getOrderDetail = async (orderId) => {
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return {
                status: 'ERR',
                message: 'Order not found',
            };
        }
        return {
            status: 'OK',
            data: order,
        };
    } catch (error) {
        throw error;
    }
};


module.exports = {
    createOrder,
    getUserOrders,
    deleteOrder,
    getAllOrders,
    getOrderDetail,
} 