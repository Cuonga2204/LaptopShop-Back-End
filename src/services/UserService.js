const User = require('../models/UserModel')
require('dotenv').config();
const bcrypt = require('bcrypt');
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService');
const createUser = (newUser, imageUrl) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser
    try {
      const checkUser = await User.findOne({
        email: email
      })
      if (checkUser !== null) {
        return resolve({
          status: 'OK',
          message: 'this email is already'
        })
      }
      const hash = bcrypt.hashSync(password, 10);

      const createdUser = await User.create({
        name,
        email,
        password: hash,
        phone,
        imageUrl
      })
      if (createUser) {
        resolve({
          status: 'OK',
          message: 'CREATE SUCCESS',
          data: createdUser
        })
      }

    } catch (error) {
      reject(error)
    }
  })
}

const loginUser = (loginUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = loginUser
    try {
      const checkUser = await User.findOne({
        email: email
      })
      console.log(checkUser);

      if (checkUser === null) {
        resolve({
          status: 'OK',
          message: 'this user is not defind'
        })

      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password)
      if (!comparePassword) {
        resolve({
          status: 'OK',
          message: 'the password is incorrect',
        })
      }
      const access_token = await genneralAccessToken({

        id: checkUser.id,
        isAdmin: checkUser.isAdmin
      })
      // const refresh_token = await genneralRefreshToken({
      //   id: checkUser.id,
      //   isAdmin: checkUser.isAdmin
      // })
      console.log('accessToken:', access_token);

      resolve({
        status: 'OK',
        message: 'LOGIN SUCCESS',
        access_token: access_token,
        // refresh_token: refresh_token
      })

    } catch (error) {
      reject(error)
    }
  })
}
const updateUser = (userId, data, imageUrl) => {
  return new Promise(async (resolve, reject) => {

    try {
      const checkUser = await User.findOne({
        _id: userId
      })
      if (checkUser === null) {
        resolve({
          status: 'OK',
          message: 'userId is required',
        })
      }
      if (imageUrl) {
        data.imageUrl = imageUrl;

        // Xóa ảnh cũ nếu có
        if (checkUser.imageUrl && checkUser.imageUrl !== '/uploads/images/avatarDefault.png') {
          const fs = require('fs');
          const path = require('path');
          const oldImagePath = path.join(__dirname, `../..${checkUser.imageUrl}`);
          fs.unlink(oldImagePath, (err) => {
            if (err) console.error("Failed to delete old image:", err.message);
          });
        }
      }
      const updatedUser = await User.findByIdAndUpdate(userId, data);
      console.log(updatedUser);
      resolve({
        status: 'OK',
        message: 'UPDATE SUCCESS',
      })
    } catch (error) {
      reject(error)
    }
  })
}
const deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: userId
      })
      if (checkUser === null) {
        resolve({
          status: 'OK',
          message: 'userId is required',
        })
      }
      const deletedUser = await User.findByIdAndDelete(userId);
      console.log("user đã xoá", deletedUser);
      resolve({
        status: 'OK',
        message: 'DELETE SUCCESS',
      })
    } catch (error) {
      reject(error)
    }
  })
}
const getAllUser = (limit = 5, page = 1) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalUser = await User.countDocuments();
      const allUser = await User.find().limit(limit).skip(limit * (page - 1));
      // const allUser = await User.find();
      resolve({
        status: 'OK',
        message: 'GET ALL USER SUCCESS',
        data: allUser,
        pageCurrent: page,
        totalPages: Math.ceil(totalUser / limit),
        totalUser,
      })
    } catch (error) {
      reject(error)
    }
  })
}
const getDetailsUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    const user = await User.findOne({
      _id: userId
    })
    if (user === null) {
      resolve({
        status: 'OK',
        message: 'User is not defind',
      })
    }
    try {
      const allUser = await User.findOne()
      resolve({
        status: 'OK',
        message: 'GET DETAILS USER SUCCESS',
        data: user
      })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
}