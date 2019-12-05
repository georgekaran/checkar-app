const VehicleService = require('./vehicleService');
const BasicController = require('../../crud/baseController');

class VehicleController extends BasicController {
    constructor(props) {
        super(VehicleService);
    }
}

module.exports = VehicleController;