const express = require('express');
const router = express.Router();

const ItemController = require('./itemController');
const itemTypeAPI = require('./type/itemTypeAPI');
const buildBaseAPI = require('../../crud/baseAPI');

//has to call nested routes before to avoid conflicts
router.use('/type', itemTypeAPI);

const controller = new ItemController();
buildBaseAPI(controller, router);

module.exports = router;