// server/models/index.js
// Central export for all Mongoose models

const User = require('./User');
const Product = require('./Product');
const Store = require('./Store');
const Order = require('./Order');
const Review = require('./Review');
const Cart = require('./Cart');
const Coupon = require('./Coupon');

module.exports = {
  User,
  Product,
  Store,
  Order,
  Review,
  Cart,
  Coupon
};
