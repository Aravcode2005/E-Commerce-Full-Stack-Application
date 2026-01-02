const path = require('path');

const express = require('express');
const productsControllers=require('../controllers/product')
const rootDir = require('../util/path');
const router = express.Router();
const products = [];
router.get('/add-product',productsControllers.getAddProduct);
router.post('/add-product',productsControllers.postAddProduct);
module.exports = router;

