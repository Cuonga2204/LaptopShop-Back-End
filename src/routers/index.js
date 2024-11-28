// src/routers/index.js
const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter');
const CartRouter = require('./CartRouter')
const OrderRouter = require('./OrderRouter')
const express = require('express');
const path = require('path');
const routes = (app) => {
    app.use('/api/user', UserRouter);
    app.use('/api/product', ProductRouter);
    app.use('/api/cart', CartRouter);
    app.use('/api/order', OrderRouter);
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

};

module.exports = routes;
