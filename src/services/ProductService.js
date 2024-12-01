const Product = require('../models/ProductModel')
require('dotenv').config();
const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, currentPrice, oldPrice, countInStock, imageUrl, backgroundUrl, config, description } = newProduct;
    console.log(typeof (description))
    try {
      // const checkProduct = await Product.findOne({
      //   name: name
      // })

      // if (checkProduct !== null) {
      //   resolve({
      //     status: 'OK',
      //     message: 'Product is allready'
      //   })
      // }
      const createProduct = await Product.create({
        name,
        currentPrice,
        oldPrice,
        countInStock,
        imageUrl,
        backgroundUrl,
        config,
        description
      })
      if (createProduct) {
        resolve({
          status: 'OK',
          message: 'CREATE PRODUCT SUCCESS',
          data: createProduct
        })
      }
    } catch (error) {
      reject(error)
    }
  })
}
const updateProduct = (productId, data, imageUrl) => {
  return new Promise(async (resolve, reject) => {

    try {
      const checkProduct = await Product.findOne({
        _id: productId
      })
      if (checkProduct === null) {
        resolve({
          status: 'OK',
          message: 'productId is required',
        })
      }

      if (imageUrl) {
        data.imageUrl = imageUrl;

        // Xóa ảnh cũ nếu tồn tại
        if (checkProduct.imageUrl && checkProduct.imageUrl !== "/uploads/images/default.png") {
          const fs = require("fs");
          const path = require("path");
          const oldImagePath = path.join(__dirname, `../..${checkProduct.imageUrl}`);
          fs.unlink(oldImagePath, (err) => {
            if (err) console.error("Failed to delete old image:", err.message);
          });
        }
      }

      const updatedProduct = await Product.findByIdAndUpdate(productId, data);
      // console.log(updatedProduct);
      resolve({
        status: 'OK',
        message: 'UPDATE PRODUCT SUCCESS',
      })
    } catch (error) {
      reject(error)
    }
  })
}
const getDetailsProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    const product = await Product.findOne({
      _id: productId
    })
    if (product === null) {
      resolve({
        status: 'OK',
        message: 'product is not defind',
      })
    }
    try {
      resolve({
        status: 'OK',
        message: 'GET DETAILS PRODUCT SUCCESS',
        data: product
      })
    } catch (error) {
      reject(error)
    }
  })
}

const deleteProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: productId
      })
      if (checkProduct === null) {
        resolve({
          status: 'OK',
          message: 'productId is required',
        })
      }
      const deletedProduct = await Product.findByIdAndDelete(productId);
      console.log("product đã xoá", deletedProduct);
      resolve({
        status: 'OK',
        message: 'DELETE SUCCESS',
      })
    } catch (error) {
      reject(error)
    }
  })
}
const getAllProduct = (limit = 5, page = 1) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.countDocuments();
      const allProduct = await Product.find().limit(limit).skip(limit * (page - 1));
      resolve({
        status: 'OK',
        message: 'GET ALL PRODUCT SUCCESS',
        data: allProduct,
        pageCurrent: page,
        totalPages: Math.ceil(totalProduct / limit),
        totalProduct,
      })


    } catch (error) {
      reject(error)
    }
  })
}
const getAllProductHomePage = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.countDocuments();
      const allProduct = await Product.find();
      console.log(allProduct)
      resolve({
        status: 'OK',
        message: 'GET ALL PRODUCT SUCCESS',
        data: allProduct,
        totalProduct,
      })


    } catch (error) {
      reject(error)
    }
  })
}
module.exports = {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
  getAllProductHomePage,
} 