const path = require('path');

const express = require('express');
const productsControllers=require('../controllers/product')
const rootDir = require('../util/path');
const router = express.Router();
const products = [];
router.get('/',productsControllers.getProducts);
module.exports = router;

