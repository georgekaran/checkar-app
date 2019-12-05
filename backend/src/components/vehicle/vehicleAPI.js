const VehicleController = require('./vehicleController');
const vehicleTypeAPI = require('./type/vehicleTypeAPI');
const vehicleItemAPI = require('./item/vehicleItemAPI');
const buildBaseAPI = require('../../crud/baseAPI');

const controller = new VehicleController();
const router = buildBaseAPI(controller);

router.use('/:id/type', vehicleTypeAPI);
router.use('/:id/item', vehicleItemAPI);

module.exports = router;