const Cart = require('../models/CartModel');
const User = require('../models/UserModel')
const Product = require('../models/ProductModel');

const addToCart = (userId, productId, quantity) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findById(productId);
            if (!product) {
                resolve({
                    status: 'ERR',
                    message: 'Product not found',
                });
                return;
            }

            const user = await User.findById(userId);
            if (!user) {
                resolve({
                    status: 'ERR',
                    message: 'User not found',
                });
                return;
            }

            // Tìm giỏ hàng của user
            let cart = await Cart.findOne({ userId: userId });
            if (!cart) {
                // Nếu chưa có giỏ hàng, tạo mới
                cart = new Cart({
                    userId: userId,
                    userName: user.name,
                    items: [],
                    totalPrice: 0,
                });
            }

            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
            const cartItem = cart.items.find((item) => item.product.toString() === productId);
            if (cartItem) {
                // Nếu đã tồn tại, tăng số lượng và cập nhật giá
                cartItem.quantity += quantity;
                cartItem.price = product.currentPrice * cartItem.quantity;
            } else {
                // Nếu chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
                cart.items.push({
                    product: productId,
                    nameProduct: product.name,
                    imageProduct: product.imageUrl,
                    productConfig: product.config,
                    description: product.description,
                    currentPrice: product.currentPrice,
                    quantity,
                    price: product.currentPrice * quantity,
                });
            }

            // Cập nhật tổng giá trị giỏ hàng
            cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price, 0);
            await cart.save();

            resolve({
                status: 'OK',
                message: 'Added to cart successfully',
                data: cart,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getCart = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cart = await Cart.findOne({ userId: userId })
            if (!cart) {
                resolve({
                    status: 'OK',
                    message: 'Cart is empty',
                    data: [],
                });
                return;
            }

            resolve({
                status: 'OK',
                message: 'Get cart successfully',
                data: cart,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const deleteFromCart = (userId, productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cart = await Cart.findOne({ userId: userId });
            if (!cart) {
                resolve({
                    status: 'ERR',
                    message: 'Cart not found',
                });
                return;
            }
            cart.items = cart.items.filter((item) => item.product.toString() !== productId);
            cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await cart.save();

            resolve({
                status: 'OK',
                message: 'Removed from cart successfully',
                data: cart,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const updateQuantity = (userId, productId, quantity) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cart = await Cart.findOne({ userId: userId });
            if (!cart) {
                resolve({
                    status: 'ERR',
                    message: 'Cart not found',
                });
                return;
            }

            const cartItem = cart.items.find((item) => item.product.toString() === productId);
            if (!cartItem) {
                resolve({
                    status: 'ERR',
                    message: 'Product not found in cart',
                });
                return;
            }

            cartItem.quantity = quantity;
            cartItem.price = cartItem.price;
            cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await cart.save();

            resolve({
                status: 'OK',
                message: 'Updated quantity successfully',
                data: cart,
            });
        } catch (error) {
            reject(error);
        }
    });
};
const clearCart = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tìm giỏ hàng dựa trên userId
            const cart = await Cart.findOne({ userId: userId });
            if (!cart) {
                resolve({
                    status: "ERR",
                    message: "Cart not found",
                });
                return;
            }

            // Xóa toàn bộ sản phẩm trong giỏ hàng
            cart.items = [];
            cart.totalPrice = 0;

            // Lưu lại giỏ hàng
            await cart.save();

            resolve({
                status: "OK",
                message: "Cart cleared successfully",
                data: cart,
            });
        } catch (error) {
            reject({
                status: "ERR",
                message: error.message,
            });
        }
    });
};

module.exports = {
    addToCart,
    getCart,
    deleteFromCart,
    updateQuantity,
    clearCart,
};
