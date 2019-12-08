const express = require('express');
const router = express.Router();

const VehicleController = require('./vehicleController');
const vehicleTypeAPI = require('./type/vehicleTypeAPI');
const vehicleItemAPI = require('./item/vehicleItemAPI');
const buildBaseAPI = require('../../crud/baseAPI');

//has to call nested routes before to avoid conflicts
router.use('/type', vehicleTypeAPI);
router.use('/item', vehicleItemAPI);

const controller = new VehicleController();
buildBaseAPI(controller, router);

module.exports = router;