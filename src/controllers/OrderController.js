const OrderService = require('../services/OrderService');
const Order = require('../models/OrderModel');
const createOrder = async (req, res) => {
    try {
        const { userId, shippingInfo } = req.body;

        if (!userId || !shippingInfo || !shippingInfo.name || !shippingInfo.phone || !shippingInfo.address) {
            return res.status(400).json({
                status: "ERR",
                message: "Missing required fields (userId, shippingInfo)",
            });
        }

        const response = await OrderService.createOrder(userId, shippingInfo);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            status: "ERR",
            message: error.message,
        });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.body;

        // Kiểm tra đầu vào
        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'UserId is required',
            });
        }

        // Gọi hàm từ OrderService để xử lý logic
        const response = await OrderService.getUserOrders(userId);

        // Trả kết quả từ service về client
        res.status(200).json(response);
    } catch (error) {
        // Xử lý lỗi
        res.status(500).json({
            status: 'ERR',
            message: error.message,
        });
    }
};
const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        if (!orderId) {
            return res.status(400).json({
                status: "ERR",
                message: "Missing required fields orderId",
            });
        }

        const response = await OrderService.deleteOrder(orderId);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            status: "ERR",
            message: error.message,
        });
    }
};
const getOrderDetail = async (req, res) => {
    try {
        const { orderId } = req.params;
        const response = await OrderService.getOrderDetail(orderId);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            status: 'ERR',
            message: error.message,
        });
    }
};
module.exports = {
    createOrder,
    getUserOrders,
    deleteOrder,
    getOrderDetail
};
