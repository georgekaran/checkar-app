const VehicleTypeController = require('./vehicleTypeController');
const buildBaseAPI = require('../../../crud/baseAPI');

const controller = new VehicleTypeController();
const router = buildBaseAPI(controller);

module.exports = router;