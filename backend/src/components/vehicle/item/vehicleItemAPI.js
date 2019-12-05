const VehicleItemController = require('./vehicleItemController');
const buildBaseAPI = require('../../../crud/baseAPI');

const controller = new VehicleItemController();
const router = buildBaseAPI(controller);

module.exports = router;