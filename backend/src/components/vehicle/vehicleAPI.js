const express = require('express');
const router = express.Router();
const vehicleTypeAPI = require('./type/vehicleTypeAPI');
const vehicleItemAPI = require('./item/vehicleItemAPI');

router.get('/', function(req, res, next) {
    res.status(200).send({message: "Vehicle API"});
});

router.use('/type', vehicleTypeAPI);
router.use('/item', vehicleItemAPI);

module.exports = router;