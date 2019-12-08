const express = require('express');
const router = express.Router();

const InspectionController = require('./inspectionController');
const inspectionItemAPI = require('./item/inspectionItemAPI');
const buildBaseAPI = require('../../crud/baseAPI');

//has to call nested routes before to avoid conflicts
router.use('/item', inspectionItemAPI);

const controller = new InspectionController();
buildBaseAPI(controller, router);

module.exports = router;