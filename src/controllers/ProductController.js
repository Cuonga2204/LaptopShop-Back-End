
const ProductService = require('../services/ProductService')

// controllers/ProductController.js
const createProduct = async (req, res) => {
    try {
        const { name, currentPrice, oldPrice, countInStock, config, description } = req.body;
        // console.log("Request file:", req.file); // Kiểm tra file upload
        console.log("Request body:", req.body); // Kiểm tra dữ liệu body

        const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : null;

        if (!name || !currentPrice || !oldPrice || !countInStock || !config) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is required'
            });
        }
        const response = await ProductService.createProduct({
            name, currentPrice, oldPrice, countInStock, imageUrl, config, description
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};


const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : null; // Kiểm tra nếu có file ảnh
        // console.log(req.body);

        const data = req.body;
        // console.log(data);

        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'productId  is required'
            })
        }
        const response = await ProductService.updateProduct(productId, data, imageUrl)

        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'productId is required'
            })
        }
        const response = await ProductService.deleteProduct(productId);

        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'userId is required'
            })
        }
        const response = await ProductService.getDetailsProduct(productId)

        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query;
        const response = await ProductService.getAllProduct(Number(limit) || 5, Number(page) || 1);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
const getAllProductHomePage = async (req, res) => {
    try {
        const response = await ProductService.getAllProductHomePage();
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getDetailsProduct,
    getAllProductHomePage,
}