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
const updateProduct = (productId, data) => {
  return new Promise(async (resolve, reject) => {

    try {
      const checkProduct = await Product.findOne({
        _id: productId
      })
      if (checkProduct !== null) {
        resolve({
          status: 'OK',
          message: 'productId is required',
        })
      }
      const updatedProduct = await Product.findByIdAndUpdate(productId, data);
      console.log(updatedProduct);
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
const getAllProduct = (limit = 2, page = 1) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.countDocuments();
      // if (filter) {
      // const lable = filter[0];
      // const allProduct = await Product.find();
      // resolve({
      //   status: 'OK',
      //   message: 'GET ALL PRODUCT FILTER SUCCESS',
      //   data: allProduct,
      //   // pageCurrent: page + 1,
      //   // totalPage: Math.ceil(totalProduct / limit),
      // })
      // }
      // if (sort) {
      //   const objectSort = {};
      //   objectSort[sort[1]] = sort[0];
      //   const allProductSort = await Product.find().limit(limit).skip(limit * page).sort(objectSort);
      //   resolve({
      //     status: 'OK',
      //     message: 'GET ALL PRODUCT SORT SUCCESS',
      //     data: allProductSort,
      //     pageCurrent: page + 1,
      //     totalPage: Math.ceil(totalProduct / limit),
      //   })
      // }
      const allProduct = await Product.find().limit(limit).skip(limit * (page - 1));
      resolve({
        status: 'OK',
        message: 'GET ALL PRODUCT SUCCESS',
        data: allProduct,
        pageCurrent: page,
        totalPage: Math.ceil(totalProduct / limit),
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
}